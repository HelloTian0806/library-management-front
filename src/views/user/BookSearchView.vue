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
/**
 * 由搜尋元件送出事件，頁面負責查詢、保存書籍清單及發送借書請求。
 * bodyCell 是表格的具作用域插槽，從 column 與 record 決定是否呈現操作按鈕。
 * 依可借數量停用按鈕只是畫面提示，後端仍須重新檢查實際庫存與登入身分。
 * 目前沒有掛載時自動查詢；按鈕事件才會觸發載入。
 */
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

/**
 * 目前呼叫 bookApi.getAll，也就是管理端 /admin/books；一般會員可能收到 401 或 403。
 * 成功才以回應本文取代清單，此函式沒有局部錯誤處理。
 */
async function  getAllBooks(){
  const response = await bookApi.getAll();
  books.value = response.data;
}

// API 取得查詢書籍
/**
 * 以搜尋列提供的文字查詢公開書名 API，更新 ref 後表格會重新呈現。
 * @param keyword 使用者輸入的書名條件
 */
async function getBooks(keyword: string){
const response = await bookApi.getByTitle(keyword);
books.value=response.data;

};

// API 借書
const authStore = useAuthStore();
const router = useRouter();
/**
 * 先檢查前端登入狀態，再送出借書請求；後端仍須獨立驗證 Session。
 * 目前只等待 HTTP 完成，沒有讀取 boolean 本文，所以 200 與 false 也會顯示成功並導向個人借閱。
 * @param book 目前表格列的書籍資料
 */
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