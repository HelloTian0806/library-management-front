/**
 * 描述儀表板四項統計，但目前欄位型別是數字字面值 0，意思是只接受零。
 * 這不是設定預設值；真正的初始值是在 DashBoardView 建立 ref 時提供。
 * 後端實際可能回傳其他整數，本次只註明差異，不將型別改為 number。
 */
export interface Dashboard {
    totalBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    overdueBorrows: 0
}