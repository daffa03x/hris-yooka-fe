"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useAssetMaintenanceFormEdit } from "@/app/hook/useAssetMaintenanceFormEdit";
import Dashboard from "@/app/layouts/AdminDashboard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditAsset = () => {
  const { id } = useParams();
  const { formData, error, loading, submitButton, handleChange, handleSubmit } = useAssetMaintenanceFormEdit(id);

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
    if (formData.harga) {
      // Format harga untuk tampilan
      setHargaTampil(formatCurrency(formData.harga));
    }
  }, [formData.harga]);

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
          handleChange("harga", { target: { value: rawValue } });
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
                <div className="font-medium text-center text-lg">Ubah Perbaikan Asset</div>
                <div className="text-slate-500 text-center mt-2">Info asset maintenance</div>
            </div>
            <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                    <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="tanggal_perbaikan" className="form-label">
                        Tanggal Perbaikan
                    </label>
                    <input type="date" id="tanggal_perbaikan" className="form-control" value={formData.tanggal_perbaikan} onChange={(e) => handleChange("tanggal_perbaikan", e)} step="1" required />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                        <label htmlFor="harga" className="form-label">
                            Harga
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
                            {/* Hidden input to store the actual numeric value for form submission */}
                            <input 
                                type="hidden" 
                                name="harga" 
                                value={formData.harga}
                            />
                        </div>
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="vendor" className="form-label">
                        Vendor
                    </label>
                    <input type="text" id="vendor" className="form-control" value={formData.vendor} onChange={(e) => handleChange("vendor", e)} step="1" required />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                    <label htmlFor="keterangan" className="form-label">
                        Keterangan
                    </label>
                    <textarea rows={4} cols={4} id="keterangan" className="form-control" value={formData.keterangan} onChange={(e) => handleChange("keterangan", e)} step="1" required></textarea>
                    </div>
                    <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                    <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/inventaris/asset-maintenance" title="Kembali" />
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
