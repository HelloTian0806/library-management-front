/**
 * 封裝帳號 API，讓元件不用重複撰寫端點與請求方法。
 * POST 的第二個參數是請求本文；GET 的泛型只提供 TypeScript 提示，不會驗證伺服器 JSON。
 * 各方法回傳 Axios Promise，呼叫端以 await 取得 response，再讀取 response.data。
 * 目前 User 型別包含後端 UserResponse 沒有的 password、phone，不能因泛型就假設欄位存在。
 */
import api from "./api";
import type { LoginRequest, RegisterRequest } from "@/model/Auth";
import type { User } from "@/model/User";

export const authApi = {
    /**
     * 將登入 DTO 放入 POST 本文；成功回應包含使用者資料，Session Cookie 由瀏覽器依規則處理。
     * @param data 原始 Email 與密碼
     * @returns Axios 回應的 Promise；非成功 HTTP 狀態或連線失敗會拒絕
     */
    login(data: LoginRequest){
        return api.post<User>('auth/login',data);
    },
    
    /**
     * 送出註冊資料；此呼叫不會自動設定 Pinia 使用者或建立前端登入狀態。
     * @param data 姓名、Email、原始密碼與手機
     * @returns 註冊 HTTP 回應的 Promise
     */
    register(data: RegisterRequest){
        return api.post('auth/register',data);
    },

    /**
     * 請後端使既有 Session 失效；清除前端 Store 仍由呼叫元件執行。
     * @returns 登出 HTTP 回應的 Promise，呼叫端可等待其完成
     */
    logout(){
        return api.post('auth/logout');
    },

    /**
     * 向後端詢問現有 Session 的登入者；不是直接讀取瀏覽器記憶體。
     * @returns 使用者回應的 Promise；無有效登入身分時目前後端回應 401
     */
    getCurrentUser(){
        return api.get<User>('auth/me')
    }
};


