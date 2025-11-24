import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNationalDayById, updateNationalDay } from "../services/pegawaiNationalDay";

export const usePegawaiNationalFormEdit = (id) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);

  useEffect(() => {
    const getNationalDay = async () => {
      try {
        setIsLoading(true);
        const nationalData = await getNationalDayById(id);

        // Format the date to YYYY-MM-DD for the date input
        const formattedDate = nationalData.data.date ? new Date(nationalData.data.date).toISOString().split("T")[0] : "";

        setFormData({
          name: nationalData.data.name || "",
          date: formattedDate,
        });
        console.log("Data loaded successfully:", nationalData);
      } catch (error) {
        console.error("Error fetching national day:", error);
        setError("Gagal mengambil data national day");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getNationalDay();
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
      name: formData.name,
      date: formData.date,
    };

    // Append semua field ke FormData
    Object.entries(fieldMappings).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
      }
    });

    try {
      setSubmitButton(true);
      const response = await updateNationalDay(id, newFormData);
      if (response && response.data) {
        console.log("Data berhasil diubah");
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/kelola-pegawai/hari-nasional");
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
