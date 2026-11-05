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
/**
 * 會員搜尋列以本地 keyword 保存文字，將全部查詢與姓名搜尋分為兩個事件。
 * 父元件以事件名稱綁定相應方法；這裡不直接依賴 Axios 或會員資料型別。
 * emit 只通知父層，不會等待父層 HTTP 請求完成。
 */
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
    (e: 'emitAllMembers') :void
    (e: 'emitSearchName', keyword: string) :void
}>()

/**
 * 送出不帶參數的全部會員事件。
 */
function handleEmitAllMembers(){
    emit('emitAllMembers');
}

/**
 * 將 keyword.value 作為姓名搜尋事件的參數，不直接呼叫 API。
 */
function handleEmitSearch(){
    emit('emitSearchName', keyword.value);
}

</script>

<style scoped></style>