<template>
  <UserBookSearchBar @emitSearch="getBooks" @emitAllBooks="getAllBooks"/>
      <a-table :data-source="books" :columns="columns" row-key="id">
      <template #bodyCell="{ column, record}">
        <template v-if="column.key === 'action'">
          <a-button type="primary" :disabled="record.availableQuantity <= 0" @click="handleBorrow(record)">
            借閱
          </a-button>
        </template>
      </template>
    </a-table>
</template>

<script setup lang='ts'>
import UserBookSearchBar from '@/components/book/UserBookSearchBar.vue';
import { bookApi } from '@/api/bookApi';
import { borrowApi } from '@/api/borrowApi';
import type { Book } from '@/model/Book';
import { ref } from 'vue';
import { message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
let books =ref<Book[]>([]);
 
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
  title: '可借出數量',
  dataIndex: 'availableQuantity',
  key: 'availableQuantity'
},
{
  title: '操作',
  key: 'action'
}
]

// API 取得所有書籍

async function  getAllBooks(){
  const response = await bookApi.getAll();
  books.value = response.data;
}

// API 取得查詢書籍
async function getBooks(keyword: string){
const response = await bookApi.getByTitle(keyword);
books.value=response.data;

};

// API 借書
const authStore = useAuthStore();
const router = useRouter();
async function handleBorrow(book: Book){
  if (!authStore.isLoggedIn){
    message.warn('請先登入');
    return;
  }
  try {
    await borrowApi.borrowBook(book.id);
    message.success('借閱成功');
    router.push('/my-borrows');

  } catch (error){
    message.error('借閱失敗')
  }
}

</script>

<style scoped>

</style>