import api from "./api";
import type { Member } from "@/model/Member";

export const memberApi = {

    getByName(name: string){
        return api.get<Member[]>("/admin/member",{
            params: {
                name: name
            }
        });
    },

    getAll(){
        return api.get<Member[]>("/admin/member");
    }
    
}