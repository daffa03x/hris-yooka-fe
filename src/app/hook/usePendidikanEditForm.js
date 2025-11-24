import { getPegawai } from "@/app/utils/pegawai";
import { getPegawaiPendidikanById, updatePegawaiPendidikan } from "@/app/services/pegawaiPendidikan";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";

export const usePendidikanEditForm = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    id_pegawai: "",
    nama_instansi: "",
    jurusan: "",
    jenjang: "",
    ijazah: "",
  });
  const requiredFields = ["id_pegawai", "nama_instansi", "jurusan", "jenjang"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      ijazah: file,
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
    const fetchPegawaiPendidikan = async () => {
      try {
        setLoading(true);
        const response = await getPegawaiPendidikanById(id);
        setFormData({
          id_pegawai: response.data.id_pegawai,
          nama_instansi: response.data.nama_instansi,
          jurusan: response.data.jurusan,
          jenjang: response.data.jenjang,
        });
      } catch (error) {
        console.error("Error fetching pegawai pendidikan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPegawaiPendidikan();
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
    newFormData.append("nama_instansi", formData.nama_instansi);
    newFormData.append("jurusan", formData.jurusan);
    newFormData.append("jenjang", formData.jenjang);
    if (formData.ijazah) {
      newFormData.append("ijazah", formData.ijazah);
    }

    try {
      setSubmitButton(true);
      const response = await updatePegawaiPendidikan(id, newFormData); // Gunakan fungsi update
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil diupdate");
        localStorage.setItem("successMessage", "Data berhasil diupdate");
        router.push("/admin/kelola-pegawai/pendidikan");
      } else {
        console.error("Gagal mengupdate data");
        setError("Gagal mengupdate data");
      }
    } catch (error) {
      console.error("Kesalahan saat mengupdate data:", error);
      setError("Terjadi kesalahan saat mengupdate data");
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
    handleFileChange,
    handlePegawaiChange,
    handleSubmit,
  };
};
