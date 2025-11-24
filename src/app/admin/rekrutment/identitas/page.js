"use client";
import Loading from "@/app/components/common/Loading";
import { useGetData } from "@/app/hook/useGetData";
import Dashboard from "@/app/layouts/AdminDashboard";
import { deleteRecruitmentIdentitas, getRecruitmentIdentitas, updateStatusRecruitmentIdentitas } from "@/app/services/recruitmentIdentitas";
import Link from "next/link";
import { useState } from "react";
import { FaCircleNotch, FaMagnifyingGlass, FaRegTrashCan, FaX } from "react-icons/fa6";
import { toast, Bounce } from "react-toastify";

const Identitas = () => {
  const {
    data,
    setData, // Now correctly exposed from the hook
    searchQuery,
    setSearchQuery,
    pagination,
    loading,
    filters,
    handleFilterChange,
    handleResetFilters,
    handleSearch,
    handleResetSearch,
    handlePageChange,
    handlePerPageChange,
    handleDelete,
    refetchData,
  } = useGetData(getRecruitmentIdentitas, deleteRecruitmentIdentitas);

  const [loadingRow, setLoadingRow] = useState(null);

  const handleChangeStatus = async (e, itemId) => {
    const newStatus = e.target.value;
    setLoadingRow(itemId);

    try {
      await updateStatusRecruitmentIdentitas(itemId, newStatus);

      // Update data in state without refetching
      setData((prevData) => prevData.map((item) => (item.id === itemId ? { ...item, status_recruitment: newStatus } : item)));

      toast.success(`Data status berhasil diubah menjadi ${newStatus}`, {
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
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data Identitas Recruitment</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <div className="md:flex items-center mx-auto text-slate-500 space-x-2">
              <div className="flex space-x-2 items-center">
                {/* Input Tanggal Awal */}
                <div className="flex flex-col">
                  <label htmlFor="tanggal_awal" className="text-sm mb-2">
                    Tanggal Awal
                  </label>
                  <input id="tanggal_awal" type="date" className="w-32 form-control box mr-2" value={filters.tanggal_awal || ""} onChange={(e) => handleFilterChange("tanggal_awal", e.target.value)} />
                </div>

                {/* Input Tanggal Akhir */}
                <div className="flex flex-col">
                  <label htmlFor="tanggal_akhir" className="text-sm mb-2">
                    Tanggal Akhir
                  </label>
                  <input id="tanggal_akhir" type="date" className="w-32 form-control box" value={filters.tanggal_akhir || ""} onChange={(e) => handleFilterChange("tanggal_akhir", e.target.value)} />
                </div>
              </div>
              <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 flex items-center space-x-2">
                <button className="btn btn-secondary w-full sm:w-auto mt-6 ml-2" onClick={handleResetFilters} disabled={loading}>
                  Reset
                </button>
              </div>
            </div>
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
                {/* Tombol Reset */}
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
                  <th className="whitespace-nowrap">Nama</th>
                  <th className="whitespace-nowrap">Kontak</th>
                  <th className="whitespace-nowrap">Agama</th>
                  <th className="whitespace-nowrap">TTL</th>
                  <th className="whitespace-nowrap">Alamat KTP</th>
                  <th className="whitespace-nowrap">Alamat Domisili</th>
                  <th className="whitespace-nowrap">Hobby</th>
                  <th className="whitespace-nowrap">Posisi</th>
                  <th className="whitespace-nowrap">Alat</th>
                  <th className="whitespace-nowrap">Skill</th>
                  <th className="whitespace-nowrap">Status Recruitment</th>
                  <th className="whitespace-nowrap">Riwayat Karir</th>
                  <th className="whitespace-nowrap">Riwayat Pendidikan</th>
                  <th className="whitespace-nowrap">Pertanyaan Personal</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="16" className="text-center">
                      <Loading />
                    </td>
                  </tr>
                ) : pagination.total === 0 ? (
                  <tr>
                    <td colSpan="16" className="text-center">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr className="intro-x" key={index}>
                      <td className="w-40">{index + 1}</td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.nama_lengkap}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.nama_panggilan}</div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.email}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.no_hp}</div>
                      </td>
                      <td>{item.agama}</td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.tempat_lahir}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.tanggal_lahir}</div>
                      </td>
                      <td>{item.alamat_ktp}</td>
                      <td>{item.alamat_domisili}</td>
                      <td>{item.hobby}</td>
                      <td className="whitespace-nowrap">{item.lowongans.nama_lowongan}</td>
                      <td className="whitespace-nowrap">
                        {item.alat.map((alat) => (
                          <li key={alat.id}>{alat.nama_alat}</li>
                        ))}
                      </td>
                      <td className="whitespace-nowrap">
                        {item.skill.map((skill) => (
                          <li key={skill.id}>{skill.nama_skill}</li>
                        ))}
                      </td>
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
                            value={item.status_recruitment}
                            onChange={(e) => handleChangeStatus(e, item.id)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700 hover:border-blue-400 cursor-pointer shadow-sm w-full">
                            <option value="Submit">Submit</option>
                            <option value="Closed">Closed</option>
                            <option value="Pending">Pending</option>
                          </select>
                        )}
                      </td>
                      <td className="whitespace-nowrap">
                        <Link href={`/admin/rekrutment/identitas/riwayat-karir/${item.id}`} className="btn badge bg-primary text-white" target="_blank">
                          Riwayat Karir
                        </Link>
                      </td>
                      <td className="whitespace-nowrap">
                        <Link href={`/admin/rekrutment/identitas/riwayat-pendidikan/${item.id}`} className="btn badge bg-warning text-white" target="_blank">
                          Riwayat Pendidikan
                        </Link>
                      </td>
                      <td className="whitespace-nowrap">
                        <Link href={`/admin/rekrutment/identitas/pertanyaan-personal/${item.id}`} className="btn badge bg-success text-white" target="_blank">
                          Pertanyaan Personal
                        </Link>
                      </td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
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

export default Identitas;
