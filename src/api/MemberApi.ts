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

    getByEmail(email: string){
        return api.get("/member",{
            params: {
                email: email
            }
        });
    },

    getAll(){
        return api.get<Member[]>("/admin/member");
    }
    
}