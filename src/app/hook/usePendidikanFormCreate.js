import { useRouter } from "next/navigation";
import { storePegawaiPendidikan } from "@/app/services/pegawaiPendidikan";
import { getPegawai } from "@/app/utils/pegawai";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";

export const usePendidikanFormCreate = () => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
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
    newFormData.append("nama_instansi", formData.nama_instansi);
    newFormData.append("jurusan", formData.jurusan);
    newFormData.append("jenjang", formData.jenjang);
    if (formData.ijazah) {
      newFormData.append("ijazah", formData.ijazah);
    }

    try {
      setSubmitButton(true);
      const response = await storePegawaiPendidikan(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/pendidikan");
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
    handleFileChange,
    handlePegawaiChange,
    handleSubmit,
  };
};
