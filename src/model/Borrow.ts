/**
 * 描述目前借閱畫面共用的資料型別，status 以字串聯集限制可寫的狀態名稱。
 * 日期在 JSON 中以字串接收，TypeScript 不會自動將它轉成 Date。
 * 這個介面目前偏向管理端回應，要求 memberId、memberName；後端會員端 BorrowResponse 沒有這兩欄。
 * returnDate 目前只標 string，但後端尚未歸還時可回傳 null，型別未完整表達這個情況。
 */
export interface Borrow{
    id: number,
    memberId: number,
    memberName: string,
    bookTitle: string,
    borrowDate: string,
    dueDate: string,
    returnDate: string,
    status: 'BORROWED' | 'RETURNED' | 'OVERDUE'
}