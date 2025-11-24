import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getAssetById, updateAsset } from "../services/asset";
import { getKategoriAsset } from "../utils/kategoriAsset";

export const useAssetFormEdit = (id) => {
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
    status: "",
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

  // Ambil data kontak darurat berdasarkan ID
  useEffect(() => {
    const fetchAssetById = async () => {
      try {
        setLoading(true);
        const response = await getAssetById(id);
        setFormData({
          id_kategori: response.data.id_kategori,
          nama_asset: response.data.nama_asset,
          brand: response.data.brand,
          model: response.data.model,
          serial_number: response.data.serial_number,
          tanggal_pembelian: response.data.tanggal_pembelian,
          harga_pembelian: response.data.harga_pembelian,
          kondisi: response.data.kondisi,
          lokasi: response.data.lokasi,
          status: response.data.status,
          notes: response.data.notes ? response.data.notes : "",
          processor: response.data.asset_spesifikasi.processor ? response.data.asset_spesifikasi.processor : "",
          ram: response.data.asset_spesifikasi.ram ? response.data.asset_spesifikasi.ram : "",
          storage: response.data.asset_spesifikasi.storage ? response.data.asset_spesifikasi.storage : "",
          vga: response.data.asset_spesifikasi.vga ? response.data.asset_spesifikasi.vga : "",
          os: response.data.asset_spesifikasi.os ? response.data.asset_spesifikasi.os : "",
          ukuran_monitor: response.data.asset_spesifikasi.ukuran_monitor ? response.data.asset_spesifikasi.ukuran_monitor : "",
          resolusi: response.data.asset_spesifikasi.resolusi ? response.data.asset_spesifikasi.resolusi : "",
          ukuran_barang: response.data.asset_spesifikasi.ukuran_barang ? response.data.asset_spesifikasi.ukuran_barang : "",
        });
      } catch (error) {
        console.error("Error fetching asset by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetById();
  }, [id]);

  // Ambil data pegawai untuk dropdown
  useEffect(() => {
    const fetchKategoriAsset = async () => {
      try {
        const kategoriData = await getKategoriAsset();
        const formattedOptions = createOptions(kategoriData);
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching kategori:", error);
      }
    };
    fetchKategoriAsset();
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

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("id_kategori", formData.id_kategori);
    newFormData.append("nama_asset", formData.nama_asset);
    newFormData.append("brand", formData.brand);
    newFormData.append("model", formData.model);
    newFormData.append("serial_number", formData.serial_number);
    newFormData.append("tanggal_pembelian", formData.tanggal_pembelian);
    newFormData.append("harga_pembelian", formData.harga_pembelian);
    newFormData.append("kondisi", formData.kondisi);
    newFormData.append("lokasi", formData.lokasi);
    newFormData.append("status", formData.status);
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
      const response = await updateAsset(id, newFormData);
      console.log("Sukses:", response);
      if (response && response.asset) {
        console.log("Data berhasil diubah");
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/inventaris/asset");
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
    options,
    formData,
    handleChange,
    handleKategoriChange,
    handleSubmit,
  };
};