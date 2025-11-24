import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getPegawaiById, updatePegawai } from "@/app/services/pegawaiGeneral";

export const useGeneralFormEdit = (id) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_card: "",
    nama_lengkap: "",
    email: "",
    password: "",
    no_hp: "",
    nik: "",
    nip: "",
    role: "",
    alamat: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    status: "",
    lembaga: "",
    avatar: null,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const getPegawai = async () => {
      try {
        setIsLoading(true);
        const pegawaiData = await getPegawaiById(id);

        // Format the date to YYYY-MM-DD for the date input
        const formattedDate = pegawaiData.data.tanggal_lahir ? new Date(pegawaiData.data.tanggal_lahir).toISOString().split("T")[0] : "";

        setFormData({
          id_card: pegawaiData.data.id_card || "",
          nama_lengkap: pegawaiData.data.users.name || "",
          email: pegawaiData.data.users.email || "",
          password: "", // Don't populate password for security
          no_hp: pegawaiData.data.no_hp || "",
          nik: pegawaiData.data.nik || "",
          nip: pegawaiData.data.nip || "",
          role: pegawaiData.data.users.role || "",
          alamat: pegawaiData.data.alamat || "",
          jenis_kelamin: pegawaiData.data.jenis_kelamin || "",
          tempat_lahir: pegawaiData.data.tempat_lahir || "",
          tanggal_lahir: formattedDate,
          status: pegawaiData.data.status || "",
          lembaga: pegawaiData.data.lembaga || "",
          avatar: null, // Reset avatar as we don't want to show the old file
        });
        console.log("Data loaded successfully:", pegawaiData);
      } catch (error) {
        console.error("Error fetching pegawai:", error);
        setError("Gagal mengambil data pegawai");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getPegawai();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));

    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const clearFile = () => {
    setFilePreview(null);
    setFileName("");
    setFormData((prev) => ({
      ...prev,
      avatar: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      id_card: formData.id_card,
      nama_lengkap: formData.nama_lengkap,
      email: formData.email,
      no_hp: formData.no_hp,
      nik: formData.nik,
      nip: formData.nip,
      role: formData.role,
      alamat: formData.alamat,
      jenis_kelamin: formData.jenis_kelamin,
      tempat_lahir: formData.tempat_lahir,
      tanggal_lahir: formData.tanggal_lahir,
      status: formData.status,
      lembaga: formData.lembaga,
    };

    // Append semua field ke FormData
    Object.entries(fieldMappings).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
      }
    });

    // Tambahkan password hanya jika diisi
    if (formData.password) {
      newFormData.append("password", formData.password);
    }

    // Tambahkan avatar hanya jika ada file baru
    if (formData.avatar) {
      newFormData.append("avatar", formData.avatar);
    }

    try {
      setSubmitButton(true);
      const response = await updatePegawai(id, newFormData);
      if (response && response.data) {
        console.log("Data berhasil diubah");
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/kelola-pegawai/general");
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
    filePreview,
    fileName,
    fileInputRef,
    handleChange,
    handleFileChange,
    clearFile,
    handleSubmit,
  };
};
