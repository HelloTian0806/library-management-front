/**
 * 描述前端使用的書籍欄位，名稱對應目前後端 Book 的 JSON 屬性。
 * totalQuantity 是館藏冊數，availableQuantity 是目前可借冊數；id 是書籍識別值。
 * 所有欄位目前皆標為必要，這個介面不會初始化物件或檢查數量上下限。
 */
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