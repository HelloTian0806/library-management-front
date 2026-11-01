import api from "./api";
import type { Book } from "@/model/Book";

export const bookApi = { 
    getAll() {
        return api.get<Book[]>('/admin/books');
    },

    getByTitle(title: string){
        return api.get<Book[]>('/books',{
            params: {
                title: title
            }
        })
    },

    add(book: Book){
        return api.post('/admin/books', book);
    }
}