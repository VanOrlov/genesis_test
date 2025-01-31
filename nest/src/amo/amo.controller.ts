import { Controller, Post, InternalServerErrorException } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'

@Controller('api/amo')
export class AmoController {
  private X_CLIENT_ID = process.env.X_CLIENT_ID || ''
  private accessToken = ''
  private baseDomain = ''

  async getAccessToken() {
    try {
      const response: AxiosResponse<{ access_token: string; base_domain: string }> =
        await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
          headers: { 'X-Client-Id': this.X_CLIENT_ID }
        });

      this.accessToken = response.data.access_token
      this.baseDomain = response.data.base_domain
    } catch (error) {
      throw new InternalServerErrorException('Ошибка получения токена')
    }
  }

  @Post('leads')
  async createLead() {
    if (!this.accessToken) await this.getAccessToken()
    try {
      const response = await axios.post(`https://${this.baseDomain}/api/v4/leads`, [{}], {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })
      return { id: response.data._embedded?.leads[0]?.id, name: 'Сделка' }
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании сделки')
    }
  }

  @Post('contacts')
  async createContact() {
    if (!this.accessToken) await this.getAccessToken()

    try {
      const response = await axios.post(`https://${this.baseDomain}/api/v4/contacts`, [{}], {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      return { id: response.data._embedded?.contacts[0]?.id, name: 'Контакт' }
    } catch (error) {
      console.error('Ошибка создания контакта:', error)
      throw new InternalServerErrorException('Ошибка при создании контакта')
    }
  }

  @Post('companies')
  async createCompany() {
    if (!this.accessToken) await this.getAccessToken()

    try {
      const response = await axios.post(`https://${this.baseDomain}/api/v4/companies`, [{}], {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })
      return { id: response.data._embedded?.companies[0]?.id, name: 'Компания', }
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании компании')
    }
  }
}
