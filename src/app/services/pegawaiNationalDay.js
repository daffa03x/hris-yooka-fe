import api from "../lib/axios";

const endPoint = "national-day";
export async function getNationalDay({ perpage = 5, page = 1, search = "" }) {
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
  console.error("Kesalahan saat mengambil data national day:", err.message);
  return null;
  }
}

export async function getNationalDayById(id) {
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
  console.error("Kesalahan saat mengambil data national day by id:", err.message);
  return null;
  }
}

export async function storeNationalDay(formData) {
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
  console.error("Kesalahan saat simpan data national day:", err.message);
  return null;
  }
}

export async function updateNationalDay(id, formData) {
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
  console.error("Kesalahan saat ubah data national day:", err.message);
  return null;
  }
}

export async function deleteNationalDay(id) {
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
  console.error("Kesalahan saat hapus data national day:", err.message);
  return null;
  }
}

export async function generateNationalDay(){
    try {
        const res = await api.post('generate-national-day',{});
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
        console.error("Kesalahan saat generate national day:", err.message);
        return null;
    }
}

export async function deleteAllNationalDay(){
    try {
        const res = await api.delete('delete-national-day',{});
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
        console.error("Kesalahan saat generate national day:", err.message);
        return null;
    }
}
