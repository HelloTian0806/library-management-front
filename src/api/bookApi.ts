/**
 * 封裝書籍查詢與新增；公開書名搜尋和管理端全部查詢是不同的 API。
 * params 由 Axios 編碼成查詢字串，新增資料則放在 POST 本文。
 * 這些方法只送出請求，不更新畫面，也不執行管理者授權；權限由後端檢查。
 */
import api from "./api";
import type { Book } from "@/model/Book";

export const bookApi = { 
    /**
     * 查詢 /admin/books，必須通過後端管理者驗證，一般會員不能只因按了「所有的書」就取得資料。
     * @returns 書籍清單的 Axios Promise
     */
    getAll() {
        return api.get<Book[]>('/admin/books');
    },

    /**
     * 以 title 查詢參數呼叫公開書名搜尋；params 會由 Axios 編碼成網址參數。
     * @param title 書名搜尋條件
     * @returns 書籍清單的 Axios Promise
     */
    getByTitle(title: string){
        return api.get<Book[]>('/books',{
            params: {
                title: title
            }
        })
    },

    /**
     * 將書籍資料送往管理端新增 API；目前後端以 200 與 boolean 表示業務結果。
     * @param book 待新增書籍
     * @returns HTTP 回應的 Promise，成功 HTTP 狀態不保證本文是 true
     */
    add(book: Book){
        return api.post('/admin/books', book);
    }
}