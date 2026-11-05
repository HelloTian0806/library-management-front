/**
 * 建立共用 Axios instance，集中管理後端位址、逾時與 Cookie 使用方式。
 * baseURL 會與各 API 模組的相對路徑組合，timeout 的單位是毫秒。
 * withCredentials 允許符合瀏覽器規則的跨來源請求使用 Cookie，需與後端 CORS 及 Cookie 政策配合。
 * 這不是把 memberId 直接存進請求；瀏覽器使用 Session Cookie 對應後端 Session。
 * 此 instance 沒有自訂攔截器或 validateStatus，HTTP 錯誤依 Axios 預設規則拒絕 Promise。
 */
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: true,
    timeout: 10000
});

export default api;
