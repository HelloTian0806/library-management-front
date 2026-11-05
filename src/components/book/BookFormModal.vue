<template>
  <a-modal
    :open="open"
    :title="book === null ? '新增書籍' : '修改書籍'"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form
      :model="bookForm"
      layout="vertical"
    >
      <a-form-item label="ISBN">
        <a-input v-model:value="bookForm.isbn" />
      </a-form-item>

      <a-form-item label="書名">
        <a-input v-model:value="bookForm.title" />
      </a-form-item>

      <a-form-item label="作者">
        <a-input v-model:value="bookForm.author" />
      </a-form-item>

      <a-form-item label="出版社">
        <a-input v-model:value="bookForm.publisher" />
      </a-form-item>

      <a-form-item label="分類">
        <a-input v-model:value="bookForm.category" />
      </a-form-item>

      <a-form-item label="數量">
        <a-input-number
          v-model:value="bookForm.totalQuantity"
          :min="1"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
/**
 * 以 book prop 決定新增或修改模式，將書籍欄位複製到本地 reactive 表單，避免輸入時直接改動父元件物件。
 * defineModel 定義 open 的雙向綁定，defineEmits 定義 submit 事件，兩者都是 script setup 編譯巨集。
 * 本元件只送出表單事件，不發送 HTTP，也不確認資料已存入資料庫。
 * watch 目前只監聽 book 參照變更，未設定 immediate、deep，也沒有監聽對話框每次開啟。
 */
import { reactive, watch } from 'vue'
import type { Book } from '@/model/Book';
// 接收父元件傳來的 open
const open = defineModel<boolean>('open');

/**
 * book 為 null 表示新增模式；有物件時提供修改欄位，prop 本身由父元件持有。
 */
const props = defineProps<{book: Book | null}>()


// 往父元件發送的事件
const emit = defineEmits<{
  (e: 'submit', book: BookForm): void
}>()

// 定義表單資料型別
/**
 * 描述本地表單輸入，不包含書籍 ID 或可借數量；介面不會自動執行表單驗證。
 */
interface BookForm {
  isbn: string
  title: string
  author: string
  publisher: string
  category: string
  totalQuantity: number
}

// 表單資料
const bookForm = reactive<BookForm>({
  isbn: '',
  title: '',
  author: '',
  publisher: '',
  category: '',
  totalQuantity: 1
})

/**
 * 以展開運算子建立目前欄位的淺拷貝，送出 submit 事件後立即關閉視窗。
 * 目前沒有 await 儲存或表單驗證；父元件也未綁定 submit，因此事件不會自動變成後端寫入。
 */
function handleSubmit() {
  emit('submit', { ...bookForm })
  open.value = false
}

/**
 * 只關閉視窗，不重設 bookForm；再次開啟不一定會觸發 book 的 watch。
 */
function handleCancel() {
  open.value = false
}
// 監聽
/**
 * 監聽 props.book 參照變更，有資料就複製欄位，null 則重設預設值。
 * 未設 immediate，首次建立元件不會立刻執行回呼；同一參照再次開窗也不會只因 open 改變而執行。
 */
watch(
  () => props.book,
  (book) => {
    if (book !== null) {
      bookForm.isbn = book.isbn
      bookForm.title = book.title
      bookForm.author = book.author
      bookForm.publisher = book.publisher
      bookForm.category = book.category
      bookForm.totalQuantity = book.totalQuantity
    } else {
      bookForm.isbn = ''
      bookForm.title = ''
      bookForm.author = ''
      bookForm.publisher = ''
      bookForm.category = ''
      bookForm.totalQuantity = 1
    }
  }
)
</script>