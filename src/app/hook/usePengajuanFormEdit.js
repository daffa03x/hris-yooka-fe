import { getPegawai } from "@/app/utils/pegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getPegawaiPengajuanAbsensiById, updatePegawaiPengajuanAbsensi } from "../services/pegawaiPengajuanAbsen";

export const usePengajuanFormEdit = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(""); // Baru: tipe file untuk preview
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const requiredFields = ["id_pegawai", "jenis_izin", "tanggal_awal", "tanggal_akhir", "keterangan"];

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [formData, setFormData] = useState({
    id_pegawai: "",
    jenis_izin: "",
    tanggal_awal: "",
    tanggal_akhir: "",
    keterangan: "",
    upload_surat_sakit: "",
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

    setFormData((prevData) => ({
      ...prevData,
      upload_surat_sakit: file,
    }));

    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
        setFileType("image");
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      setFilePreview(null);
      setFileType("pdf");
    } else {
      setFilePreview(null);
      setFileType("file");
    }
  };

  const clearFile = () => {
    setFilePreview(null);
    setFileName("");
    setFileType("");
    setFormData((prev) => ({
      ...prev,
      upload_surat_sakit: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePegawaiChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      id_pegawai: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const createOptions = (pegawai) =>
    pegawai.map((item) => ({
      value: item.id,
      label: `${item.users.name} - ${item.nip}`,
    }));

  useEffect(() => {
    const fetchPegawaiPengajuan = async () => {
      try {
        setLoading(true);
        const response = await getPegawaiPengajuanAbsensiById(id);
        const data = response.data;
        console.log(data);
        setFormData({
          id_pegawai: data.id_pegawai,
          jenis_izin: data.jenis_izin,
          tanggal_awal: data.tanggal_awal,
          tanggal_akhir: data.tanggal_akhir,
          keterangan: data.keterangan,
          upload_surat_sakit: data.upload_surat_sakit,
        });

        setDateRange([
          {
            startDate: new Date(data.tanggal_awal),
            endDate: new Date(data.tanggal_akhir),
            key: "selection",
          },
        ]);
      } catch (error) {
        console.error("Error fetching pegawai pengajuan absensi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPegawaiPengajuan();
  }, [id]);

  useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const pegawaiData = await getPegawai();
        setOptions(createOptions(pegawaiData));
      } catch (error) {
        console.error("Error fetching pegawai:", error);
      }
    };

    fetchPegawai();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({
      formData: {
        ...formData,
        tanggal_awal: dateRange[0].startDate.toLocaleDateString("en-CA"),
        tanggal_akhir: dateRange[0].endDate.toLocaleDateString("en-CA"),
      },
      requiredFields,
      setError,
    });

    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("_method", "PUT");
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("jenis_izin", formData.jenis_izin);
    newFormData.append("tanggal_awal", dateRange[0].startDate.toLocaleDateString("en-CA"));
    newFormData.append("tanggal_akhir", dateRange[0].endDate.toLocaleDateString("en-CA"));
    newFormData.append("keterangan", formData.keterangan);
    if (formData.upload_surat_sakit) {
      newFormData.append("upload_surat_sakit", formData.upload_surat_sakit);
    }

    try {
      setSubmitButton(true);
      const response = await updatePegawaiPengajuanAbsensi(id, newFormData);

      if (response && response.data) {
        localStorage.setItem("successMessage", "Data berhasil diupdate");
        router.push("/admin/kelola-pegawai/pengajuan");
      } else {
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
    formData,
    options,
    dateRange,
    loading,
    error,
    submitButton,
    filePreview,
    fileType,
    fileName,
    fileInputRef,
    handleChange,
    handleFileChange,
    clearFile,
    handleSubmit,
    handlePegawaiChange,
    handleDateChange,
  };
};
