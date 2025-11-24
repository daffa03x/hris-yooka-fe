"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SelectReact from "@/app/components/common/Select";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useAssetFormEdit } from "@/app/hook/useAssetFormEdit";
import Dashboard from "@/app/layouts/AdminDashboard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditAsset = () => {
  const { id } = useParams();
  const { formData, error, loading, submitButton, options, handleChange, handleSubmit, handleKategoriChange } = useAssetFormEdit(id);

  // Format the number with thousands separator
  const formatCurrency = (value) => {
      if (!value && value !== 0) return "";
      
      // Remove any existing periods first, then format
      const numStr = String(value).replace(/\./g, "");
      
      // Format with thousand separators (periods)
      return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [hargaTampil, setHargaTampil] = useState("");

  // Inisialisasi nilai hargaTampil saat formData berubah (data selesai dimuat)
  useEffect(() => {
    if (formData.harga_pembelian) {
      // Format harga untuk tampilan
      setHargaTampil(formatCurrency(formData.harga_pembelian));
    }
  }, [formData.harga_pembelian]);

  // Handle input changes for currency format
  const handleCurrencyChange = (e) => {
      // Get value from input and strip any periods
      const rawValue = e.target.value.replace(/\./g, "");
      
      // Only allow digits
      if (/^\d*$/.test(rawValue)) {
          // Format untuk tampilan
          const formattedValue = formatCurrency(rawValue);
          setHargaTampil(formattedValue);
          
          // Update formData dengan nilai numerik murni (tanpa titik)
          handleChange("harga_pembelian", { target: { value: rawValue } });
      }
  };

  if (loading) {
      return (
      <Dashboard>
          <Loading />
      </Dashboard>
      );
  }

  return (
    <Dashboard>
      <div className="content">
        <div className="intro-y box py-5 sm:py-10 mt-5">
          <div className="px-5 my-10">
            <div className="font-medium text-center text-lg">Edit Asset</div>
            <div className="text-slate-500 text-center mt-2">Info asset</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nama_asset" className="form-label">
                    Asset
                  </label>
                  <input id="nama_asset" type="text" className="form-control" name="nama_asset" value={formData.nama_asset} onChange={(e) => handleChange("nama_asset", e)} required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_kategori" className="form-label">
                    Kategori
                  </label>
                  <SelectReact name="id_kategori" options={options} value={formData.id_kategori} onChange={handleKategoriChange} isEdit={true} defaultValue={null} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="brand" className="form-label">
                    Brand
                  </label>
                  <input type="text" id="brand" className="form-control" value={formData.brand} onChange={(e) => handleChange("brand", e)} step="1" required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="model" className="form-label">
                    Model
                  </label>
                  <input type="text" id="model" className="form-control" value={formData.model} onChange={(e) => handleChange("model", e)} step="1" />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="serial_number" className="form-label">
                    Serial Number
                  </label>
                  <input type="text" id="serial_number" className="form-control" value={formData.serial_number} onChange={(e) => handleChange("serial_number", e)} step="1" required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="kondisi" className="form-label">
                    Kondisi
                  </label>
                  <input type="text" id="kondisi" className="form-control" value={formData.kondisi} onChange={(e) => handleChange("kondisi", e)} step="1" />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_pembelian" className="form-label">
                    Tanggal Pembelian
                  </label>
                  <input type="date" id="tanggal_pembelian" className="form-control" value={formData.tanggal_pembelian} onChange={(e) => handleChange("tanggal_pembelian", e)} step="1" required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="harga_tampil" className="form-label">
                      Harga Pembelian
                  </label>
                  <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">Rp</span>
                      </div>
                      <input
                      type="text"
                      id="harga_tampil"
                      name="harga_tampil" 
                      className="form-control bg-gray-100 w-full pl-10 rounded-md border-gray-300"
                      value={hargaTampil}
                      onChange={handleCurrencyChange}
                      inputMode="numeric"
                      pattern="[0-9.]+"
                      required
                      />
                      {/* Hidden input menggunakan nilai numericValue yang sudah tanpa titik */}
                      <input 
                      type="hidden" 
                      name="harga_pembelian" 
                      value={formData.harga_pembelian}
                      />
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="lokasi" className="form-label">
                    Lokasi
                  </label>
                  <textarea className="form-control" id="lokasi" name="lokasi" value={formData.lokasi} onChange={(e) => handleChange("lokasi", e)} step="1" rows={4} cols={4}></textarea>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="notes" className="form-label">
                    Notes (Opsional)
                  </label>
                  <textarea className="form-control" id="notes" name="notes" value={formData.notes} onChange={(e) => handleChange("notes", e)} step="1" rows={4} cols={4}></textarea>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <div className="flex flex-row gap-4 mt-2">
                        {["Tersedia", "Dipinjam", "Diperbaiki"].map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                            <input
                            type="radio"
                            name="status"
                            value={option}
                            checked={formData.status === option}
                            onChange={(e) => handleChange("status", e)}
                            className="form-check-input mr-2"
                            />
                            <span>{option}</span>
                        </label>
                        ))}
                    </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 sm:col-span-6"><h3 className="font-medium text-lg p-5">Form Opsional</h3></div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="processor" className="form-label">
                    Processor
                  </label>
                  <div className="relative flex w-full">
                    <input id="processor" type="text" className="form-control" name="processor" value={formData.processor} onChange={(e) => handleChange("processor", e)} />
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                <label htmlFor="vga" className="form-label">VGA</label>
                  <input
                    id="vga"
                    type="text"
                    min="0"
                    className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                    name="vga"
                    value={formData.vga}
                    onChange={(e) => handleChange("vga", e)}
                  />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="ram" className="form-label">RAM</label>
                  <div className="relative flex w-full">
                    <input
                      id="ram"
                      type="number"
                      min="0"
                      className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                      name="ram"
                      value={formData.ram}
                      onChange={(e) => handleChange("ram", e)}
                    />
                    <div className="inline-flex items-center px-3 text-white font-medium text-sm border border-l-0 border-gray-300 rounded-r-md" style={{ backgroundColor: "#666666" }}>
                      GB
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="storage" className="form-label">Storage</label>
                  <div className="relative flex w-full">
                    <input
                      id="storage"
                      type="number"
                      min="0"
                      className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                      name="storage"
                      value={formData.storage}
                      onChange={(e) => handleChange("storage", e)}
                    />
                    <div className="inline-flex items-center px-3 text-white font-medium text-sm border border-l-0 border-gray-300 rounded-r-md" style={{ backgroundColor: "#666666" }}>
                      GB
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                <label htmlFor="os" className="form-label">Operating System</label>
                  <input
                    id="os"
                    type="text"
                    min="0"
                    className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                    name="os"
                    value={formData.os}
                    onChange={(e) => handleChange("os", e)}
                  />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                <label htmlFor="ukuran_barang" className="form-label">Ukuran Barang</label>
                  <input
                    id="ukuran_barang"
                    type="text"
                    min="0"
                    className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                    name="ukuran_barang"
                    value={formData.ukuran_barang}
                    onChange={(e) => handleChange("ukuran_barang", e)}
                  />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="ukuran_monitor" className="form-label">Ukuran Monitor</label>
                  <div className="relative flex w-full">
                    <input
                      id="ukuran_monitor"
                      type="number"
                      min="0"
                      className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                      name="ukuran_monitor"
                      value={formData.ukuran_monitor}
                      onChange={(e) => handleChange("ukuran_monitor", e)}
                    />
                    <div className="inline-flex items-center px-3 text-white font-medium text-sm border border-l-0 border-gray-300 rounded-r-md" style={{ backgroundColor: "#666666" }}>
                      Inch
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="resolusi" className="form-label">Resolusi</label>
                  <div className="relative flex w-full">
                    <input
                      id="resolusi"
                      type="number"
                      min="0"
                      className="form-control w-full rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300"
                      name="resolusi"
                      value={formData.resolusi}
                      onChange={(e) => handleChange("resolusi", e)}
                    />
                    <div className="inline-flex items-center px-3 text-white font-medium text-sm border border-l-0 border-gray-300 rounded-r-md" style={{ backgroundColor: "#666666" }}>
                      Px
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                  <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/inventaris/asset" title="Kembali" />
                  <SubmitButton isSubmitting={submitButton} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default EditAsset;
