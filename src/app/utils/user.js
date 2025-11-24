import axios from "axios";

export const getUserToken = async (token) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
  const endPoint = "get-user";
  if (!token) return null;
  try {
    const response = await axios.get(`${apiUrl}/${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Header Bearer token
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
