"use client";
import Dashboard from "@/app/layouts/AdminDashboard";
import { FaCircleNotch, FaMagnifyingGlass, FaX } from "react-icons/fa6";
import { useGetData } from "@/app/hook/useGetData";
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { getAssetAssignmentHistory } from "@/app/services/assetAssignmentHistory";

const AssetAssignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startState, setStartState] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);

  const { 
    data, 
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
  } = useGetData(getAssetAssignmentHistory);
  
  // Handle apply selection
  const handleApply = () => {
    const payload = {
      tanggal_awal_from: startState[0].startDate.toLocaleDateString('en-CA'),
      tanggal_awal_to: startState[0].endDate.toLocaleDateString('en-CA'),
    };
    
    // Apply all the date filters
    handleFilterChange('tanggal_awal_from', payload.tanggal_awal_from);
    handleFilterChange('tanggal_awal_to', payload.tanggal_awal_to);
    setIsModalOpen(false);
  };

  // Reset date filters
  const handleResetDateFilters = () => {
    handleFilterChange('tanggal_awal_from', '');
    handleFilterChange('tanggal_awal_to', '');
    
    // Reset date pickers to current date
    setStartState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
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
                  <h4 className="text-lg font-semibold mb-2 px-5">Tanggal Pengembalian</h4>
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
        <h2 className="intro-y text-lg font-medium mt-10">Data Pengembalian Asset</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            {/* <LinkButton classNameLink="btn btn-primary" classNameLoading="btn btn-primary" link="/inventaris/asset-assignment/create" title="Tambah Peminjaman Asset"/> */}
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
                  <th className="whitespace-nowrap">Asset</th>
                  <th className="whitespace-nowrap">Tanggal Peminjaman</th>
                  <th className="whitespace-nowrap">Tanggal Pengembalian</th>
                  <th className="whitespace-nowrap">Kondisi Pengembalian</th>
                  <th className="whitespace-nowrap">Keterangan</th>
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
                        <td>
                            <div className="font-medium whitespace-nowrap">{item.assets.nama_asset}</div>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.assets.code_asset}</div>
                        </td>
                        <td className="whitespace-nowrap">{item.tanggal_peminjaman}</td>
                        <td className="whitespace-nowrap">{item.tanggal_pengembalian}</td>
                        <td className="whitespace-nowrap">{item.kondisi_saat_pengembalian}</td>
                        <td className="whitespace-nowrap">{item.notes ? item.notes : "-"}</td>
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

export default AssetAssignment;