<template>
  <a-table :data-source="borrows" :columns="columns" row-key="id"></a-table>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import type { Borrow } from '@/model/Borrow';
import type { User } from '@/model/User';
import { borrowApi } from '@/api/borrowApi';
import { useAuthStore } from '@/stores/authStore';

let borrows = ref<Borrow[]>([]);
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const response = await borrowApi.findByUserId();

    borrows.value = response.data;
  } catch (error) {
    console.error('取得借閱資料失敗', error);
  }
});
const columns = [{
  title: '書名',
  dataIndex: 'bookTitle',
  key: 'title'
},
{
  title: '借閱日期',
  dataIndex: 'borrowDate',
  key: 'title'
},
{
  title: '到期日期',
  dataIndex: 'dueDate',
  key: 'title',
},
{
  title: '狀態',
  dataIndex: 'status',
  key: 'title'
}
];
</script>

<style scoped></style>