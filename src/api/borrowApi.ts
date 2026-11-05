/**
 * 封裝個人借閱、借書與管理端借閱查詢，會員身分由後端 Session 決定。
 * findByUserId 沒有會員 ID 參數，實際呼叫 /borrows/me；借書只傳 bookId。
 * 管理端清單目前沒有 Axios 回應泛型，資料不會因此得到執行期結構驗證。
 * 此模組目前沒有呼叫後端還書端點的方法，不應將查詢或借書描述成完整還書功能。
 */
import type { isFileLoadingAllowed } from "vite";
import api from "./api";
import type { Borrow } from "@/model/Borrow";

export const borrowApi = {

    /**
     * 依後端 Session 查詢個人借閱；名稱雖含 UserId，實際不接受會員 ID。
     * @returns 個人借閱清單的 Axios Promise，型別仍沿用目前共用 Borrow 介面
     */
    findByUserId(){
        return api.get<Borrow[]>('/borrows/me');
    },

    /**
     * 只送出書籍 ID，後端從 Session 決定借閱會員。
     * @param bookId 要借閱的書籍 ID
     * @returns Axios 回應的 Promise，其本文目前為 boolean；false 仍可能是 HTTP 200
     */
    borrowBook(bookId: number){
        return api.post('borrows',{ bookId });
    },
    
    /**
     * 取得管理端借閱清單，回應是含會員姓名與書名的 AdminBorrowResponse。
     * @returns 未指定泛型的 Axios Promise，資料結構由呼叫端使用
     */
    findAll(){
        return api.get('/admin/borrows');
    },

    /**
     * 以 name 查詢參數搜尋會員姓名相關的借閱紀錄，不是指定登入者。
     * @param name 會員姓名搜尋條件
     * @returns 管理端借閱清單的 Axios Promise
     */
    findByUserName(name: string){
        return api.get('admin/borrows',{
            params:{
                name: name
            }
        });
    }
};