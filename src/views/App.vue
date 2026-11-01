<template>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();


onMounted(()=>{

    authStore.checkLogin();

})
</script>
<style scoped></style>
