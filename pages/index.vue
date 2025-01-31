<template>
    <main class="main">
        <div class="container">
            <div class="create-container">
                <n-select
                    class="select"
                    v-model:value="value"
                    placeholder="Выберите тип сущности"
                    :options="SELECT_OPTIONS"
                />
                <n-button type="primary" :loading="loading" @click="store.createEntity(value)" :disabled="disabledButton">Создать</n-button>
            </div>
            <div class="entity-container">
                <div class="params_entity">
                    <p class="params_item">Название сущности</p>
                    <p class="params_item">ID</p>
                </div>
                <n-scrollbar class="entity-items">
                    <UiEntityItem v-for="item in store.getEntities" :key="item.id" :item="item" />
                </n-scrollbar>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { amoStore } from '@/stores/amo'
import { ref } from 'vue'

import { SELECT_OPTIONS } from '@/constants/constants'


const store = amoStore()


//Для состояний компнентов
const loading = ref(false)
const disabledButton = computed(() => value.value == 'none')
const value = ref(SELECT_OPTIONS[0].value)
</script>
<style scoped>
main{
    width: 100%;
    height: 100vh;
}
.container{
    display: flex;
    gap: 30px;
    width: 100%;
    height: 100%;
    background: #339dc8;
    padding: 200px;
}
.create-container{
    display: flex;
    gap: 10px;
    width: 25%;
    .select{
        min-width: 200px;
    }
}
.entity-container{
    display: flex;
    width: 75%;
    flex-direction: column;
    border-radius: 15px;
    padding: 15px;
    gap: 5px;
    background-color: white;
    .params_entity{
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(200, 200, 200);
        align-items: center;
        justify-content: space-between;
        color: rgb(200, 200, 200);
    }
    .entity-items{
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
    }
}
</style>