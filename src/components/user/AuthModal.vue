<template>
    <a-modal :open="open" @cancel="handleCancel" :footer="null" :title="mode === 'login' ? '會員登入' : '會員註冊'"
        >
        <!-- login表單 -->
        <a-form v-if="mode == 'login'" :model="loginForm" name="basic" layout="vertical" autocomplete="off"
            @finish="handleLogin" @finishFailed="onFinishFailed" :rules="loginRules">
            <a-form-item label="Email" name="email">
                <a-input v-model:value="loginForm.email" />
            </a-form-item>

            <a-form-item label="密碼" name="password">
                <a-input-password v-model:value="loginForm.password" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" block :loading="loading">登入</a-button>
            </a-form-item>
            <div>還沒有帳號?<a @click="mode = 'register'">註冊</a></div>
        </a-form>
        <!-- register表單 -->
        <a-form v-else :model="registerForm" name="basic" layout="vertical" autocomplete="off" :rule="registerRules" @finish="handleRegister"
            @finishFailed="onFinishFailed">

            <a-form-item label="名稱" name="name">
                <a-input v-model:value="registerForm.name" />
            </a-form-item>

            <a-form-item label="Email" name="email">
                <a-input v-model:value="registerForm.email" />
            </a-form-item>

            <a-form-item label="密碼" name="password">
                <a-input-password v-model:value="registerForm.password" />
            </a-form-item>
            
            <a-form-item label="電話" name="phone">
                <a-input v-model:value="registerForm.phone" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" block>註冊</a-button>
            </a-form-item>
            <div @click="mode = 'login'">已經有帳號?<a @click="mode = 'login'">登入</a></div>
        </a-form>
    </a-modal>
</template>

<script setup lang='ts'>
/**
 * 集中呈現登入與註冊表單，以 ref 控制模式及開關，以 reactive 保存各欄位。
 * v-model:value 連接 Ant Design Vue 輸入元件；Form 的 finish 事件在表單驗證流程完成後呼叫。
 * 目前登入表單使用 rules，註冊表單卻寫成 rule，不能假設 registerRules 已正確套用。
 * 前端驗證提供操作提示，後端 DTO 與帳密驗證仍會獨立執行。
 */
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue'
import type { LoginRequest, RegisterRequest } from '@/model/Auth';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import type { User } from '@/model/User';
/**
 * defineModel 對應父層 v-model:open，設定 open.value 會通知父層更新開關。
 */
const open = defineModel<boolean>('open')
const mode = ref<'login' | 'register'>('login')
const loginRules = {
    email: [{ required: true, message: '請輸入帳號' }],
    password: [{ required: true, message: '請輸入密碼' }]
}
/**
 * 以 reactive 讓表單欄位變更可被追蹤；這是物件代理，在程式中不使用 .value。
 */
const loginForm = reactive<LoginRequest>({
    email: '',
    password: ''
});

const registerRules = {
    name:[{ required: true, message: '請輸入名稱'}],
    email:[{required: true, message: '請輸入Email'}],
    password:[{required: true, message: '請輸入密碼'}],
    phone:[{required: true, message: '請輸入電話'}]
}

const registerForm = reactive<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    phone:''
});
/**
 * 只關閉對話框，不重設模式、表單欄位或登入狀態。
 */
function handleCancel() {
    open.value = false
}
/**
 * 此回呼目前沒有綁到模板；實際 finish 事件分別使用 handleLogin 與 handleRegister。
 */
const onFinish = (values: any) => {
    console.log('Success:', values);
};

/**
 * 接收表單驗證失敗資訊並記錄；不是 Axios 請求失敗的處理函式。
 */
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

// 登入
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

/**
 * 設定 loading 後送出登入請求；成功則更新 Store、關閉視窗，管理者另導向 /admin。
 * 失敗顯示一般提示，finally 無論成功或失敗都結束 loading；此函式未清空輸入欄位。
 */
async function handleLogin() {
    loading.value = true;
    try {
        const response = await authApi.login(loginForm)
        authStore.user = response.data
        message.success("登入成功");
        open.value = false;
        if(authStore.user.role==='ADMIN'){
            router.push("/admin")
        }
    } catch (error) {
        message.error("登入失敗");
    } finally {
        loading.value = false;
    }

}
// 註冊
/**
 * 送出註冊請求並提示結果，成功後導向首頁。
 * 目前不更新 Store、對話框模式或開關；註冊成功也不等於已登入。
 */
async function handleRegister() {
    try{
        await authApi.register(registerForm);
        message.success("註冊成功");
        router.push('/');
    }catch{
        message.error("註冊失敗");
    }
}
</script>

<style scoped></style>