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
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue'
import type { LoginRequest, RegisterRequest } from '@/model/Auth';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import type { User } from '@/model/User';
const open = defineModel<boolean>('open')
const mode = ref<'login' | 'register'>('login')
const loginRules = {
    email: [{ required: true, message: '請輸入帳號' }],
    password: [{ required: true, message: '請輸入密碼' }]
}
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
function handleCancel() {
    open.value = false
}
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

// 登入
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

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