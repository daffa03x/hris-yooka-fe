import api from "../lib/axios";

const endPoint = "dashboard";

export async function getDataDashboard(){
    try {
    const res = await api.get(endPoint);
    return res.data.data;
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