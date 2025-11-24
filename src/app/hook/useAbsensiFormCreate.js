import { validationRequired } from "../utils/validations/validationRequired";
import { storePegawaiAbsensi } from "@/app/services/pegawaiAbsensi";
import { getPegawai } from "@/app/utils/pegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAbsensiFormCreate = () => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const requiredFields = ["id_pegawai", "tanggal_absen", "jam_masuk"];

  // Fungsi untuk mendapatkan waktu Indonesia saat ini dalam format HH:mm
  const getCurrentIndonesianTime = () => {
    // Buat objek Date untuk waktu saat ini
    const now = new Date();

    // Dapatkan string waktu dalam format yang dibutuhkan
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Gabungkan jam dan menit dalam format HH:mm
    return `${hours}:${minutes}:${seconds}`;
  };
  const [formData, setFormData] = useState({
    id_pegawai: "",
    tanggal_absen: new Date().toISOString().split("T")[0],
    jam_masuk: getCurrentIndonesianTime(),
    jam_pulang: "",
  });

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    const fetchPegawai = async () => {
      try {
        const pegawaiData = await getPegawai();
        const formattedOptions = createOptions(pegawaiData);
        setOptions(formattedOptions); // tambahkan state baru untuk options
      } catch (error) {
        console.error("Gagal mengambil data pegawai:", error);
        setError(error);
      }
      setLoading(false);
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

    // Add seconds to time values if they don't have them
    const formatTime = (time) => {
      if (!time) return "";
      if (time.length === 5) return time + ":00";
      return time;
    };

    const newFormData = new FormData();
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("tanggal_absen", formData.tanggal_absen);
    newFormData.append("jam_masuk", formatTime(formData.jam_masuk));
    if (formData.jam_pulang) {
      newFormData.append("jam_pulang", formatTime(formData.jam_pulang));
    }

    try {
      setSubmitButton(true);
      const response = await storePegawaiAbsensi(newFormData);
      if (response && response.data) {
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/absensi");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Kesalahan saat menyimpan data:", error);
      setError(error.message);
    } finally {
      setSubmitButton(false);
    }
  };
  return {
    formData,
    options,
    loading,
    error,
    submitButton,
    handleChange,
    handleSubmit,
    handlePegawaiChange,
  };
};
