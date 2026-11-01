import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/model/User'
import { authApi } from '@/api/authApi';

export const useAuthStore = defineStore('auth', () => {

    const user = ref<User | null>(null);

    const isLoggedIn = computed(() => user.value !== null);

    const isAdmin = computed(() => {
        user.value?.role === 'ADMIN';
    })

    function setUser(data: User) {
        user.value = data;
    }

    function clearUser(){
        user.value = null;
    }

    async function checkLogin(){
        try{
            const response = await authApi.getCurrentUser();
            user.value = response.data;
        }catch{
            user.value == null;
        }
        
    }

    return {
        user,
        isLoggedIn,
        isAdmin,
        setUser,
        clearUser,
        checkLogin
    };
});