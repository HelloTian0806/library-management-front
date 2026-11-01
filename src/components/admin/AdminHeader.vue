<template>
  <a-layout-header class="header">
    <div class="logo">
      <RouterLink to="/admin">圖書管理系統</RouterLink>
    </div>
    <div class="logout">
      歡迎， {{ authStore.user?.name }}
      <a-button type="primary" @click="handleLogout">登出</a-button>
    </div>
  </a-layout-header>
</template>

<script setup lang='ts'>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { authApi } from '@/api/authApi';
import { message } from 'ant-design-vue'
const authStore = useAuthStore();

const router = useRouter();
function handleLogout(){
    authApi.logout();
    authStore.clearUser();
    router.push('/');
    message.success('登出成功');
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    background-color: var(--color-primary);
    height: 80px;
    padding: 0 24px;
}

.logo a {
  color: var(--color-text);
}

.logout {
    margin-left: auto;
    flex-shrink: 0;
    white-space: nowrap;
}
</style>