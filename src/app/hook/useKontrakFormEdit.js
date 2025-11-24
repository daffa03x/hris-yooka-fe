import { getPegawaiKontrakById, updatePegawaiKontrak } from "@/app/services/pegawaiKontrak";
import { getPegawai } from "@/app/utils/pegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";

export const useKontrakFormEdit = (id) => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Handle perubahan select pegawai
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
        const response = await getPegawaiKontrakById(id);
        setFormData({
          id_pegawai: response.data.id_pegawai,
          tanggal_mulai: response.data.tanggal_mulai,
          tanggal_akhir: response.data.tanggal_akhir,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("tanggal_mulai", formData.tanggal_mulai);
    newFormData.append("tanggal_akhir", formData.tanggal_akhir);

    try {
      setSubmitButton(true);
      const response = await updatePegawaiKontrak(id, newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil diupdate");
        localStorage.setItem("successMessage", "Data berhasil diupdate");
        router.push("/admin/kelola-pegawai/kontrak");
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
  };
};
