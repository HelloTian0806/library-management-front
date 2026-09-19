<template>
  <div>
    <BookSearchBar @emitSearch="getBooks" @emitAllBooks="getAll"/>
    <!-- <div v-for="book in data" :key="book.id">
      {{ book.isbn }} - {{ book.title }} - {{ book.author }}
    </div> -->
    <a-table 
    :data-source="books"
    :columns="columns"
    row-key="id" 
    />
  </div>
</template>

<script setup lang='ts'>
import BookSearchBar from '@/components/book/BookSearchBar.vue';
import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '@/model/Book'
let isbn = ref('');
let books = ref<Book[]>([]);
const columns =[{
    title:'書名',
    dataIndex:'title',
    key:'title'
},
{
    title:'作者',
    dataIndex:'author',
    key:'author'
},
{
    title:'ISBN',
    dataIndex:'isbn',
    key:'isbn'
},
{
    title:'總數',
    dataIndex:'totalQuantity',
    key:'totalQuantity'
},
{
    title:'可借出數量',
    dataIndex:'availableQuantity',
    key:'availableQuantity'
},
]
async function getBooks(keyword: string) {
  const response = await axios.get<Book[]>(
    "http://localhost:8081/books",
    {
      params: {
        title: keyword
      }
    }

  );
  books.value = response.data;
  console.log(response.data);
}
async function getAll() {
  const response = await axios.get<Book[]>(
    "http://localhost:8081/books"
  );
  books.value = response.data;
  console.log(response.data);
}
</script>

<style scoped></style>