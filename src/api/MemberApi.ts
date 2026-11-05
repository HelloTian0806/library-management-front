/**
 * 封裝管理端會員清單與姓名搜尋，透過共用 Axios instance 使用後端 Session。
 * Member[] 是編譯期的資料契約提示，不代表 Axios 已逐欄驗證回應。
 * 後端回傳 MemberResponse，不含會員密碼；有權取得資料仍須通過後端 ADMIN 檢查。
 */
import api from "./api";
import type { Member } from "@/model/Member";

export const memberApi = {

    /**
     * 以姓名條件查詢管理端會員 DTO，不傳入操作者 ID 或角色。
     * @param name 姓名搜尋條件
     * @returns 會員清單的 Axios Promise
     */
    getByName(name: string){
        return api.get<Member[]>("/admin/member",{
            params: {
                name: name
            }
        });
    },

    /**
     * 取得管理端全部會員，後端會先驗證登入身分及 ADMIN 角色。
     * @returns 會員清單的 Axios Promise
     */
    getAll(){
        return api.get<Member[]>("/admin/member");
    }
    
}