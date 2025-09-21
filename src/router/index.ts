// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/authStore"; // 👈 importa tu store

// --- LAYOUTS ---
import MainLayout from "@/layouts/MainLayout.vue";

// --- RUTAS ---
import championshipRoutes from "@/modules/championships/routes";
import academyRoutes from "@/modules/academies/routes";
import studentRoutes from "@/modules/students/routes";
import userRoutes from "@/modules/users/routes";
import authRoutes from "@/modules/auth/routes";

// --- Hijos del MainLayout ---
const mainLayoutChildren: RouteRecordRaw[] = [
  ...championshipRoutes.filter((route) => !route.path.startsWith("/")),
  ...academyRoutes,
  ...studentRoutes,
  ...userRoutes,
];

// --- Rutas de detalle ---
const detailLayoutRoutes: RouteRecordRaw[] = [
  ...championshipRoutes.filter((route) => route.path.startsWith("/")),
];

// --- Configuración de rutas ---
const routes: RouteRecordRaw[] = [
  ...authRoutes, // públicas: login
  {
    path: "/",
    component: MainLayout,
    children: mainLayoutChildren,
    redirect: "/championships",
  },
  ...detailLayoutRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- Guard global de autenticación ---
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Si no es pública y no hay usuario → login
  if (!to.meta.public && !auth.isAuthenticated) { // 👈 sin ()
    return next("/login");
  }

  // Si ya está autenticado y va al login → dashboard o championships
  if (to.path === "/login" && auth.isAuthenticated) { // 👈 sin ()
    return next("/dashboard"); // o "/championships"
  }

  next();
});

export default router;