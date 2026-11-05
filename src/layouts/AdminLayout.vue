<template>
  <a-layout style="min-height: 100vh">
    <AdminHeader />

    <a-layout>
      <Sidebar />

      <a-layout-content style="padding:24px">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
/**
 * 管理端共用框架，以頁首、側邊欄與內容區組合畫面，RouterView 顯示目前子頁面。
 * Layout 的存在不會自動限制角色；前端守衛與後端 API 檢查各自執行。
 * 目前空白樣式標籤使用 scope 而非 scoped，沒有在此啟用作用域樣式。
 */
import AdminHeader from '@/components/admin/AdminHeader.vue';
import Sidebar from '@/components/admin/Sidebar.vue'
</script>
<style scope>

</style>