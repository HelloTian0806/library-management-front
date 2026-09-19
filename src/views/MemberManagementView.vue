<template>
  <div>
    <h1>Welcome Vue3</h1><br>
    <h2>查詢:</h2><br>
    <label>
        ISBN:
        <input type="text" v-model="isbn">
    </label>
    
    <button @click="getBooks">送出查詢</button>
    <div v-for="book in data" :key="book.id">
        {{ book.title }} - {{ book.author }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '@/model/Book'
let isbn = ref('');
let data = ref<Book[]>([]);
async function getBooks(){
    const response = await axios.get(
        "http://localhost:8081/books"
    );
    data.value = response.data;
    console.log(response.data);
}
</script>