<template>
  <a-layout style="min-height: 100vh">
    <Header />

    <a-layout>
      <Sidebar />

      <a-layout-content style="padding:24px">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>
<style scope>

</style>