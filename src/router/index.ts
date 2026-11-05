/**
 * 建立巢狀路由：Layout 放共用頁首與框架，子路由在 Layout 的 RouterView 顯示。
 * createWebHistory 使用一般 URL 路徑；部署時的重新整理能否成功仍需伺服器提供相應入口。
 * meta 是自訂標記，需由 beforeEach 主動讀取，不會自動產生權限保護。
 * 前端導覽守衛改善畫面流程，後端 API 仍必須自行檢查身分與角色。
 * 目前儀表板 import 使用 DashboardView.vue，實際檔名是 DashBoardView.vue，大小寫不一致。
 */
import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/user/HomeView.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import BookManagementView from "@/views/admin/BookManagementView.vue";
import DashBoardView from "@/views/admin/DashboardView.vue";
import MemberManagementView from "@/views/admin/MemberManagementView.vue";
import BorrowManagementView from "@/views/admin/BorrowManagementView.vue";
import BookSearchView from "@/views/user/BookSearchView.vue";
import MyBorrowView from "@/views/user/MyBorrowView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import { useRouter } from "vue-router";
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
        { path: '', component: DashBoardView },
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

/**
 * 每次導覽先等待登入檢查，再依目標路由 meta 判斷是否導回首頁。
 * 目前兩個判斷都讀 requiresAuth，沒有讀 requiresAdmin；第二個判斷要求角色為 ADMIN。
 * checkLogin 的失敗分支目前會保留舊 user，所以守衛結果仍可能依賴過期前端狀態。
 * @param to 即將進入的目標路由；回傳 / 代表重新導向，沒有回傳值時繼續導覽
 */
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