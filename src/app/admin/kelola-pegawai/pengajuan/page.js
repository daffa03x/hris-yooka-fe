"use client";
import Dashboard from "@/app/layouts/AdminDashboard";
import { FaCircleNotch, FaMagnifyingGlass, FaRegTrashCan, FaX } from "react-icons/fa6";
import { useGetData } from "@/app/hook/useGetData";
import { changeStatus, deletePegawaiPengajuanAbsensi, getPegawaiPengajuanAbsen } from "@/app/services/pegawaiPengajuanAbsen";
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { toast, Bounce } from "react-toastify";
// import EditButton from "@/app/components/common/EditButton";
import LinkButton from "@/app/components/common/LinkButton";

const Pengajuan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startState, setStartState] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [endState, setEndState] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [loadingRow, setLoadingRow] = useState(null);

  const { 
    data, 
    setData,
    searchQuery, 
    setSearchQuery, 
    filters, 
    handleFilterChange, 
    pagination, 
    loading, 
    handleSearch, 
    handleResetSearch, 
    handlePageChange, 
    handlePerPageChange, 
    handleDelete, 
    refetchData,
  } = useGetData(getPegawaiPengajuanAbsen, deletePegawaiPengajuanAbsensi);
  
  // Handle apply selection
  const handleApply = () => {
    const payload = {
      tanggal_awal_from: startState[0].startDate.toLocaleDateString('en-CA'),
      tanggal_awal_to: startState[0].endDate.toLocaleDateString('en-CA'),
      tanggal_akhir_from: endState[0].startDate.toLocaleDateString('en-CA'),
      tanggal_akhir_to: endState[0].endDate.toLocaleDateString('en-CA'),
    };
    
    // Apply all the date filters
    handleFilterChange('tanggal_awal_from', payload.tanggal_awal_from);
    handleFilterChange('tanggal_awal_to', payload.tanggal_awal_to);
    handleFilterChange('tanggal_akhir_from', payload.tanggal_akhir_from);
    handleFilterChange('tanggal_akhir_to', payload.tanggal_akhir_to);
    
    setIsModalOpen(false);
  };

  // Reset date filters
  const handleResetDateFilters = () => {
    handleFilterChange('tanggal_awal_from', '');
    handleFilterChange('tanggal_awal_to', '');
    handleFilterChange('tanggal_akhir_from', '');
    handleFilterChange('tanggal_akhir_to', '');
    
    // Reset date pickers to current date
    setStartState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    setEndState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  };


  const handleChangeStatus = async (e, itemId) => {
    const newStatus = e.target.value;
    setLoadingRow(itemId);

    try {
      const response = await changeStatus(itemId, newStatus);
      console.log(response);

      // Update data in state without refetching
      setData((prevData) => prevData.map((item) => (item.id === itemId ? { ...item, status: newStatus, disetujui_oleh: response.data.disetujui_oleh } : item)));

      toast.success(response.message , {
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
    } catch (err) {
      console.error("Gagal update status", err);
      // Optionally refetch data to ensure UI is in sync with backend
      refetchData();
    } finally {
      setLoadingRow(null);
    }
  };
  
  return (
    <Dashboard>
      {/* Date Range Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-full sm:max-w-4xl pr-6">
            <div className="flex justify-between items-center border-b mb-4">
              <h3 className="text-xl font-medium text-gray-800 p-5">Pilih Rentang Tanggal Filter</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FaX className="w-5 h-5" />
              </button>
            </div>

            {/* Tambahkan overflow-x untuk scroll horizontal di mobile */}
            <div className="overflow-x-auto">
              <div className="flex flex-wrap gap-8 w-full">
                {/* DatePicker Tanggal Awal */}
                <div className="flex-1 min-w-[250px] sm:min-w-[300px]">
                  <h4 className="text-lg font-semibold mb-2 px-5">Tanggal Awal</h4>
                  <DateRangePicker
                    onChange={(item) => {
                      setStartState([item.selection]);
                    }}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={startState}
                    direction="vertical"
                  />
                </div>

                {/* Divider */}
                <div className="border-l mx-3 hidden sm:block"></div>

                {/* DatePicker Tanggal Akhir */}
                <div className="flex-1 min-w-[250px] sm:min-w-[300px]">
                  <h4 className="text-lg font-semibold mb-2 px-5">Tanggal Akhir</h4>
                  <DateRangePicker
                    onChange={(item) => {
                      setEndState([item.selection]);
                    }}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={endState}
                    direction="vertical"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 border-t py-4 px-4">
              <button
                onClick={handleResetDateFilters}
                className="btn btn-sm btn-outline-secondary"
              >
                Reset
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-outline-secondary"
              >
                Batal
              </button>
              <button
                onClick={handleApply}
                className="btn btn-sm btn-primary"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data Pengajuan Absensi</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <LinkButton classNameLink="btn btn-primary" classNameLoading="btn btn-primary" link="/admin/kelola-pegawai/pengajuan/create" title="Tambah Pengajuan Absensi"/>
            <div className="md:flex items-center mx-auto text-slate-500 space-x-2 mt-3">
              <div className="flex space-x-2 items-center">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary"
                >
                  Filter Tanggal
                </button>
                {(filters.tanggal_awal_from || filters.tanggal_akhir_from) && (
                  <button 
                    onClick={handleResetDateFilters}
                    className="btn btn-outline-secondary ml-2"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 flex items-center space-x-2">
              {/* Search Bar */}
              <div className="relative text-slate-500">
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

                {/* Tombol Reset */}
                {searchQuery && (
                  <button type="button" className="absolute my-auto inset-y-0 mr-10 right-0 cursor-pointer text-slate-500 hover:text-danger" onClick={handleResetSearch}>
                    <FaX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table content */}
          <div className="intro-y col-span-12 overflow-x-auto">
            <table className="table table-report w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Pegawai</th>
                  <th className="whitespace-nowrap">Jenis Izin</th>
                  <th className="whitespace-nowrap">Tanggal Awal</th>
                  <th className="whitespace-nowrap">Tanggal Akhir</th>
                  <th className="whitespace-nowrap">Keterangan</th>
                  <th className="whitespace-nowrap">Status Pengajuan</th>
                  <th className="whitespace-nowrap">Persetjuan Oleh</th>
                  <th className="whitespace-nowrap">Surat Sakit</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      <div className="loading-container">
                        <FaCircleNotch className="loading-spinner" />
                      </div>
                    </td>
                  </tr>
                ) : pagination.total === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr className="intro-x" key={index}>
                      <td className="w-20">{index + 1}</td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.pegawais.users.name}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.pegawais.nip}</div>
                      </td>
                      <td className="whitespace-nowrap">{item.jenis_izin}</td>
                      <td className="whitespace-nowrap">{item.tanggal_awal}</td>
                      <td className="whitespace-nowrap">{item.tanggal_akhir}</td>
                      <td className="whitespace-nowrap">{item.keterangan}</td>
                      <td className="whitespace-nowrap">
                        {loadingRow === item.id ? (
                          <div className="div-loading">
                            <style>{`
                                .spin {
                                  display: inline;
                                  animation: spin 1s linear infinite;
                                }
                                .div-loading {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    height: 100%;
                                }
                                @keyframes spin {
                                  from { transform: rotate(0deg); }
                                  to { transform: rotate(360deg); }
                                }
                              `}</style>
                            <FaCircleNotch className="spin" />
                          </div>
                        ) : (
                          <select
                            value={item.status}
                            onChange={(e) => handleChangeStatus(e, item.id)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700 hover:border-blue-400 cursor-pointer shadow-sm w-full">
                            <option value="Diajukan">Diajukan</option>
                            <option value="Disetujui">Disetujui</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        )}
                      </td>
                      <td className="whitespace-nowrap">{item.disetujui_oleh ? item.disetujui_oleh : "-"}</td>
                      <td className="whitespace-nowrap">
                        {item.upload_surat_sakit ? (
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}/${item.upload_surat_sakit}`}
                            download
                            target="_blank"
                            className="btn btn-success text-white"
                          >
                            Download Surat
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          {/* <EditButton link={`admin/kelola-pegawai/pengajuan/edit/${item.id}`} /> */}
                          <button onClick={() => handleDelete(item.id)} className="flex items-center text-danger">
                            <FaRegTrashCan className="w-4 h-4 mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <button className={`btn ${pagination.prevPageUrl ? "btn-primary" : "btn-disabled"}`} disabled={!pagination.prevPageUrl} onClick={() => handlePageChange(pagination.currentPage - 1)}>
                Previous
              </button>

              <span className="mx-4">
                Page {pagination.currentPage} of {pagination.lastPage}
              </span>

              <button className={`btn ${pagination.nextPageUrl ? "btn-primary" : "btn-disabled"}`} disabled={!pagination.nextPageUrl} onClick={() => handlePageChange(pagination.currentPage + 1)}>
                Next
              </button>
            </nav>
            <div className="hidden md:block mx-auto text-slate-500" style={{ paddingRight: "20%" }}>
              Showing page {pagination.currentPage} to {pagination.lastPage} of {pagination.total} data
            </div>
            <select name="perpage" className="w-20 form-select box" value={pagination.perPage} onChange={handlePerPageChange}>
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

export default Pengajuan;