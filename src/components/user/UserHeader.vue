<template>
    <a-layout-header class="header">
        <div class="logo">
            <h3><RouterLink to="/" @click="selectedKeys=['0']">千葉圖書館</RouterLink></h3>
        </div>
        <a-menu :key="authStore.user ? 'logged-in' : 'logged-out'" class="navbar" v-model:selectedKeys="selectedKeys" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item key="1"><RouterLink to="/books">書籍查詢</RouterLink></a-menu-item>
            
            <a-menu-item key="2" v-if="authStore.user"><RouterLink to="/my-borrows">我的借閱</RouterLink></a-menu-item>
        </a-menu>
        <div v-if="!authStore.user" class="login">
            <a-button type="primary" @click="openModal">登入</a-button>
        </div>
        <div v-else class="logout">
            歡迎， {{ authStore.user.name }}
            <a-button type="primary" @click="handleLogout">登出</a-button>
        </div>
    </a-layout-header>
    <AuthModal v-model:open="modalOpen" />
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import AuthModal from './AuthModal.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { authApi } from '@/api/authApi.ts';
import { useRouter } from 'vue-router';
import { message }   from 'ant-design-vue'
const selectedKeys = ref<string[]>(['0']);
// 打開Modal
const modalOpen = ref(false);
const authStore = useAuthStore();
function openModal() {
    modalOpen.value = true
}

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

.logo {
    flex-shrink: 0;
    margin-right: 40px;
}

.logo a {
    color: var(--color-text);
}

.navbar {
    flex: 0 0 auto;
    width: max-content;
    min-width: max-content;
    background-color: transparent;
    border-bottom: none;
}

.login,
.logout {
    margin-left: auto;
    flex-shrink: 0;
    white-space: nowrap;
}

</style>