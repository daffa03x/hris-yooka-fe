"use client";
import EditButton from "@/app/components/common/EditButton";
import LinkButton from "@/app/components/common/LinkButton";
import { useGetData } from "@/app/hook/useGetData";
import Dashboard from "@/app/layouts/AdminDashboard";
import { deletePegawai, getPegawai } from "@/app/services/pegawaiGeneral";
import Image from "next/image";
import { FaCircleNotch, FaMagnifyingGlass, FaRegTrashCan, FaX } from "react-icons/fa6";

const General = () => {
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
    handleDelete 
  } = useGetData(getPegawai, deletePegawai);

  return (
    <Dashboard>
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data General Pegawai</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <LinkButton classNameLink="btn btn-primary" classNameLoading="btn btn-primary" link="/admin/kelola-pegawai/general/create" title="Tambah Pegawai"/>
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
                  <th className="whitespace-nowrap">Avatar</th>
                  <th className="whitespace-nowrap">Pegawai</th>
                  <th className="whitespace-nowrap">ID Card</th>
                  <th className="whitespace-nowrap">NIK</th>
                  <th className="whitespace-nowrap">NIP</th>
                  <th className="whitespace-nowrap">Kontak</th>
                  <th className="whitespace-nowrap">Alamat</th>
                  <th className="whitespace-nowrap">TTL</th>
                  <th className="whitespace-nowrap">Gender</th>
                  <th className="whitespace-nowrap">Jabatan</th>
                  <th className="whitespace-nowrap">Lembaga</th>
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
                      <td className="w-40">{index + 1}</td>
                      <td className="w-40">
                        <Image
                          src={item?.avatar || "/avatar-head.jpg"}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.users?.name}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.status}</div>
                      </td>
                      <td>{item.id_card}</td>
                      <td>{item.nik}</td>
                      <td>{item.nip}</td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.users?.email}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.no_hp}</div>
                      </td>
                      <td className="whitespace-nowrap">{item.alamat}</td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.tempat_lahir}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.tanggal_lahir}</div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</div>
                      </td>
                      <td className="whitespace-nowrap">{item.users.role}</td>
                      <td className="whitespace-nowrap">{item.lembaga}</td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          <EditButton link={`/admin/kelola-pegawai/general/edit/${item.id}`} />
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

export default General;
