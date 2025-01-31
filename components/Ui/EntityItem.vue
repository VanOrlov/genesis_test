<template>
    <div class="entity-item-container">
        <p class="entity-item">{{ item.name }}</p>
        <p class="entity-item">{{ item.id }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Entity } from '@/types/types'

defineProps<{
    item: Entity
}>()
</script>

<style scoped>
.entity-item-container{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    border-radius: 5px;
    background: rgb(240, 240, 240);
    transition: all .2s ease;
    margin-top: 5px;
}
.entity-item-container:first-child{
    margin-top: 0px;
}
.entity-item-container:hover{
    cursor: pointer;
    background: rgba(51, 157, 200, .3);
}
</style>