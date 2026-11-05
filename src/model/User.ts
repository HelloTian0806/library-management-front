/**
 * 描述 Pinia 目前保存的使用者型別；Role 是 ADMIN 或 USER 的編譯期字串聯集。
 * 介面目前還要求 password 與數字型 phone，但後端登入及 /auth/me 的 UserResponse 不提供這兩欄。
 * 這項落差不會被 Axios 泛型自動偵測，也不代表後端真的回傳了密碼。
 * 真正的登入資訊與角色判斷仍須以後端 Session 及資料庫為準。
 */
export type Role = 'ADMIN' | 'USER';

export interface User{
    id: number,
    name: string,
    password: string,
    email: string,
    phone: number,
    role: Role
}