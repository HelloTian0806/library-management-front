<template>
    <div>
        <a-space direction="horizontal">
            查詢會員:<a-input v-model:value="keyword" placeholder="請輸入會員名稱" />
            <a-button type="primary" @click="handleEmitSearch">查詢</a-button>
            <a-button type="primary" @click="handleEmitAllMembers">所有會員</a-button>
        </a-space>

    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
    (e: 'emitAllMembers') :void
    (e: 'emitSearchName', keyword: string) :void
}>()

function handleEmitAllMembers(){
    emit('emitAllMembers');
}

function handleEmitSearch(){
    emit('emitSearchName', keyword.value);
}

</script>

<style scoped></style>