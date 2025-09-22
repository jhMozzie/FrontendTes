import type { RouteRecordRaw } from "vue-router";
import DashboardView from "./views/DashboardView.vue";

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "dashboard", // 👈 ruta relativa (irá dentro de MainLayout)
    name: "Dashboard",
    component: DashboardView,
    meta: { roles: ['admin'] }, // ✅ todos pueden ver lista
  },
];

export default dashboardRoutes;