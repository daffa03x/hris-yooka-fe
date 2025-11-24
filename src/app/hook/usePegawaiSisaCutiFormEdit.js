import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSisaCutiById, updateSisaCuti } from "../services/pegawaiSisaCuti";

export const usePegawaiSisaCutiFormEdit = (id) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sisa_cuti: "",
    tahun: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);

  useEffect(() => {
    const getSisaCuti = async () => {
      try {
        setIsLoading(true);
        const sisaCuti = await getSisaCutiById(id);

        setFormData({
          sisa_cuti: sisaCuti.data.sisa_cuti || "",
          tahun: sisaCuti.data.tahun || "",
        });
        console.log("Data loaded successfully:", sisaCuti);
      } catch (error) {
        console.error("Error fetching national day:", error);
        setError("Gagal mengambil data national day");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getSisaCuti();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Debug: Cek nilai formData sebelum dikirim
    console.log("FormData sebelum dikirim:", formData);

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");

    const fieldMappings = {
      sisa_cuti: formData.sisa_cuti,
      tahun: formData.tahun,
    };

    // Append semua field ke FormData
    Object.entries(fieldMappings).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
      }
    });

    try {
      setSubmitButton(true);
      const response = await updateSisaCuti(id, newFormData);
      if (response && response.data) {
        console.log("Data berhasil diubah");
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/kelola-pegawai/sisa-cuti");
      }
    } catch (error) {
      console.error("Error detail:", error.response?.data);
      // Tampilkan pesan error yang lebih spesifik
      if (error.response?.data) {
        const errorMessages = Object.values(error.response.data).flat().join(", ");
        setError(errorMessages);
      } else {
        setError("Terjadi kesalahan saat menyimpan data");
      }
    } finally {
      setSubmitButton(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    submitButton,
    handleChange,
    handleSubmit,
  };
};
