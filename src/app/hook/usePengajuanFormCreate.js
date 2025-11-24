import { validationRequired } from "../utils/validations/validationRequired";
import { getPegawai } from "@/app/utils/pegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { storePegawaiPengajuanAbsensi } from "../services/pegawaiPengajuanAbsen";

export const usePengajuanFormCreate = () => {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const requiredFields = ["id_pegawai", "jenis_izin", "tanggal_awal", "tanggal_akhir", "keterangan"];
  
  // New state for file preview
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [formData, setFormData] = useState({
    id_pegawai: "",
    jenis_izin: "Sakit",
    keterangan: "",
    upload_surat_sakit: null,
  });

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Set file in form data
    setFormData((prevData) => ({
      ...prevData,
      upload_surat_sakit: file,
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
    } else if (file.type === 'application/pdf') {
      // For PDFs, we'll just indicate it's a PDF
      setFilePreview('pdf');
    } else {
      // For other file types
      setFilePreview('file');
    }
  };
  
  // Function to clear the file and its preview
  const clearFile = () => {
    setFilePreview(null);
    setFileName("");
    setFormData(prev => ({
      ...prev,
      upload_surat_sakit: null
    }));
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        setError("Gagal mengambil data pegawai");
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

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({
      formData: {
        ...formData,
        tanggal_awal: dateRange[0].startDate.toLocaleDateString('en-CA'),
        tanggal_akhir: dateRange[0].endDate.toLocaleDateString('en-CA')
      },
      requiredFields,
      setError
    });
    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("jenis_izin", formData.jenis_izin);
    newFormData.append("tanggal_awal", dateRange[0].startDate.toLocaleDateString('en-CA'));
    newFormData.append("tanggal_akhir", dateRange[0].endDate.toLocaleDateString('en-CA'));    
    newFormData.append("keterangan", formData.keterangan);
    if (formData.upload_surat_sakit) {
      newFormData.append("upload_surat_sakit", formData.upload_surat_sakit);
    }

    try {
      setSubmitButton(true);
      const response = await storePegawaiPengajuanAbsensi(newFormData);
      if (response && response.data) {
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/pengajuan");
      } else {
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
    options,
    dateRange,
    loading,
    error,
    submitButton,
    filePreview,
    fileName,
    fileInputRef,
    handleChange,
    handleFileChange,
    clearFile,
    handleSubmit,
    handlePegawaiChange,
    handleDateChange
  };
};