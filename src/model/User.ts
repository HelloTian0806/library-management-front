export type Role = 'ADMIN' | 'USER';

export interface User{
    id: number,
    name: string,
    password: string,
    email: string,
    phone: number,
    role: Role
}