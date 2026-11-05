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
/**
 * 管理端側邊選單以 RouterLink 進行前端導覽，不會直接重新載入整個頁面。
 * selectedKeys2 與 openKeys 控制 Ant Design Vue 的選取及展開狀態，沒有從路由自動推導。
 * 目前只有一般選單項目，雖保存 sub1 展開值，模板沒有對應的子選單。
 * 圖示是匯入的 Vue 元件；選單本身不驗證後端權限。
 */
import { ref } from 'vue';
import { BookOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons-vue'
import { RouterLink } from 'vue-router';
const selectedKeys2 = ref<string[]>(['0']);
const openKeys = ref<string[]>(['sub1']);
</script>

<style scoped>

</style>