<template>
  <BorrowSearchBar @emitAllBorrows="getAllBorrows" @emitGetByUserName="getByUserName"/>
  <a-table :dataSource="borrows" :columns="columns">

  </a-table>
</template> 

<script setup lang='ts'>
/**
 * 管理端借閱頁，以搜尋列事件選擇全部查詢或會員姓名搜尋。
 * API 回應先保存到 ref，再由表格 dataSource 與 columns 呈現；沒有掛載時自動載入。
 * 欄位來自 AdminBorrowResponse，包含會員姓名與書名，此頁不重新計算逾期或執行還書。
 */
import BorrowSearchBar from '@/components/borrow/BorrowSearchBar.vue';
import type { Borrow } from '@/model/Borrow';
import { ref } from 'vue';
import { borrowApi } from '@/api/borrowApi';

const borrows = ref<Borrow[]>([]);

/**
 * 載入管理端全部借閱；回應包含會員姓名與書名，API 層目前沒有宣告其泛型。
 */
async function getAllBorrows(){
  const response = await borrowApi.findAll();
  borrows.value = response.data;
}

/**
 * 依會員姓名查詢借閱；keyword 不作為目前操作者的登入身分。
 * @param keyword 會員姓名搜尋文字
 */
async function getByUserName(keyword: string){
  const response = await borrowApi.findByUserName(keyword);
  borrows.value = response.data;
}

const columns = [{
  title: 'id',
  dataIndex: 'id',
  key: 'id'
},
{
  title: '會員id',
  dataIndex: 'memberId',
  key: 'memberId'
},
{
  title: '會員名稱',
  dataIndex: 'memberName',
  key: 'memberName'
},
{
  title: '書名',
  dataIndex: 'bookTitle',
  key: 'bookTitle'
},
{
  title: '借出日期',
  dataIndex: 'borrowDate',
  key: 'borrowDate'
},
{
  title: '到期日期',
  dataIndex: 'dueDate',
  key: 'dueDate'
},{
  title: '還書日期',
  dataIndex: 'returnDate',
  key: 'returnDate'
},{
  title: '狀態',
  dataIndex: 'status',
  key: 'status'
}
];

</script>

<style scoped>

</style>