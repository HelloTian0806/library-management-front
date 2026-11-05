<template>
    <a-layout style="min-height: 100vh">
        <UserHeader />
        <a-layout-content style="padding:24px">
            <RouterView />
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
/**
 * 會員端共用框架，包含頁首與用來顯示子路由的 RouterView。
 * Layout 不自行載入會員資料或驗證權限；資料與導覽由 Store、Router 及頁面處理。
 * 目前樣式標籤寫成 scope 而不是 scoped，且區塊為空，不能視為已啟用 Vue 的 scoped 樣式。
 */
import UserHeader from '@/components/user/UserHeader.vue';

</script>
<style scope></style>