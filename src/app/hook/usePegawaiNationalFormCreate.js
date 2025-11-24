import { useRouter } from "next/navigation";
import { useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { storeNationalDay } from "../services/pegawaiNationalDay";

export const usePegawaiNationalFormCreate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });
  const requiredFields = ["name","date"];
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("date", formData.date);

    try {
      setSubmitButton(true);
      const response = await storeNationalDay(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/kelola-pegawai/hari-nasional");
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
    handleChange,
    handleSubmit,
  };
};
