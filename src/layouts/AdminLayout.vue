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
import AdminHeader from '@/components/admin/AdminHeader.vue';
import Sidebar from '@/components/admin/Sidebar.vue'
</script>
<style scope>

</style>