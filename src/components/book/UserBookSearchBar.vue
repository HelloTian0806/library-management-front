<template>
  <div>
    <a-space direction="horizontal">
       輸入書名:<a-input v-model:value="keyword" placeholder="請輸入書名"/>
       <a-button type="primary" @click="handleEmit">查詢</a-button>
       <a-button @click="handleEmitAllBooks">所有的書</a-button>
    </a-space>
   
  </div>
</template>

<script setup lang='ts'>
/**
 * 會員端書籍搜尋列，只管理輸入與事件，不保存書籍結果或直接呼叫後端。
 * emitSearch 附帶搜尋文字，emitAllBooks 不帶參數，父頁面決定如何取得資料。
 * 事件型別雖另宣告 openAddModal，目前模板沒有送出該事件的按鈕。
 */
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
  (e:'emitSearch',keyword: string): void
  (e:'emitAllBooks'): void
  (e:'openAddModal'):void
}>()

/**
 * 送出目前書名，不在這裡過濾或修改輸入。
 */
function handleEmit(){
  emit('emitSearch',keyword.value)
}
/**
 * 送出全部查詢事件，實際使用哪個 API 由父頁面決定。
 */
function handleEmitAllBooks(){
  emit('emitAllBooks')
}



</script>

<style scoped>

</style>