<template>
  <div>
    <a-space direction="horizontal">
       輸入書名:<a-input v-model:value="keyword" placeholder="請輸入書名"/>
       <a-button type="primary" @click="handleEmit">查詢</a-button>
       <a-button @click="handleEmitAllBooks">所有的書</a-button>
       <a-button type="primary" @click="openModal">新增書籍</a-button>
    </a-space>
   
  </div>
</template>

<script setup lang='ts'>
/**
 * 管理端書籍搜尋列，使用本地 ref 保存輸入，透過事件通知父頁面查詢或開啟新增表單。
 * defineEmits 的型別描述允許的事件名稱與參數，不會自行呼叫 API。
 * 模板以 v-model:value 連接 Ant Design Vue 輸入元件，輸入不會在此被 trim 或驗證。
 */
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
  (e:'emitSearch',keyword: string): void
  (e:'emitAllBooks'): void
  (e:'openAddModal'):void
}>()

/**
 * 送出目前書名條件，由父頁面接手查詢。
 */
function handleEmit(){
  emit('emitSearch',keyword.value)
}
/**
 * 通知父頁面執行全部書籍查詢，不直接取得資料。
 */
function handleEmitAllBooks(){
  emit('emitAllBooks')
}

/**
 * 只送出開啟新增表單事件，實際開關由父元件控制。
 */
function openModal(){
  emit('openAddModal')
}


</script>

<style scoped>

</style>