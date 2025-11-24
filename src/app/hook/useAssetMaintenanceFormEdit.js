import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getAssetMaintenanceById, updateAssetMaintenance } from "../services/assetMaintenance";

export const useAssetMaintenanceFormEdit = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tanggal_perbaikan: "",
    keterangan: "",
    harga: "",
    vendor: "",
  });
  const requiredFields = ["tanggal_perbaikan", "keterangan", "harga", "vendor"];

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ambil data kontak darurat berdasarkan ID
  useEffect(() => {
    const fetchAssetMaintenanceById = async () => {
      try {
        setLoading(true);
        const response = await getAssetMaintenanceById(id);
        setFormData({
          tanggal_perbaikan: response.data.tanggal_perbaikan,
          keterangan: response.data.keterangan,
          harga: response.data.harga,
          vendor: response.data.vendor,
        });
      } catch (error) {
        console.error("Error fetching asset maintenance by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetMaintenanceById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("tanggal_perbaikan", formData.tanggal_perbaikan);
    newFormData.append("keterangan", formData.keterangan);
    newFormData.append("harga", formData.harga);
    newFormData.append("vendor", formData.vendor);

    try {
      setSubmitButton(true);
      const response = await updateAssetMaintenance(id, newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil diubah");
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/inventaris/asset-maintenance");
      } else {
        console.error("Gagal ubah data");
        setError("Gagal ubah data");
      }
    } catch (error) {
      console.error("Kesalahan saat ubah data:", error);
      setError("Terjadi kesalahan saat ubah data");
    } finally {
      setSubmitButton(false);
    }
  };
  return {
    error,
    submitButton,
    loading,
    formData,
    handleChange,
    handleSubmit,
  };
};