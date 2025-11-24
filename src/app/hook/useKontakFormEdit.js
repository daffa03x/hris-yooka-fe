import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPegawaiKontakById, updatePegawaiKontak } from "@/app/services/pegawaiKontak";
import { getPegawai } from "@/app/utils/pegawai";
import { validationRequired } from "../utils/validations/validationRequired";

export const useKontakFormEdit = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    id_pegawai: "",
    pilihan_kontak_pertama: "",
    kontak_pertama_lainnya: "",
    nama_kontak_pertama: "",
    no_hp_kontak_pertama: "",
    pilihan_kontak_kedua: "",
    kontak_kedua_lainnya: "",
    nama_kontak_kedua: "",
    no_hp_kontak_kedua: "",
  });
  const requiredFields = ["id_pegawai", "pilihan_kontak_pertama", "nama_kontak_pertama", "no_hp_kontak_pertama", "pilihan_kontak_kedua", "nama_kontak_kedua", "no_hp_kontak_kedua"];

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedValue = value;

      // Jika pilihan kontak pertama atau kedua adalah "Lainnya", reset nilai lainnya
      if (name === "pilihan_kontak_pertama" && value !== "Lainnya") {
        return {
          ...prev,
          [name]: updatedValue,
          kontak_pertama_lainnya: "", // Reset nilai lainnya
        };
      }

      if (name === "pilihan_kontak_kedua" && value !== "Lainnya") {
        return {
          ...prev,
          [name]: updatedValue,
          kontak_kedua_lainnya: "", // Reset nilai lainnya
        };
      }

      // Jika pilihan kontak pertama atau kedua adalah "Lainnya", simpan nilai lainnya
      if (name === "kontak_pertama_lainnya" || name === "kontak_kedua_lainnya") {
        return {
          ...prev,
          [name]: value,
        };
      }

      // Untuk kasus lainnya, simpan nilai seperti biasa
      return {
        ...prev,
        [name]: updatedValue,
      };
    });
  };

  // Handle perubahan select pegawai
  const handlePegawaiChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      id_pegawai: selectedOption ? selectedOption.value : "",
    }));
  };

  // Format options untuk select pegawai
  const createOptions = (pegawai) =>
    pegawai.map((item) => ({
      value: item.id,
      label: item.users.name + " - " + item.nip,
    }));

  // Ambil data kontak darurat berdasarkan ID
  useEffect(() => {
    const fetchPegawaiKontak = async () => {
      try {
        setIsLoading(true);
        const response = await getPegawaiKontakById(id);
        setFormData({
          id_pegawai: response.data.id_pegawai,
          pilihan_kontak_pertama: response.data.pilihan_kontak_pertama,
          kontak_pertama_lainnya: !["Ayah", "Ibu", "Suami", "Istri"].includes(response.data.pilihan_kontak_pertama) ? response.data.pilihan_kontak_pertama : "",
          nama_kontak_pertama: response.data.nama_kontak_pertama,
          no_hp_kontak_pertama: response.data.no_hp_kontak_pertama,
          pilihan_kontak_kedua: response.data.pilihan_kontak_kedua,
          kontak_kedua_lainnya: !["Ayah", "Ibu", "Suami", "Istri"].includes(response.data.pilihan_kontak_kedua) ? response.data.pilihan_kontak_kedua : "",
          nama_kontak_kedua: response.data.nama_kontak_kedua,
          no_hp_kontak_kedua: response.data.no_hp_kontak_kedua,
        });
      } catch (error) {
        console.error("Error fetching pegawai kontak:", error);
        setError("Gagal mengambil data kontak");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPegawaiKontak();
  }, [id]);

  // Ambil data pegawai untuk dropdown
  useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const pegawaiData = await getPegawai();
        const formattedOptions = createOptions(pegawaiData);
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching pegawai:", error);
        setError("Gagal mengambil data pegawai");
      }
    };

    fetchPegawai();
  }, []);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("pilihan_kontak_pertama", !["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_pertama) ? formData.kontak_pertama_lainnya : formData.pilihan_kontak_pertama);
    newFormData.append("no_hp_kontak_pertama", formData.no_hp_kontak_pertama);
    newFormData.append("nama_kontak_pertama", formData.nama_kontak_pertama);
    newFormData.append("pilihan_kontak_kedua", !["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_kedua) ? formData.kontak_kedua_lainnya : formData.pilihan_kontak_kedua);
    newFormData.append("nama_kontak_kedua", formData.nama_kontak_kedua);
    newFormData.append("no_hp_kontak_kedua", formData.no_hp_kontak_kedua);

    try {
      setSubmitButton(true);
      const response = await updatePegawaiKontak(id, newFormData);
      if (response && response.data) {
        localStorage.setItem("successMessage", "Data berhasil diupdate");
        router.push("/admin/kelola-pegawai/kontak");
      } else {
        setError("Gagal mengupdate data");
      }
    } catch (error) {
      console.error("Kesalahan saat mengupdate data:", error);
      setError("Terjadi kesalahan saat mengupdate data");
    } finally {
      setSubmitButton(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id_pegawai: "",
      pilihan_kontak_pertama: "",
      kontak_pertama_lainnya: "",
      nama_kontak_pertama: "",
      no_hp_kontak_pertama: "",
      pilihan_kontak_kedua: "",
      kontak_kedua_lainnya: "",
      nama_kontak_kedua: "",
      no_hp_kontak_kedua: "",
    });
    setError("");
  };

  return {
    formData,
    error,
    isLoading,
    submitButton,
    options,
    handleChange,
    handlePegawaiChange,
    handleSubmit,
    resetForm,
  };
};
