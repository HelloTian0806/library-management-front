import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/user/HomeView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import BookManagementView from "@/views/admin/BookManagementView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import MemberManagementView from "@/views/admin/MemberManagementView.vue";
import BorrowManagementView from "@/views/admin/BorrowManagementView.vue";
import BookSearchView from "@/views/user/BookSearchView.vue";
import MyBorrowView from "@/views/user/MyBorrowView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        { path: '', component: HomeView },
        { path: 'books', component: BookSearchView },
        { path: 'my-borrows', component: MyBorrowView },
        { path: 'profile', component: ProfileView }
      ]
    },

    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', component: DashboardView },
        { path: 'books', component: BookManagementView },
        { path: 'members', component: MemberManagementView },
        { path: 'borrows', component: BorrowManagementView }
      ],
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    }
  ]
});

router.beforeEach(async (to) => {

  const authStore = useAuthStore();

  await authStore.checkLogin();

  if (to.meta.requiresAuth && !authStore.user) {
    return '/';
  }

  if (to.meta.requiresAuth && authStore.user?.role !== 'ADMIN'){
    return '/';
  }
})




export default router;