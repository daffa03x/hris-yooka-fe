import api from "../lib/axios";

const endPoint = "recruitment-identitas";
export async function getRecruitmentIdentitas({
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
  console.error("Kesalahan saat mengambil data rekrutment:", err.message);
  return null;
  }
}

export async function deleteRecruitmentIdentitas(id) {
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
  console.error("Kesalahan saat hapus data rekrutment:", err.message);
  return null;
  }
}

export async function updateStatusRecruitmentIdentitas(id, status_recruitment) {
  try {
    const res = await api.put(`${endPoint}/status/${id}`, {status_recruitment: status_recruitment});
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
  console.error("Kesalahan saat ubah status rekrutment:", err.message);
  return null;
  }
}

export async function getIdentitasKarirById(id) {
  try {
    const res = await api.get(`${endPoint}/identitas-by-karir/${id}`);
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
  console.error("Kesalahan saat mengambil data rekrutment karir:", err.message);
  return null;
  }
}

export async function getIdentitasPendidikanById(id) {
  try {
    const res = await api.get(`${endPoint}/identitas-by-pendidikan/${id}`);
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
  console.error("Kesalahan saat mengambil data rekrutment pendidikan:", err.message);
  return null;
  }
}

export async function getIdentitasPertanyaanById(id) {
  try {
    const res = await api.get(`${endPoint}/identitas-by-pertanyaan/${id}`);
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
  console.error("Kesalahan saat mengambil data rekrutment pertanyaan:", err.message);
  return null;
  }
}
