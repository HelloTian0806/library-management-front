<template>
    <MemberSearchBar @emitAllMembers="getAllMembers" @emitSearchName="getByName" />
    <a-table :data-source="members" :columns="columns">
    </a-table>
</template>

<script setup lang='ts'>
import { memberApi } from '@/api/MemberApi';
import MemberSearchBar from '@/components/member/MemberSearchBar.vue';
import type { Member } from '@/model/Member';
import { ref } from 'vue';

const members = ref<Member[]>([]);

async function getAllMembers() {
    const response = await memberApi.getAll();
    members.value = response.data;
}

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