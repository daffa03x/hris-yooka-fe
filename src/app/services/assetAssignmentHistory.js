import api from "../lib/axios";

const endPoint = "asset-assignment-history";
export async function getAssetAssignmentHistory({
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
  console.error("Kesalahan saat mengambil data asset assignment:", err.message);
  return null;
  }
}