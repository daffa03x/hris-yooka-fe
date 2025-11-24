"use client";
import EditButton from "@/app/components/common/EditButton";
import LinkButton from "@/app/components/common/LinkButton";
import { useGetData } from "@/app/hook/useGetData";
import Dashboard from "@/app/layouts/AdminDashboard";
import { deleteAllNationalDay, deleteNationalDay, generateNationalDay, getNationalDay } from "@/app/services/pegawaiNationalDay";
import { FaCircleNotch, FaMagnifyingGlass, FaRegTrashCan, FaX } from "react-icons/fa6";
import { toast, Bounce } from "react-toastify";

const HariNasional = () => {
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const { 
        data, 
        refetchData,
        searchQuery, 
        setSearchQuery, 
        pagination, 
        loading, 
        handleSearch, 
        handleResetSearch,
        handlePageChange, 
        handlePerPageChange, 
        handleDelete 
    } = useGetData(getNationalDay, deleteNationalDay);

    const actionGenerate = async () => {
      const confirmGenerate = window.confirm("Apakah Anda yakin ingin generate data?");
      if (confirmGenerate) {
        const response = await generateNationalDay();
        if (response) {
          toast.success("Berhasil Generate Data", {
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
          refetchData();
        }
      }
    }

    const handleDeleteAll = async () => {
      const confirmDeleteAll = window.confirm("Apakah Anda yakin ingin menghapus semua data?");
      if (confirmDeleteAll) {
        const response = await deleteAllNationalDay();
        if (response) {
          toast.success("Berhasil Hapus All", {
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
          refetchData();
        }
      }
    }

  return (
    <Dashboard>
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data Hari Nasional</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <LinkButton classNameLink="btn btn-primary mr-3" classNameLoading="btn btn-primary" link="/admin/kelola-pegawai/hari-nasional/create" title="Tambah Hari Nasional"/>
            <button onClick={() => actionGenerate()} className="flex items-center btn btn-success mr-3 text-white">
                Generate Hari
            </button>
            <button onClick={() => handleDeleteAll()} className="flex items-center btn btn-danger">
                Delete Semua
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
                  <th className="whitespace-nowrap">Hari Nasional</th>
                  <th className="whitespace-nowrap">Tanggal</th>
                  <th className="text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
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
                    <tr className="intro-x" key={index}>
                      <td className="w-20">{index + 1}</td>
                      <td className="whitespace-nowrap">{item.name}</td>
                      <td className="whitespace-nowrap">
                        {item.date
                            ? new Date(item.date).toLocaleDateString('id-ID', dateOptions)
                        : ''}
                      </td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          <EditButton link={`/admin/kelola-pegawai/hari-nasional/edit/${item.id}`} />
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

export default HariNasional;
