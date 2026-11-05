/**
 * 封裝管理端儀表板查詢，回傳含四項統計的 Axios Promise。
 * 後端統計依 DashboardStatsResponse 定義，前端泛型只描述預期結構。
 * 目前 Dashboard 將欄位寫成字面值型別 0，而非一般 number，這是既有型別限制。
 */
import api from "./api";
import type { Dashboard } from "@/model/Dashboard";


export const dashboardApi = {
    /**
     * 查詢 /admin/dashboard，由後端提供四項統計，前端不在這裡重新計算。
     * @returns 儀表板資料的 Axios Promise
     */
    get(){
        return api.get<Dashboard>('admin/dashboard')
    }
}