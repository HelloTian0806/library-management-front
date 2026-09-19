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
import { ref } from 'vue'
const keyword = ref('');
// const emit = defineEmits(['emitSearch','emitAllBooks'])
// 更簡潔的寫法
// 泛型<>裡面設定配置{(e:'事件名稱',傳遞的值:型別): void}
const emit = defineEmits<{
  (e:'emitSearch',keyword: string): void
  (e:'emitAllBooks'): void
}>()

function handleEmit(){
  emit('emitSearch',keyword.value)
}
function handleEmitAllBooks(){
  emit('emitAllBooks')
}

</script>

<style scoped>

</style>