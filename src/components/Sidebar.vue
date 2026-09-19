<template>
  <a-layout-sider width="200" > 
    <a-menu
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      mode="inline"
      theme="dark"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item key="1">
        <DashboardOutlined />
        <RouterLink to="dashboard"></RouterLink> 
        <span>Dashboard</span>
      </a-menu-item>

      <a-menu-item key="2">
        <BookOutlined />
        <RouterLink to="book"></RouterLink> 
        <span>Book Management</span>
      </a-menu-item>

      <a-menu-item key="3">
        <UserOutlined />
        <RouterLink to="member"></RouterLink> 
        <span>Member Management</span>
      </a-menu-item>

      <a-menu-item key="4">
        <ReadOutlined />
        <RouterLink to="member"></RouterLink>
        <span>Borrow Management</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { DashboardOutlined, BookOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons-vue'
import { RouterLink, RouterView } from 'vue-router';
const selectedKeys2 = ref<string[]>(['0']);
const openKeys = ref<string[]>(['sub1']);
</script>

<style scoped>
.ant-menu-item {
    height: 48px;
    line-height: 48px;
    margin: 8px 12px;
    border-radius: 10px;
}

.ant-menu-item:hover {
    background: #e6f4ff;
    color: #1677ff;
}
.ant-menu {
  font-size: 16px;
  font-family:monospace;
  font-weight: 500;
}
</style>