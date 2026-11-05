/**
 * 建立 Vue 應用程式，依原有順序安裝 Router、Ant Design Vue 與 Pinia，再掛載至 #app。
 * Router 決定頁面，Pinia 提供跨元件狀態，Ant Design Vue 註冊 a-table、a-modal 等元件。
 * 匯入的 theme.css 是全域樣式；畫面的根元件實際位於 views/App.vue。
 * 此入口只組裝前端，後端 Session 與權限仍由 API 判斷。
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './views/App.vue'
import router from './router/index.ts'
import Antd from 'ant-design-vue'
import './assets/styles/theme.css'
// import 'ant-design-vue/dist/reset.css'
const app = createApp(App)
app.use(router);
app.use(Antd)
app.use(createPinia())
app.mount('#app');
