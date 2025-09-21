import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { LoginResponse } from "../types";
import { login as loginService } from "../services";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const user = ref<LoginResponse["user"] | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // ✅ ahora es un getter reactivo
  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string) {
    try {
      const res: LoginResponse = await loginService({ email, password });
      token.value = res.token;
      user.value = res.user;

      // persistencia
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      return true;
    } catch (error) {
      throw new Error("Login fallido");
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return { token, user, isAuthenticated, login, logout };
});