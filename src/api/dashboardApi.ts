import api from "./api";
import type { Dashboard } from "@/model/DashBoard";


export const dashboardApi = {
    get(){
        return api.get<Dashboard>('/dashboard')
    }
}