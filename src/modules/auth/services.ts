import axios from "axios";
import type { LoginPayload, LoginResponse } from "./types";
import { useAuthStore } from "./store/authStore";

// Instancia de axios
const api = axios.create({
  baseURL: "http://localhost:3000/api", // ajusta según tu backend
});

// Interceptor para enviar el token
api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export async function login(data: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export { api };