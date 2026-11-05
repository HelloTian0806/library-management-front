/**
 * 描述管理端會員回應，角色沿用 User 模組的 Role 字串聯集。
 * createdAt 在此以字串接收，手機使用字串以保留前導零。
 * 這是 TypeScript 型別，不會替 API 驗證欄位、建立日期物件或決定資料存取權限。
 */
import type { Role } from "./User"

export interface Member {
    id: number,
    name: string,
    email: string,
    phone: string,
    createdAt: string,
    role: Role
}