import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPegawai } from "../utils/pegawai";
import { storePegawaiKontak } from "../services/pegawaiKontak";
import { validationRequired } from "../utils/validations/validationRequired";

export const useKontakFormCreate = () => {
  const router = useRouter();
  const requiredFields = ["id_pegawai", "pilihan_kontak_pertama", "nama_kontak_pertama", "no_hp_kontak_pertama", "pilihan_kontak_kedua", "nama_kontak_kedua", "no_hp_kontak_kedua"];
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    id_pegawai: "",
    pilihan_kontak_pertama: "Ayah",
    kontak_pertama_lainnya: "",
    nama_kontak_pertama: "",
    no_hp_kontak_pertama: "",
    pilihan_kontak_kedua: "Ayah",
    kontak_kedua_lainnya: "",
    nama_kontak_kedua: "",
    no_hp_kontak_kedua: "",
  });

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

  useEffect(() => {
    setIsLoading(true);
    const fetchPegawai = async () => {
      try {
        const pegawaiData = await getPegawai();
        const formattedOptions = createOptions(pegawaiData);
        setOptions(formattedOptions); // tambahkan state baru untuk options
      } catch (error) {
        console.error("Gagal mengambil data pegawai:", error);
      }
      setIsLoading(false);
    };
    fetchPegawai();
  }, []);

  const createOptions = (pegawai) =>
    pegawai.map((item) => ({
      value: item.id,
      label: item.users.name + " - " + item.nip,
    }));

  // Handle perubahan select pegawai
  const handlePegawaiChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      id_pegawai: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("pilihan_kontak_pertama", formData.pilihan_kontak_pertama === "Lainnya" ? formData.kontak_pertama_lainnya : formData.pilihan_kontak_pertama);
    newFormData.append("no_hp_kontak_pertama", formData.no_hp_kontak_pertama);
    newFormData.append("nama_kontak_pertama", formData.nama_kontak_pertama);
    newFormData.append("pilihan_kontak_kedua", formData.pilihan_kontak_kedua === "Lainnya" ? formData.kontak_kedua_lainnya : formData.pilihan_kontak_kedua);
    newFormData.append("nama_kontak_kedua", formData.nama_kontak_kedua);
    newFormData.append("no_hp_kontak_kedua", formData.no_hp_kontak_kedua);

    try {
      setSubmitButton(true);
      const response = await storePegawaiKontak(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/kontak");
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
    formData,
    error,
    submitButton,
    isLoading,
    options,
    handleChange,
    handleSubmit,
    handlePegawaiChange,
  };
};
