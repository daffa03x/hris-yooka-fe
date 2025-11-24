import axios from "axios";
import { checkAuth } from "./checkAuth";

export const getKategoriAsset = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
  const endPoint = "get-kategori-asset";
  const token = checkAuth();
  if (!token) return null;
  try {
    const response = await axios.get(`${apiUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Header Bearer token
      },
    });

    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};
