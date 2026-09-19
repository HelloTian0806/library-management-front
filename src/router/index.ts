import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import BookManagementView from "@/views/BookManagementView.vue";
import DashBoardView from "@/views/DashBoardView.vue";
import MemberManagementView from "@/views/MemberManagementView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/",
            component:AdminLayout,
            children: [
                {
                    path:'',
                    name:'home',
                    component:HomeView
                },
                {
                    path:'book',
                    name:'book',
                    component:BookManagementView
                },
                {
                    path:'dashboard',
                    name:'dashboard',
                    component:DashBoardView
                },
                {
                    path:'member',
                    name:'member',
                    component:MemberManagementView
                }
            ]
        }
    ]
});

export default router;