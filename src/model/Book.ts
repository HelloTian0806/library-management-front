export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  totalQuantity: number;
  availableQuantity: number;
};