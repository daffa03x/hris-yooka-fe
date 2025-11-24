import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
const endPoint = "absensi-today";

export async function getAbsensiToday() {

  try {
    const response = await axios.get(`${apiUrl}/${endPoint}`);

    return response;
  } catch (err) {
    console.error(err.message);
  }
}

export async function storeAbsensiToday(id_card) {
  try {
    const response = await axios.post(`${apiUrl}/${endPoint}`, {
      id_card: id_card, // Langsung object tanpa body
    });
    return response;
  } catch (err) {
    console.error(err.message);
    throw err; // Tambahkan ini agar error bisa ditangkap di component
  }
}
