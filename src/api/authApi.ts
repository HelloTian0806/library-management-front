import api from "./api";
import type { LoginRequest, RegisterRequest } from "@/model/Auth";
import type { User } from "@/model/User";

export const authApi = {
    login(data: LoginRequest){
        return api.post<User>('auth/login',data);
    },
    
    register(data: RegisterRequest){
        return api.post('auth/register',data);
    },

    logout(){
        return api.post('auth/logout');
    },

    getCurrentUser(){
        return api.get<User>('auth/me')
    }
};


