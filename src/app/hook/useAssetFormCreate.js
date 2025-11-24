import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { storeAsset } from "../services/asset";
import { getKategoriAsset } from "../utils/kategoriAsset";

export const useAssetFormCreate = () => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_kategori: "",
    nama_asset: "",
    brand: "",
    model: "",
    serial_number: "",
    tanggal_pembelian: "",
    harga_pembelian: "",
    kondisi: "",
    lokasi: "",
    notes: "",             // opsional (bisa kosong atau tidak diisi sama sekali)
    processor: "",         // opsional
    ram: "",               // opsional
    storage: "",           // opsional
    vga: "",               // opsional
    os: "",                // opsional
    ukuran_monitor: "",    // opsional
    resolusi: "",          // opsional
    ukuran_barang: "",     // opsional
  });
  const requiredFields = ["id_kategori", "nama_asset", "brand", "model", "serial_number", "tanggal_pembelian", "harga_pembelian", "kondisi", "lokasi"];

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    const fetchKategori = async () => {
      try {
        const assetKategori = await getKategoriAsset();
        const formattedOptions = createOptions(assetKategori);
        setOptions(formattedOptions); // tambahkan state baru untuk options
      } catch (error) {
        console.error("Gagal mengambil data kategori:", error);
      }
      setLoading(false);
    };
    fetchKategori();
  }, []);

  const createOptions = (kategori) =>
    kategori.map((item) => ({
      value: item.id,
      label: item.nama_kategori,
    }));

  // Handle perubahan select kategori
  const handleKategoriChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      id_kategori: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("id_kategori", formData.id_kategori);
    newFormData.append("nama_asset", formData.nama_asset);
    newFormData.append("brand", formData.brand);
    newFormData.append("model", formData.model);
    newFormData.append("serial_number", formData.serial_number);
    newFormData.append("tanggal_pembelian", formData.tanggal_pembelian);
    newFormData.append("harga_pembelian", formData.harga_pembelian);
    newFormData.append("kondisi", formData.kondisi);
    newFormData.append("lokasi", formData.lokasi);
    if (formData.notes !== "") {
      newFormData.append("notes", formData.notes);
    }
    if (formData.processor !== "") {
      newFormData.append("processor", formData.processor);
    }
    if (formData.ram !== "") {
      newFormData.append("ram", formData.ram);
    }
    if (formData.storage !== "") {
      newFormData.append("storage", formData.storage);
    }
    if (formData.vga !== "") {
      newFormData.append("vga", formData.vga);
    }
    if (formData.os !== "") {
      newFormData.append("os", formData.os);
    }
    if (formData.ukuran_monitor !== "") {
      newFormData.append("ukuran_monitor", formData.ukuran_monitor);
    }
    if (formData.resolusi !== "") {
      newFormData.append("resolusi", formData.resolusi);
    }
    if (formData.ukuran_barang !== "") {
      newFormData.append("ukuran_barang", formData.ukuran_barang);
    }

    try {
      setSubmitButton(true);
      const response = await storeAsset(newFormData);
      console.log("Sukses:", response);
      if (response && response.asset) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/inventaris/asset");
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
    handleKategoriChange,
    handleSubmit,
  };
};
