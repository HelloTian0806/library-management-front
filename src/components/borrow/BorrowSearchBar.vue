<template>
    <div>
        <a-space direction="horizontal">
            查詢借閱:<a-input v-model:value="keyword" placeholder="請輸入會員名稱" />
            <a-button type="primary" @click="handleEmitGetByUserName">查詢</a-button>
            <a-button type="primary" @click="handleEmitAllBorrows">所有借閱</a-button>
        </a-space>

    </div>
</template>
 
<script setup lang='ts'>
/**
 * 借閱搜尋列輸入的是會員姓名條件，與目前登入操作者的 memberId 不同。
 * 以事件交給父頁面決定全部查詢或姓名搜尋，實際 API 與權限驗證不在本元件執行。
 * defineEmits 提供編譯期事件參數檢查，沒有自動建立搜尋或防止重複請求的功能。
 */
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
    (e: 'emitAllBorrows') :void
    (e: 'emitGetByUserName', keyword: string) :void
}>()

/**
 * 通知父頁面載入全部管理端借閱。
 */
function handleEmitAllBorrows(){
    emit('emitAllBorrows');
}

/**
 * 送出姓名搜尋條件，查詢結果仍由父頁面保存。
 */
function handleEmitGetByUserName(){
    emit('emitGetByUserName', keyword.value)
}



</script>

<style scoped></style>