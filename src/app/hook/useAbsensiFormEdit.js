import { getPegawai } from "@/app/utils/pegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getPegawaiAbsensiById, updatePegawaiAbsensi } from "../services/pegawaiAbsensi";

export const useAbsensiFormEdit = (id) => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_pegawai: "",
    tanggal_absen: "",
    jam_masuk: "",
    jam_pulang: "",
  });
  const requiredFields = ["id_pegawai", "tanggal_absen", "jam_masuk"];

  const handleChange = (name, e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? null : value,
    }));
  };

  const handleNullJamPulang = () => {
    setFormData((prevData) => ({
      ...prevData,
      jam_pulang: null,
    }));
  };

  // Handle perubahan pada Select
  const handlePegawaiChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      id_pegawai: selectedOption ? selectedOption.value : "",
    }));
  };

  // Ambil data kontak darurat berdasarkan ID
  useEffect(() => {
    const fetchPegawaiKontrak = async () => {
      try {
        setLoading(true);
        const response = await getPegawaiAbsensiById(id);
        setFormData({
          id_pegawai: response.data.id_pegawai,
          tanggal_absen: response.data.tanggal_absen,
          jam_masuk: response.data.jam_masuk,
          jam_pulang: response.data.jam_pulang ? response.data.jam_pulang : "",
        });
      } catch (error) {
        console.error("Error fetching pegawai kontrak:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPegawaiKontrak();
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
      }
    };

    fetchPegawai();
  }, []);

  const createOptions = (pegawai) =>
    pegawai.map((item) => ({
      value: item.id,
      label: item.users.name + " - " + item.nip,
    }));

  // Add seconds to time values if they don't have them
  const formatTime = (time) => {
    if (!time) return "";
    if (time.length === 5) return time + ":00";
    return time;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("tanggal_absen", formData.tanggal_absen);
    newFormData.append("jam_masuk", formatTime(formData.jam_masuk));
    if (formData.jam_pulang === null || formData.jam_pulang === "") {
      newFormData.append("jam_pulang", ""); // Append an empty string
    }else{
      newFormData.append("jam_pulang", formatTime(formData.jam_pulang));
    }

    try {
      setSubmitButton(true);
      const response = await updatePegawaiAbsensi(id, newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil diupdate");
        localStorage.setItem("successMessage", "Data berhasil diupdate");
        router.push("/admin/kelola-pegawai/absensi");
      } else {
        console.error("Gagal update data");
        setError("Gagal update data");
      }
    } catch (error) {
      console.error("Kesalahan saat update data:", error);
      setError("Terjadi kesalahan saat update data");
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
    handlePegawaiChange,
    handleSubmit,
    handleNullJamPulang
  };
};
