import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validationRequired } from "../utils/validations/validationRequired";
import { getAsset } from "../utils/asset";
import { getPegawai } from "../utils/pegawai";
import { storeAssetAssignment } from "../services/assetAssignment";

export const useAssetAssignmentFormCreate = () => {
  const router = useRouter();
  const [asset, setAsset] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [error, setError] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_asset: "",
    id_pegawai: "",
    tanggal_peminjaman: "",
  });
  const requiredFields = ["id_asset", "id_pegawai", "tanggal_peminjaman"];

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const assetData = await getAsset();
        const pegawaiData = await getPegawai();
        const formatedAsset = createAsset(assetData);
        const formatedPegawai = createPegawai(pegawaiData);
        setAsset(formatedAsset);
        setPegawai(formatedPegawai);
      } catch (error) {
        console.error("Gagal mengambil data asset & pegawai:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

    const createAsset = (asset) =>
        asset.map((item) => ({
            value: item.id,
            label: item.nama_asset + " - " + item.code_asset,
    }));
    
    const createPegawai = (pegawai) =>
        pegawai.map((item) => ({
            value: item.id,
            label: item.users.name + " - " + item.nip,
    }));

  // Handle perubahan select kategori
    const handleAssetChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            id_asset: selectedOption ? selectedOption.value : "",
        }));
    };
  
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
    newFormData.append("id_asset", formData.id_asset);
    newFormData.append("id_pegawai", formData.id_pegawai);
    newFormData.append("tanggal_peminjaman", formData.tanggal_peminjaman);

    try {
      setSubmitButton(true);
      const response = await storeAssetAssignment(newFormData);
      console.log("Sukses:", response);
      if (response && response.data) {
        console.log("Data berhasil disimpan");
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/inventaris/asset-assignment");
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
    asset,
    pegawai,
    formData,
    handleChange,
    handleAssetChange,
    handlePegawaiChange,
    handleSubmit,
  };
};
