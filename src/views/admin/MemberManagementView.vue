<template>
    <MemberSearchBar @emitAllMembers="getAllMembers" @emitSearchName="getByName" />
    <a-table :data-source="members" :columns="columns">
    </a-table>
</template>

<script setup lang='ts'>
/**
 * 管理端會員頁，接收搜尋列事件後向後端查詢，再以 ref 更新表格。
 * 目前初始清單為空，沒有 onMounted 自動載入；資料由所有會員或姓名搜尋按鈕觸發。
 * dataIndex 對應 MemberResponse 欄位，畫面不負責管理者授權或查詢資料庫。
 */
import { memberApi } from '@/api/MemberApi';
import MemberSearchBar from '@/components/member/MemberSearchBar.vue';
import type { Member } from '@/model/Member';
import { ref } from 'vue';

const members = ref<Member[]>([]);

/**
 * 等待全部會員回應後取代清單；沒有在此捕捉失敗或保留額外的載入狀態。
 */
async function getAllMembers() {
    const response = await memberApi.getAll();
    members.value = response.data;
}

/**
 * 將搜尋列事件的文字傳給會員姓名 API，將 DTO 清單交給表格。
 * @param keyword 會員姓名搜尋文字
 */
async function getByName(keyword: string) {
    const response = await memberApi.getByName(keyword);
    members.value = response.data;

}

const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id'
},
{
    title: '名稱',
    dataIndex: 'name',
    key: 'name'
},
{
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
},
{
    title: '電話',
    dataIndex: 'phone',
    key: 'phone'
},
{
    title: '建立日期',
    dataIndex: 'createdAt',
    key: 'createdAt'
},
{
    title: '權限',
    dataIndex: 'role',
    key: 'role'
}
]
</script>

<style></style>