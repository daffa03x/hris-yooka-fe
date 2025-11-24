import { useRouter } from "next/navigation";
import { useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { updatePegawaiPassword } from "../services/pegawaiProfile";
import { logout } from "../services/auth";

export const usePasswordFormEdit = (id) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const requiredFields = ["password", "password_confirm"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = validationRequired({ formData, requiredFields, setError });
    if (!isValid) return;

    if (formData.password != formData.password_confirm) {
      setError("Password harus sama");
    }

    const newFormData = new FormData();

    // Tambahkan method untuk backend agar tahu ini update
    newFormData.append("_method", "PUT");
    newFormData.append("password", formData.password);
    newFormData.append("password_confirm", formData.password_confirm);

    try {
      setSubmitButton(true);
      const response = await updatePegawaiPassword(id, newFormData); // Gunakan fungsi update
      console.log("Sukses:", response);
      if (response) {
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
    formData,
    handleChange,
    handleSubmit,
  };
};
