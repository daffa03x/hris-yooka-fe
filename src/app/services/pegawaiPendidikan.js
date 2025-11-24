import api from "../lib/axios";

const endPoint = "pegawai-pendidikan";
export async function getPegawaiPendidikan({ perpage = 5, page = 1, search = "" }) {
  try {
    // Membangun parameter query
    const queryParams = {
      perpage,
      page,
      search,
    };
    const res = await api.get(endPoint, {
      params: queryParams,
    });

    return {
      data: res.data.data,
      pagination: {
        currentPage: res.data.current_page,
        lastPage: res.data.last_page,
        perPage: res.data.per_page,
        total: res.data.total,
        prevPageUrl: res.data.prev_page_url,
        nextPageUrl: res.data.next_page_url,
      },
    };
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return {
        error: true,
        status: 403,
        message: "Forbidden: Anda tidak memiliki akses.",
        data: [],
        pagination: {
          currentPage: 1,
          lastPage: 1,
          perPage: perpage,
          total: 0,
          prevPageUrl: null,
          nextPageUrl: null,
        },
      };
    }
  console.error("Kesalahan saat mengambil data pegawai pendidikan:", err.message);
  return null;
  }
}

export async function getPegawaiPendidikanById(id) {
  try {
    const res = await api.get(`${endPoint}/${id}`);
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
  console.error("Kesalahan saat mengambil data pegawai pendidikan:", err.message);
  return null;
  }
}

export async function storePegawaiPendidikan(formData) {
  try {
    const res = await api.post(endPoint, formData, {});
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
  console.error("Kesalahan saat simpan data pegawai pendidikan:", err.message);
  return null;
  }
}

export async function updatePegawaiPendidikan(id, formData) {
  try {
    const res = await api.post(`${endPoint}/${id}`, formData, {});
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
  console.error("Kesalahan saat ubah data pegawai pendidikan:", err.message);
  return null;
  }
}

export async function deletePegawaiPendidikan(id) {
  try {
    const res = await api.delete(`${endPoint}/${id}`);
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
  console.error("Kesalahan saat hapus data pegawai pendidikan:", err.message);
  return null;
  }
}
