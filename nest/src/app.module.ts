import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AmoController } from './amo/amo.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AmoController],
  providers: [AppService],
})
export class AppModule {}
