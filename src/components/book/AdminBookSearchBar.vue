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
import { ref } from 'vue'
const keyword = ref('');

const emit = defineEmits<{
  (e:'emitSearch',keyword: string): void
  (e:'emitAllBooks'): void
  (e:'openAddModal'):void
}>()

function handleEmit(){
  emit('emitSearch',keyword.value)
}
function handleEmitAllBooks(){
  emit('emitAllBooks')
}

function openModal(){
  emit('openAddModal')
}


</script>

<style scoped>

</style>