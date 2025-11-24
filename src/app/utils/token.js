import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token", { path: "/" });
};

export const setToken = (token) => {
  Cookies.set("token", token, {
    httpOnly: false, // Cookies js tidak mendukung properti ini
    secure: process.env.NODE_ENV === "production", // Gunakan HTTPS di produksi
    expires: 1 / 24, // Cookie berlaku selama 1 jam
  });
};
