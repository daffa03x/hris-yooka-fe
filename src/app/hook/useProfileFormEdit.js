import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getPegawaiProfile, updatePegawaiProfile } from "../services/pegawaiProfile";
import { logout } from "../services/auth";

export const useProfileFormEdit = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_hp: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    avatar: "",
  });
  const requiredFields = ["nama_lengkap", "email", "no_hp", "nik", "tempat_lahir", "tanggal_lahir", "alamat"];

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
      avatar: file,
    }));
  };

  // Ambil data kontak darurat berdasarkan ID
  useEffect(() => {
    const fetchProfilePegawai = async () => {
      try {
        setLoading(true);
        const response = await getPegawaiProfile(id);
        setFormData({
          id_pegawai: response.data.id_pegawai,
          nama_lengkap: response.data.users.name,
          email: response.data.users.email,
          no_hp: response.data.no_hp,
          nik: response.data.nik,
          tempat_lahir: response.data.tempat_lahir,
          tanggal_lahir: response.data.tanggal_lahir,
          alamat: response.data.alamat,
          avatar: response.data.avatar,
        });
      } catch (error) {
        console.error("Error fetching profile pegawai:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePegawai();
  }, [id]);

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("nama_lengkap", formData.nama_lengkap);
    newFormData.append("email", formData.email);
    newFormData.append("no_hp", formData.no_hp);
    newFormData.append("nik", formData.nik);
    newFormData.append("tempat_lahir", formData.tempat_lahir);
    newFormData.append("tanggal_lahir", formData.tanggal_lahir);
    newFormData.append("alamat", formData.alamat);
    if (formData.avatar) {
      newFormData.append("avatar", formData.avatar);
    }

    try {
      setSubmitButton(true);
      const response = await updatePegawaiProfile(id, newFormData); // Gunakan fungsi update
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil diupdate");
        localStorage.setItem("successMessage", "Data berhasil diupdate");
        await logout();
        router.push("/");
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
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};
