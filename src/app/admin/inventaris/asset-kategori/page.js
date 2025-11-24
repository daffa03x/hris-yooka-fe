"use client";
import { useState } from "react";
import { FaCircleNotch, FaMagnifyingGlass, FaRegTrashCan, FaX, FaPlus, FaCheck, FaPencil } from "react-icons/fa6";
import Dashboard from "@/app/layouts/AdminDashboard";
import { deleteAssetKategori, getAssetKategori, storeAssetKategori, updateAssetKategori } from "@/app/services/assetKategori";
import { useGetData } from "@/app/hook/useGetData";
import { toast, Bounce } from "react-toastify";

const AssetKategori = () => {
  // Existing data fetching logic
  const { 
    data, 
    searchQuery, 
    setSearchQuery, 
    pagination, 
    loading, 
    handleSearch, 
    handleResetSearch, 
    handlePageChange, 
    handlePerPageChange, 
    handleDelete,
    refetchData
  } = useGetData(getAssetKategori, deleteAssetKategori);

  // Form state for creating new asset category
  const [formData, setFormData] = useState({
    id: null,
    nama_kategori: "",
    keterangan: ""
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Start editing a row
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      _method: "PUT",
      id: item.id,
      nama_kategori: item.nama_kategori,
      keterangan: item.keterangan || ""
    });
    setIsAddingNew(false); // Close add form if open
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      id: null,
      nama_kategori: "",
      keterangan: ""
    });
  };

  // Handle update submission
  const handleUpdate = async () => {
    if (!formData.nama_kategori.trim()) {
      toast.error("Nama kategori tidak boleh kosong", {
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
      return;
    }
    
    setIsSubmitting(true);

    try {
      await updateAssetKategori(formData.id, formData);
      toast.success("Kategori berhasil diperbarui", {
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
      refetchData(); // Refresh the table data
      setEditingId(null); // Exit edit mode
      setFormData({
        id: null,
        nama_kategori: "",
        keterangan: ""
      });
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui kategori", {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission for new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama_kategori.trim()) {
      toast.error("Nama kategori tidak boleh kosong", {
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
      return;
    }    
    setIsSubmitting(true);

    try {
      await storeAssetKategori(formData);
      setFormData({ id: null, nama_kategori: "", keterangan: "" });
      toast.success("Kategori berhasil ditambahkan", {
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
      refetchData(); // Refresh the table data
      setIsAddingNew(false); // Close the form row
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan kategori", {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle add new form
  const toggleAddNew = () => {
    if (editingId) {
      handleCancelEdit(); // Cancel any active editing
    }
    
    setIsAddingNew(!isAddingNew);
    if (!isAddingNew) {
      setFormData({ id: null, nama_kategori: "", keterangan: "" });
    }
  };

  // Cancel adding new
  const cancelAddNew = () => {
    setIsAddingNew(false);
    setFormData({ id: null, nama_kategori: "", keterangan: "" });
  };

  return (
    <Dashboard>
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data Kategori Asset</h2>
        
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <button 
              onClick={toggleAddNew} 
              className={`btn ${isAddingNew ? "btn-secondary" : "btn-primary"}`}
              disabled={editingId !== null}
            >
              {isAddingNew ? "Batal" : "Tambah Kategori"}
            </button>
            <div className="hidden md:block mx-auto text-slate-500">
              Showing page {pagination.currentPage} to {pagination.lastPage} of {pagination.total} data
            </div>
            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
              <div className="w-56 relative text-slate-500">
                <input
                  type="text"
                  className="form-control w-56 box pr-10"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }}
                />
                <FaMagnifyingGlass className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 cursor-pointer" onClick={handleSearch} />
                {searchQuery && (
                  <button type="button" className="absolute my-auto inset-y-0 mr-10 right-0 cursor-pointer text-slate-500 hover:text-danger" onClick={handleResetSearch}>
                    <FaX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="intro-y col-span-12 overflow-x-auto">
            <table className="table table-report w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Kategori</th>
                  <th className="whitespace-nowrap">Keterangan</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Form row for adding new data */}
                {isAddingNew && (
                  <tr className="intro-x bg-slate-50">
                    <td className="w-40">
                      <FaPlus className="text-primary mx-auto" />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="nama_kategori"
                        value={formData.nama_kategori}
                        onChange={handleInputChange}
                        className="form-control w-full"
                        placeholder="Nama Kategori"
                        disabled={isSubmitting}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleInputChange}
                        className="form-control w-full"
                        placeholder="Keterangan (Opsional)"
                        disabled={isSubmitting}
                      />
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <button 
                          onClick={handleSubmit} 
                          className="flex items-center text-success mr-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <FaCircleNotch className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <FaCheck className="w-4 h-4 mr-1" />
                          )}
                          {isSubmitting ? "Menyimpan..." : "Simpan"}
                        </button>
                        <button 
                          onClick={cancelAddNew} 
                          className="flex items-center text-danger"
                          disabled={isSubmitting}
                        >
                          <FaX className="w-4 h-4 mr-1" /> Batal
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Loading state */}
                {loading ? (
                  <tr>
                    <td colSpan="14" className="text-center">
                      <div className="loading-container">
                        <FaCircleNotch className="loading-spinner" />
                      </div>
                    </td>
                  </tr>
                ) : pagination.total === 0 ? (
                  <tr>
                    <td colSpan="14" className="text-center">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr className={`intro-x ${editingId === item.id ? 'bg-slate-50' : ''}`} key={index}>
                      <td className="w-40">{index + 1}</td>
                      
                      {/* Editable fields when in edit mode */}
                      {editingId === item.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="nama_kategori"
                              value={formData.nama_kategori}
                              onChange={handleInputChange}
                              className="form-control w-full"
                              placeholder="Nama Kategori"
                              disabled={isSubmitting}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="keterangan"
                              value={formData.keterangan}
                              onChange={handleInputChange}
                              className="form-control w-full"
                              placeholder="Keterangan (Opsional)"
                              disabled={isSubmitting}
                            />
                          </td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <button 
                                onClick={handleUpdate} 
                                className="flex items-center text-success mr-3"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <FaCircleNotch className="w-4 h-4 mr-1 animate-spin" />
                                ) : (
                                  <FaCheck className="w-4 h-4 mr-1" />
                                )}
                                {isSubmitting ? "Menyimpan..." : "Update"}
                              </button>
                              <button 
                                onClick={handleCancelEdit} 
                                className="flex items-center text-danger"
                                disabled={isSubmitting}
                              >
                                <FaX className="w-4 h-4 mr-1" /> Batal
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* Regular display mode */}
                          <td className="whitespace-nowrap">{item.nama_kategori}</td>
                          <td className="whitespace-nowrap">{item.keterangan ? item.keterangan : "-"}</td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <button 
                                onClick={() => handleStartEdit(item)} 
                                className="flex items-center text-primary mr-3"
                                disabled={isAddingNew || editingId !== null}
                              >
                                <FaPencil className="w-4 h-4 mr-1" /> Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)} 
                                className="flex items-center text-danger"
                                disabled={isAddingNew || editingId !== null}
                              >
                                <FaRegTrashCan className="w-4 h-4 mr-1" /> Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <button 
                className={`btn ${pagination.prevPageUrl ? "btn-primary" : "btn-disabled"}`} 
                disabled={!pagination.prevPageUrl} 
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Previous
              </button>

              <span className="mx-4">
                Page {pagination.currentPage} of {pagination.lastPage}
              </span>

              <button 
                className={`btn ${pagination.nextPageUrl ? "btn-primary" : "btn-disabled"}`} 
                disabled={!pagination.nextPageUrl} 
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                Next
              </button>
            </nav>
            <select 
              name="perpage" 
              className="w-20 form-select box" 
              value={pagination.perPage} 
              onChange={handlePerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AssetKategori;