import type { isFileLoadingAllowed } from "vite";
import api from "./api";
import type { Borrow } from "@/model/Borrow";

export const borrowApi = {

    findByUserId(){
        return api.get<Borrow[]>('/borrows/me');
    },

    borrowBook(bookId: number){
        return api.post('borrows',{ bookId });
    },
    
    findAll(){
        return api.get('/admin/borrows');
    }
};