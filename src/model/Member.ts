import type { Role } from "./User"

export interface Member {
    id: number,
    name: string,
    email: string,
    phone: string,
    createdAt: string,
    role: Role
}