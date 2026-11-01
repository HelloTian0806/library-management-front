export interface Borrow{
    id: number,
    memberId: number,
    bookTitle: string,
    borrowDate: string,
    dueDate: string,
    returnDate: string,
    status: 'BORROWED' | 'RETURNED' | 'OVERDUE'
}