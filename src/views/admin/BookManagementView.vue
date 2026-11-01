<template>
  <div>
    <AdminBookSearchBar @emitSearch="getBooks" @emitAllBooks="getAll" @openAddModal="openModal" />
    <!-- <div v-for="book in data" :key="book.id">
      {{ book.isbn }} - {{ book.title }} - {{ book.author }}
    </div> -->
    <BookFormModal v-model:open="modalOpen" :book="selectedBook"/>
    <a-table :data-source="books" :columns="columns" row-key="id">
      <template #bodyCell="{ column, record}">
        <template v-if="column.key==='action'">
          <a-button type="link" @click="editBook(record)">
            修改
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang='ts'>
import AdminBookSearchBar from '@/components/book/AdminBookSearchBar.vue';
import BookFormModal from '@/components/book/BookFormModal.vue';
import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '@/model/Book'
let books = ref<Book[]>([]);

const selectedBook = ref<Book | null>(null)
const editBook = (book:Book) => {
  selectedBook.value =book
  modalOpen.value = true
}
const modalOpen = ref(false)
// 控制Modal開關
function openModal() {
  selectedBook.value =null
  modalOpen.value = true;
}
// 定義a-table裡的欄位
const columns = [{
  title: '書名',
  dataIndex: 'title',
  key: 'title'
},
{
  title: '作者',
  dataIndex: 'author',
  key: 'author'
},
{
  title: 'ISBN',
  dataIndex: 'isbn',
  key: 'isbn'
},
{
  title: '總數',
  dataIndex: 'totalQuantity',
  key: 'totalQuantity'
},
{
  title: '可借出數量',
  dataIndex: 'availableQuantity',
  key: 'availableQuantity'
},
{
  title: '操作',
  key: 'action'
}
]

// API
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