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
/**
 * 管理端頁首從共用 Store 讀取姓名，使用可選鏈結避免 user 尚為 null 時讀取失敗。
 * 登出函式目前不等待 HTTP 結果，就清除前端狀態並導向首頁；提示不代表伺服器已確認登出。
 * scoped 樣式控制此頁首的排列，背景與文字色使用全域 CSS 變數。
 */
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { authApi } from '@/api/authApi';
import { message } from 'ant-design-vue'
const authStore = useAuthStore();

const router = useRouter();
/**
 * 目前不等待後端登出成功，就清除前端狀態並導回首頁；Promise 失敗沒有在此捕捉。
 */
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