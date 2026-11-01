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
