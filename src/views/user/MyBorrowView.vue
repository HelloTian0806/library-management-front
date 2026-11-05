<template>
  <a-table :data-source="borrows" :columns="columns" row-key="id"></a-table>
</template>

<script setup lang='ts'>
/**
 * 掛載後呼叫 /borrows/me，將回應存入 ref 清單交給 Ant Design Vue 表格顯示。
 * JavaScript 以 borrows.value 存取 ref，模板會自動解包，因此直接使用 borrows。
 * columns 的 dataIndex 對應回應欄位，row-key 指定每筆借閱 ID；目前多個欄位重複使用同一個 key。
 * 此頁只有查詢呈現，沒有還書按鈕或呼叫還書 API 的程式。
 */
import { ref, onMounted } from 'vue';
import type { Borrow } from '@/model/Borrow';
import type { User } from '@/model/User';
import { borrowApi } from '@/api/borrowApi';
import { useAuthStore } from '@/stores/authStore';

let borrows = ref<Borrow[]>([]);
const authStore = useAuthStore();

/**
 * 首次掛載後載入個人借閱；失敗時只記錄錯誤，原清單保持不變。
 */
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