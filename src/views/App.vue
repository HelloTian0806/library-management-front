<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
/**
 * 應用程式根元件，模板的 RouterView 顯示目前路由匹配到的 Layout 或頁面。
 * script setup 的頂層程式在元件 setup 階段執行，匯入的 Store 可直接供生命週期回呼使用。
 * 掛載後會呼叫登入檢查；Router 守衛也會檢查，所以初始流程可能重複請求 /auth/me。
 * 此處沒有 await checkLogin，不會在它完成前阻擋模板顯示。
 */
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();


/**
 * 元件掛載後開始登入檢查；沒有等待 Promise 結束，頁面呈現可與請求並行。
 */
onMounted(()=>{

    authStore.checkLogin();

})
</script>
<style scoped></style>
