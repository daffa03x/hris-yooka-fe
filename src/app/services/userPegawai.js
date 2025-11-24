import api from "../lib/axios";

const endPoint = "get-pegawai/by-token";

export async function getPegawaiByToken(){
  try {
    const res = await api.get(endPoint);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return {
        error: true,
        status: 403,
        message: "Forbidden: Anda tidak memiliki akses.",
        data: [],
      };
    }
  console.error("Kesalahan saat mengambil data:", err.message);
  return null;
  }
}

export async function putUserPegawaiGeneral(formData){
  try {
    const res = await api.post("user/update-pegawai", formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return {
        error: true,
        status: 403,
        message: "Forbidden: Anda tidak memiliki akses.",
        data: [],
      };
    }
  }
}

export async function putUserPegawaiKontak(formData){
  try {
    const res = await api.post("user/update-kontak", formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return {
        error: true,
        status: 403,
        message: "Forbidden: Anda tidak memiliki akses.",
        data: [],
      };
    }
  }
}

export async function putUserPegawaiKontrak(formData){
  try {
    const res = await api.post("user/update-kontrak", formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return {
        error: true,
        status: 403,
        message: "Forbidden: Anda tidak memiliki akses.",
        data: [],
      };
    }
  }
}

export async function putUserPegawaiPendidikan(formData){
  try {
    const res = await api.post("user/update-pendidikan", formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return {
        error: true,
        status: 403,
        message: "Forbidden: Anda tidak memiliki akses.",
        data: [],
      };
    }
  }
}