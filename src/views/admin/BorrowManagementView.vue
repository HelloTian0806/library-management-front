<template>
  <BorrowSearchBar @emitAllBorrows="getAllBorrows" @emitGetByUserName="getByUserName"/>
  <a-table :dataSource="borrows" :columns="columns">

  </a-table>
</template> 

<script setup lang='ts'>
import BorrowSearchBar from '@/components/borrow/BorrowSearchBar.vue';
import type { Borrow } from '@/model/Borrow';
import { ref } from 'vue';
import { borrowApi } from '@/api/borrowApi';

const borrows = ref<Borrow[]>([]);

async function getAllBorrows(){
  const response = await borrowApi.findAll();
  borrows.value = response.data;
}

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