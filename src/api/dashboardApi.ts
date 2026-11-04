import api from "./api";
import type { Dashboard } from "@/model/Dashboard";


export const dashboardApi = {
    get(){
        return api.get<Dashboard>('admin/dashboard')
    }
}