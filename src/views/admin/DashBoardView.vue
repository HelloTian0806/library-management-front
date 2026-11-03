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
import type { Dashboard } from '@/model/Dashboard';
import { onMounted, ref } from 'vue';
import { dashboardApi } from '@/api/dashboardApi';

const dashboard = ref<Dashboard>({
  totalBooks: 0,
  totalMembers: 0,
  activeBorrows: 0,
  overdueBorrows: 0
});

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