/**
 * 以 Pinia Setup Store 保存目前登入者，供頁首、表單與路由共用。
 * ref 保存可變狀態；computed 適合由狀態推導值；函式負責更新狀態或發送 API。
 * user 是前端記憶體資料，不是 Session 本身，也沒有在此做 localStorage 持久化。
 * 目前 isAdmin 缺少回傳值，checkLogin 失敗分支也沒有清除狀態，以下註解依實際行為說明。
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/model/User'
import { authApi } from '@/api/authApi';

export const useAuthStore = defineStore('auth', () => {

    /**
     * 以 null 表示目前沒有前端登入者資料；重新整理頁面後需向後端重新確認 Session。
     */
    const user = ref<User | null>(null);

    /**
     * 由 user 是否非 null 推導前端登入狀態；這不是再次向後端驗證。
     */
    const isLoggedIn = computed(() => user.value !== null);

    /**
     * 目前區塊中的角色比較沒有 return，所以 computed 實際回傳 undefined，而不是布林值。
     */
    const isAdmin = computed(() => {
        user.value?.role === 'ADMIN';
    })

    /**
     * 保存登入或查詢得到的使用者物件，不在此發送請求。
     * @param data 要保存的使用者資料
     */
    function setUser(data: User) {
        user.value = data;
    }

    /**
     * 只清除前端記憶體狀態，不會呼叫後端使 Session 失效。
     */
    function clearUser(){
        user.value = null;
    }

    /**
     * 向 /auth/me 確認登入者，成功時覆蓋 user。
     * 目前 catch 內是 == 比較而非賦值，失敗時既有 user 不會被清除；也沒有重新拋出例外。
     * @returns 請求處理完成的 Promise，不回傳使用者或登入布林結果
     */
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