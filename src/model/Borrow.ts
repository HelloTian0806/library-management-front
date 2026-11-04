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