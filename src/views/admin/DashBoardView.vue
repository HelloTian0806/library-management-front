<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="書藏" :bordered="false">
          <p>{{ dashboard.totalBooks }}</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="會員人數" :bordered="false">
          <p>{{ dashboard.totalMembers }}</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="尚未歸還" :bordered="false">
          <p>{{ dashboard.activeBorrows }}</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="逾期歸還" :bordered="false">
          <p>{{ dashboard.overdueBorrows }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>




<script setup lang='ts'>
/**
 * 管理端儀表板掛載後讀取四項統計，以 reactive ref 物件提供模板插值。
 * 初始四個零是畫面載入前的資料，不代表已取得後端統計。
 * totalBooks 實際是書目筆數；overdueBorrows 是未歸還且逾期，模板標題目前使用「逾期歸還」。
 * 請求失敗只記錄錯誤，沒有在此建立專用的錯誤狀態或重新拋出例外。
 */
import type { Dashboard } from '@/model/Dashboard';
import { onMounted, ref } from 'vue';
import { dashboardApi } from '@/api/dashboardApi';

const dashboard = ref<Dashboard>({
  totalBooks: 0,
  totalMembers: 0,
  activeBorrows: 0,
  overdueBorrows: 0
});

/**
 * 掛載後等待儀表板 API，成功才以回應本文覆蓋四個初始零值。
 */
onMounted(async () => {
  try {

    const response = await dashboardApi.get();

    dashboard.value = response.data

  } catch (error) {
    console.error("獲取dashboard失敗"+error)
  }

})

</script>

<style scoped></style>