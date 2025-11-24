import { removeToken } from "../utils/token";
import api from "../lib/axios";

export async function login({ email, password }) {
  try {
    const response = await api.post("login", { email, password });
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function logout() {
  try {
    const response = await api.post("logout");
    if (response.data) {
      removeToken(); // Hapus token dari storage
      return response.data; // Return respons data
    } else {
      return null;
    }
  } catch (err) {
    // Log kesalahan secara detail
    console.error(err.message);
  }
}

export async function getUser() {
  try {
    const response = await api.get("get-user");
    return response;
  } catch (err) {
    console.log(err)
  }
}
