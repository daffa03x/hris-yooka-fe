import api from "../lib/axios";

const endPoint = "pegawai-absensi";
export async function getPegawaiAbsensi({
  perpage = 5,
  page = 1,
  search = "",
  filters = {}, // Parameter filters sebagai object
}) {
  try {
    // Membangun parameter query
    const queryParams = {
      perpage,
      page,
      search,
      // Menambahkan filter ke parameter query
      ...filters,
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
      filters: res.data.filters || {},
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
  console.error("Kesalahan saat mengambil data absensi pegawai:", err.message);
  return null;
  }
}

export async function getPegawaiAbsensiById(id) {
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
  console.error("Kesalahan saat mengambil data absensi pegawai:", err.message);
  return null;
  }
}

export async function storePegawaiAbsensi(formData) {
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
  console.error("Kesalahan saat simpan data absensi pegawai:", err.message);
  return null;
  }
}

export async function updatePegawaiAbsensi(id, formData) {
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
  console.error("Kesalahan saat ubah data absensi pegawai:", err.message);
  return null;
  }
}

export async function deletePegawaiAbsensi(id) {
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
  console.error("Kesalahan saat hapus data absensi pegawai:", err.message);
  return null;
  }
}
