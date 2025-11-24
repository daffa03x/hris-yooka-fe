import axios from "axios";
import { checkAuth } from "../utils/checkAuth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
});

// Tambahkan token ke setiap request
api.interceptors.request.use((config) => {
  const token = checkAuth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
