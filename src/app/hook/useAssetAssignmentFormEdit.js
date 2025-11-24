import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getAssetAssignmentById, updateAssetAssignment } from "../services/assetAssignment";

export const useAssetAssignmentFormEdit = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tanggal_peminjaman: "",
    tanggal_pengembalian: "",
    kondisi_saat_pengembalian: "",
    notes: "",
  });
  const requiredFields = ["tanggal_peminjaman"];

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // Ambil data kontak darurat berdasarkan ID
    useEffect(() => {
      const fetchAssetAssignmentById = async () => {
        try {
          setLoading(true);
          const response = await getAssetAssignmentById(id);
          setFormData({
            tanggal_peminjaman: response.data.tanggal_peminjaman,
            tanggal_pengembalian: response.data.tanggal_pengembalian || "",
            kondisi_saat_pengembalian: response.data.kondisi_saat_pengembalian || "",
            notes: response.data.notes || "",
          });
        } catch (error) {
          console.error("Error fetching asset assignment by ID:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAssetAssignmentById();
    }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();
    
    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("tanggal_peminjaman", formData.tanggal_peminjaman);
    if (
        formData.tanggal_pengembalian !== "" &&
        formData.tanggal_pengembalian !== null &&
        formData.tanggal_pengembalian !== "null"
    ) {
        newFormData.append("tanggal_pengembalian", formData.tanggal_pengembalian);
    }

    if (
        formData.kondisi_saat_pengembalian !== "" &&
        formData.kondisi_saat_pengembalian !== null &&
        formData.kondisi_saat_pengembalian !== "null"
    ) {
        newFormData.append("kondisi_saat_pengembalian", formData.kondisi_saat_pengembalian);
    }

    if (
        formData.notes !== "" &&
        formData.notes !== null &&
        formData.notes !== "null"

    ) {
        newFormData.append("notes", formData.notes);
    }

    try {
      setSubmitButton(true);
      console.log(newFormData.tanggal_peminjaman);
      const response = await updateAssetAssignment(id, newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil diubah");
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/inventaris/asset-assignment");
      } else {
        console.error("Gagal ubah data");
        setError("Gagal ubah data");
      }
    } catch (error) {
      console.error("Kesalahan saat ubah data:", error);
      setError("Terjadi kesalahan saat ubah data");
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
    handleSubmit,
  };
};
