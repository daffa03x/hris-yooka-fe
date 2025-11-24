import { toast, Bounce } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

export const useGetData = (getData, deleteData, changeStatus) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [filters, setFilters] = useState({}); // State untuk filter
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 5,
    total: 0,
    prevPageUrl: null,
    nextPageUrl: null,
  });
  const [loading, setLoading] = useState(false); // Tambahkan state loading

  const fetchData = useCallback(
    async (page, perPage, searchQuery = "", filterOptions = filters) => {
      setLoading(true);
      try {
        const response = await getData({ perpage: perPage, page, search: searchQuery, filters: filterOptions });
        setData(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Error fetching data:", error);
        setToastMessage("Gagal mengambil data");
        toast.error("Gagal mengambil data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    },
    [filters, getData]
  );
  useEffect(() => {
    fetchData(pagination.currentPage, pagination.perPage, searchQuery, filters);
  }, [pagination.currentPage, pagination.perPage, searchQuery, filters, fetchData]);

  // Simplified refetchData function that uses the existing fetchData
  const refetchData = () => {
    fetchData(pagination.currentPage, pagination.perPage, searchQuery, filters);
  };

  const handlePageChange = (page) => {
    if (page && page !== pagination.currentPage) {
      console.log(page);
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
  };

  const handlePerPageChange = (e) => {
    setPagination((prev) => ({ ...prev, perPage: parseInt(e.target.value), currentPage: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    fetchData(1, pagination.perPage, searchQuery); // Reset ke halaman 1 saat melakukan pencarian
  };

  const handleResetSearch = () => {
    setSearchQuery(""); // Kosongkan search query
    fetchData(1, pagination.perPage, ""); // Muat ulang data tanpa filter
  };

  // Fungsi untuk menangani perubahan filter
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset ke halaman 1
  };

  // Fungsi untuk reset semua filter
  const handleResetFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchData(1, pagination.perPage, searchQuery, {});
  };

  // Fungsi untuk menerapkan multiple filter sekaligus
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      localStorage.removeItem("successMessage");

      // Set hanya jika pesan berbeda
      setToastMessage((prev) => (prev !== successMessage ? successMessage : prev));
    }
  }, []);

  useEffect(() => {
    if (toastMessage) {
      handleToast(toastMessage);
    }
  }, [toastMessage]);

  const handleToast = (successMessage) => {
    toast.success(successMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (confirmDelete) {
      const response = await deleteData(id);
      console.log(response);
      if (response) {
        handleToast("Berhasil menghapus data");
        fetchData(pagination.currentPage, pagination.perPage, searchQuery);
      }
    }
  };

  const handleChangeStatus = async (id) => {
    const response = await changeStatus(id);
    console.log(response);
    if (response) {
      handleToast(response);
      fetchData(pagination.currentPage, pagination.perPage, searchQuery);
    }
  };

  return {
    setData, // Expose setData for direct state updates
    setSearchQuery,
    data,
    searchQuery,
    filters,
    pagination,
    loading,
    fetchData,
    refetchData, // Add the refetchData function
    handlePageChange,
    handlePerPageChange,
    handleSearch,
    handleResetSearch,
    handleDelete,
    handleChangeStatus,
    handleFilterChange,
    handleResetFilters,
    handleApplyFilters,
  };
};
