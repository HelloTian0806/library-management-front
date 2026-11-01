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
import { reactive, watch } from 'vue'
import type { Book } from '@/model/Book';
// 接收父元件傳來的 open
const open = defineModel<boolean>('open');

const props = defineProps<{book: Book | null}>()


// 往父元件發送的事件
const emit = defineEmits<{
  (e: 'submit', book: BookForm): void
}>()

// 定義表單資料型別
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

function handleSubmit() {
  emit('submit', { ...bookForm })
  open.value = false
}

function handleCancel() {
  open.value = false
}
// 監聽
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