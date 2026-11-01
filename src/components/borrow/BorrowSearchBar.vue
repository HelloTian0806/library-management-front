<template>
    <div>
        <a-space direction="horizontal">
            查詢借閱:<a-input v-model:value="keyword" placeholder="請輸入會員名稱" />
            <a-button type="primary">查詢</a-button>
            <a-button type="primary" @click="handleEmitAllBorrows">所有借閱</a-button>
        </a-space>

    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
    (e: 'emitAllBorrows') :void
}>()

function handleEmitAllBorrows(){
    emit('emitAllBorrows');
}



</script>

<style scoped></style>