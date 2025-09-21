import type { RouteRecordRaw } from "vue-router";
import LoginView from "./views/LoginView.vue";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { public: true },
  },
];

export default authRoutes;