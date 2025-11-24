import { storePegawaiKontrak } from "@/app/services/pegawaiKontrak";
import { getPegawai } from "@/app/utils/pegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";

export const useKontrakFormCreate = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    id_pegawai: "",
    tanggal_mulai: "",
    tanggal_akhir: "",
  });
  const requiredFields = ["id_pegawai", "tanggal_mulai", "tanggal_akhir"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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

    const newFormData = new FormData();
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("tanggal_mulai", formData.tanggal_mulai);
    newFormData.append("tanggal_akhir", formData.tanggal_akhir);

    try {
      setSubmitButton(true);
      const response = await storePegawaiKontrak(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/kontrak");
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
    handlePegawaiChange,
    handleSubmit,
  };
};
