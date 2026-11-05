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
/**
 * 管理端書籍頁，保存表格資料、選取的書籍與對話框開關。
 * 父元件以 props 將選取資料交給表單，以 v-model:open 接收開關變更。
 * 目前父元件沒有綁定 BookFormModal 的 submit 事件，因此表單送出不會在此呼叫新增或修改 API。
 * 此頁直接使用原始 axios，不會自動繼承 api.ts instance 的 withCredentials 或 timeout。
 */
import AdminBookSearchBar from '@/components/book/AdminBookSearchBar.vue';
import BookFormModal from '@/components/book/BookFormModal.vue';
import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '@/model/Book'
let books = ref<Book[]>([]);

const selectedBook = ref<Book | null>(null)
/**
 * 保存被點選的書籍參照並開啟表單；不是在這裡執行後端更新。
 */
const editBook = (book:Book) => {
  selectedBook.value =book
  modalOpen.value = true
}
const modalOpen = ref(false)
// 控制Modal開關
/**
 * 將選取資料設為 null，讓子表單以新增模式呈現，再打開對話框。
 */
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
/**
 * 直接以 axios 與 title 參數查詢公開 /books，沒有使用共用 api instance。
 * @param keyword 書名搜尋文字
 */
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
/**
 * 目前直接 GET /books 且未帶 title；指定後端版本的全部查詢位於 /admin/books，這裡的端點不一致。
 */
async function getAll() {
  const response = await axios.get<Book[]>(
    "http://localhost:8081/books"
  );
  books.value = response.data;
  console.log(response.data);
}
</script>

<style scoped></style>