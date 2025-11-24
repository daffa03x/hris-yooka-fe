import api from "../lib/axios";

const endPoint = "asset";
export async function getAsset({
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
    console.error("Gagal ambil pegawai:", err.message);
    return null;
  }
}

export async function getAssetById(id) {
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
    console.error("Gagal ambil pegawai:", err.message);
    return null;
  }
}

export async function storeAsset(formData) {
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
    console.error("Gagal simpan pegawai:", err.message);
    return null;
  }
}

export async function updateAsset(id, formData) {
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
    console.error("Gagal ubah pegawai:", err.message);
    return null;
  }
}

export async function deleteAsset(id) {
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
    console.error("Gagal hapus pegawai:", err.message);
    return null;
  }
}