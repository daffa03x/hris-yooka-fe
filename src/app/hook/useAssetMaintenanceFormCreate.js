import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getAsset } from "../utils/asset";
import { storeAssetMaintenance } from "../services/assetMaintenance";

export const useAssetMaintenanceFormCreate = () => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_asset: "",
    tanggal_perbaikan: "",
    keterangan: "",
    harga: "",
    vendor: "",
  });
  const requiredFields = ["id_asset", "tanggal_perbaikan", "keterangan", "harga", "vendor"];

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    const fetchAsset = async () => {
      try {
        const asset = await getAsset();
        const formattedOptions = createOptions(asset);
        setOptions(formattedOptions); // tambahkan state baru untuk options
      } catch (error) {
        console.error("Gagal mengambil data asset:", error);
      }
      setLoading(false);
    };
    fetchAsset();
  }, []);

  const createOptions = (kategori) =>
    kategori.map((item) => ({
      value: item.id,
      label: item.nama_asset + " - " + item.code_asset,
    }));

  // Handle perubahan select kategori
  const handleAssetChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      id_asset: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("id_asset", formData.id_asset);
    newFormData.append("tanggal_perbaikan", formData.tanggal_perbaikan);
    newFormData.append("keterangan", formData.keterangan);
    newFormData.append("harga", formData.harga);
    newFormData.append("vendor", formData.vendor);

    try {
      setSubmitButton(true);
      const response = await storeAssetMaintenance(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/inventaris/asset-maintenance");
      } else {
        console.error("Gagal menyimpan data");
        setError("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Kesalahan saat menyimpan data:", error);
      setError("Terjadi kesalahan saat menyimpan data");
    } finally {
      setSubmitButton(false);
    }
  };
  return {
    error,
    submitButton,
    loading,
    options,
    formData,
    handleChange,
    handleAssetChange,
    handleSubmit,
  };
};
