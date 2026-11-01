<template>
    <a-layout style="min-height: 100vh">
        <UserHeader />
        <a-layout-content style="padding:24px">
            <RouterView />
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import UserHeader from '@/components/user/UserHeader.vue';

</script>
<style scope></style>