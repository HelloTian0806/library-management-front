<template>
  <BorrowSearchBar/>
  <a-table :dataSource="borrows" :columns="columns">

  </a-table>
</template>

<script setup lang='ts'>
import BorrowSearchBar from '@/components/borrow/BorrowSearchBar.vue';
import type { Borrow } from '@/model/Borrow';
import { ref } from 'vue';

const borrows = ref<Borrow[]>([]);

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