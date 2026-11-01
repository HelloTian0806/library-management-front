<template>
  <a-layout-sider class="sider" width="200">
    <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
      :style="{ height: '100%', borderRight: 0 }">
      <a-menu-item key="1">
        <RouterLink to="/admin/books">
          <BookOutlined />
          <span>Book Management</span>
        </RouterLink>
      </a-menu-item>

      <a-menu-item key="2">
        <RouterLink to="/admin/members">
          <UserOutlined />
          <span>Member Management</span>
        </RouterLink>
      </a-menu-item>

      <a-menu-item key="3">
        <RouterLink to="/admin/borrows">
          <ReadOutlined />
          <span>Borrow Management</span>
        </RouterLink>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { BookOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router';
const selectedKeys2 = ref<string[]>(['0']);
const openKeys = ref<string[]>(['sub1']);
</script>

<style scoped>

</style>