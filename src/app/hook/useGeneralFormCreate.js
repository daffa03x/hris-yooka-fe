import { storePegawai } from "@/app/services/pegawaiGeneral";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";

export const useGeneralFormCreate = () => {
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
  const requiredFields = ["nama_lengkap", "email", "password", "no_hp", "nik", "nip", "role", "id_card", "alamat", "jenis_kelamin", "tempat_lahir", "tanggal_lahir", "status", "lembaga"];
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Set file in form data
    setFormData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
    
    // Set filename for display
    setFileName(file.name);
    
    // Create preview based on file type
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

      if (imageTypes.includes(file.type)) {
        // Tampilkan preview gambar
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result); // Hasil base64 dari gambar
        };
        reader.readAsDataURL(file);
      } else {
        // Untuk tipe file lainnya
        setFilePreview('file');
      }
    }
  };
  
  // Function to clear the file and its preview
  const clearFile = () => {
    setFilePreview(null);
    setFileName("");
    setFormData(prev => ({
      ...prev,
      avatar: null
    }));
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("nama_lengkap", formData.nama_lengkap);
    newFormData.append("id_card", formData.id_card);
    newFormData.append("email", formData.email);
    newFormData.append("no_hp", formData.no_hp);
    newFormData.append("password", formData.password);
    newFormData.append("nik", formData.nik);
    newFormData.append("nip", formData.nip);
    newFormData.append("role", formData.role);
    newFormData.append("alamat", formData.alamat);
    newFormData.append("jenis_kelamin", formData.jenis_kelamin);
    newFormData.append("tempat_lahir", formData.tempat_lahir);
    newFormData.append("tanggal_lahir", formData.tanggal_lahir);
    newFormData.append("status", formData.status);
    newFormData.append("lembaga", formData.lembaga);
    if (formData.avatar) {
      newFormData.append("avatar", formData.avatar);
    }

    try {
      setSubmitButton(true);
      const response = await storePegawai(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/general");
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
    filePreview,
    fileName,
    fileInputRef,
    clearFile,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};
