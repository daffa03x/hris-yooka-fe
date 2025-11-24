"use client";
import Dashboard from "@/app/layouts/AdminDashboard";
import { FaCircleNotch, FaMagnifyingGlass, FaRegTrashCan, FaX } from "react-icons/fa6";
import { useGetData } from "@/app/hook/useGetData";
import LinkButton from "@/app/components/common/LinkButton";
import EditButton from "@/app/components/common/EditButton";
import { deleteAsset, getAsset } from "@/app/services/asset";

const Asset = () => {
  const { 
    data, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    handleFilterChange, 
    handleResetFilters, 
    pagination, 
    loading, 
    handleSearch, 
    handleResetSearch, 
    handlePageChange, 
    handlePerPageChange, 
    handleDelete 
  } = useGetData(
    getAsset,
    deleteAsset
  );

  return (
    <Dashboard>
      <div className="content">
        <h2 className="intro-y text-lg font-medium mt-10">Data Asset Kantor</h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <LinkButton classNameLink="btn btn-primary" classNameLoading="btn btn-primary" link="/admin/inventaris/asset/create" title="Tambah Asset"/>
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

          <div className="intro-y col-span-12 overflow-x-auto">
            <table className="table table-report w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">No</th>
                  <th className="whitespace-nowrap">Asset</th>
                  <th className="whitespace-nowrap">Kategori Asset</th>
                  <th className="whitespace-nowrap">Brand & Model</th>
                  <th className="whitespace-nowrap">Serial Number</th>
                  <th className="whitespace-nowrap">Tanggal Pembelian</th>
                  <th className="whitespace-nowrap">Harga Pembelian</th>
                  <th className="whitespace-nowrap">Kondisi</th>
                  <th className="whitespace-nowrap">Toko</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="whitespace-nowrap">Keterangan</th>
                  <th className="whitespace-nowrap">Spesifikasi</th>
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
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.nama_asset}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.code_asset}</div>
                      </td>
                      <td className="whitespace-nowrap">{item.kategori_assets.nama_kategori}</td>
                      <td>
                        <div className="font-medium whitespace-nowrap">{item.brand}</div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{item.model}</div>
                      </td>
                      <td className="whitespace-nowrap">{item.serial_number}</td>
                      <td className="whitespace-nowrap">{item.tanggal_pembelian}</td>
                      <td className="whitespace-nowrap">
                            {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            }).format(item.harga_pembelian)}
                      </td>
                      <td className="whitespace-nowrap">{item.kondisi}</td>
                      <td className="whitespace-nowrap">{item.lokasi}</td>
                      <td className="whitespace-nowrap">{item.status}</td>
                      <td className="whitespace-nowrap">
                        {item.notes ? item.notes : "-"}
                      </td>
                      <td className="whitespace-nowrap">
                        {item?.asset_spesifikasi != null ? (
                        <ul>
                          <li>
                            {item.asset_spesifikasi?.processor}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.ram != null ? item.asset_spesifikasi.ram + " GB" : ""}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.storage != null ? item.asset_spesifikasi.storage + " GB" : ""}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.vga}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.os}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.ukuran_monitor}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.resolusi}
                          </li>
                          <li>
                            {item.asset_spesifikasi?.ukuran_barang}
                          </li>
                        </ul>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          <EditButton link={`/admin/inventaris/asset/edit/${item.id}`} />
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

export default Asset;
