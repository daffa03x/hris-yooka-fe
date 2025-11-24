"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getPegawaiByToken, putUserPegawaiKontak } from "@/app/services/userPegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserKontak = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        pilihan_kontak_pertama: "",
        kontak_pertama_lainnya: "",
        nama_kontak_pertama: "",
        no_hp_kontak_pertama: "",
        pilihan_kontak_kedua: "",
        kontak_kedua_lainnya: "",
        nama_kontak_kedua: "",
        no_hp_kontak_kedua: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitButton, setSubmitButton] = useState(false);

    useEffect(() => {
        const fecthData = () => {
            try {
                const response = localStorage.getItem("pegawai");
                const data = JSON.parse(response);

                setFormData({
                    pilihan_kontak_pertama: data.kontak.pilihan_kontak_pertama || "",
                    kontak_pertama_lainnya: !["Ayah", "Ibu", "Suami", "Istri"].includes(data.pilihan_kontak_pertama) ? data.pilihan_kontak_pertama : "",
                    nama_kontak_pertama: data.kontak.nama_kontak_pertama || "",
                    no_hp_kontak_pertama: data.kontak.no_hp_kontak_pertama || "",
                    pilihan_kontak_kedua: data.kontak.pilihan_kontak_kedua || "",
                    kontak_kedua_lainnya: !["Ayah", "Ibu", "Suami", "Istri"].includes(data.pilihan_kontak_kedua) ? data.pilihan_kontak_kedua : "",
                    nama_kontak_kedua: data.kontak.nama_kontak_kedua || "",
                    no_hp_kontak_kedua: data.kontak.no_hp_kontak_kedua || "",
                });
            } catch (error) {
                setError("Gagal mengambil data kontak");
            } finally {
                setLoading(false);
            }
        }
        fecthData();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
        let updatedValue = value;

        // Jika pilihan kontak pertama atau kedua adalah "Lainnya", reset nilai lainnya
        if (name === "pilihan_kontak_pertama" && value !== "Lainnya") {
            return {
            ...prev,
            [name]: updatedValue,
            kontak_pertama_lainnya: "", // Reset nilai lainnya
            };
        }

        if (name === "pilihan_kontak_kedua" && value !== "Lainnya") {
            return {
            ...prev,
            [name]: updatedValue,
            kontak_kedua_lainnya: "", // Reset nilai lainnya
            };
        }

        // Jika pilihan kontak pertama atau kedua adalah "Lainnya", simpan nilai lainnya
        if (name === "kontak_pertama_lainnya" || name === "kontak_kedua_lainnya") {
            return {
            ...prev,
            [name]: value,
            };
        }

        // Untuk kasus lainnya, simpan nilai seperti biasa
        return {
            ...prev,
            [name]: updatedValue,
        };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Tambahkan validasi di sisi klien untuk memastikan semua field terisi
        const requiredFields = [
            "pilihan_kontak_pertama", "nama_kontak_pertama", "no_hp_kontak_pertama", "pilihan_kontak_kedua", "nama_kontak_kedua", "no_hp_kontak_kedua",
        ];
        
        // Pastikan tidak ada field yang kosong
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`Field '${field}' wajib diisi.`);
                return; // Hentikan proses jika ada field kosong
            }
        }
    
        // Debug: Cek nilai formData sebelum dikirim
        console.log("FormData sebelum dikirim:", formData);
    
        const newFormData = new FormData();
    
        // Tambahkan method untuk backend agar tahu ini update
        newFormData.append("_method", "PUT");
    
        const fieldMappings = {
          pilihan_kontak_pertama: !["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_pertama) ? formData.kontak_pertama_lainnya : formData.pilihan_kontak_pertama,
          nama_kontak_pertama: formData.nama_kontak_pertama,
          no_hp_kontak_pertama: formData.no_hp_kontak_pertama,
          pilihan_kontak_kedua: !["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_kedua) ? formData.kontak_kedua_lainnya : formData.pilihan_kontak_kedua,
          nama_kontak_kedua: formData.nama_kontak_kedua,
          no_hp_kontak_kedua: formData.no_hp_kontak_kedua,
        };
    
        // Append semua field ke FormData
        Object.entries(fieldMappings).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
          }
        });
    
        try {
          setSubmitButton(true);
          const response = await putUserPegawaiKontak(newFormData);
          console.log(response);
          if (response.success == true) {
            localStorage.setItem("successMessage", "Data berhasil diubah");
            const pegawai = await getPegawaiByToken();
            localStorage.setItem("pegawai", JSON.stringify(pegawai));
            router.push("/user/information");
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

    if (loading) {
        return (
        <Dashboard>
            <Loading />
        </Dashboard>
        );
    }

    return (
        <Dashboard>
            <div className="content">
                <div className="intro-y box py-5 sm:py-10 mt-5">
                    <div className="px-5 my-10">
                        <div className="font-medium text-center text-lg">Upload Data</div>
                        <div className="text-slate-500 text-center mt-2">Data Pegawai</div>
                    </div>
                    <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl my-4">Kontak Pertama</h2>
                        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="nama_kontak_pertama" className="form-label">
                                Nama Kontak Pertama
                            </label>
                            <input id="nama_kontak_pertama" type="text" className="form-control" placeholder="Nama Kontak Pertama" name="nama_kontak_pertama" value={formData.nama_kontak_pertama} onChange={handleChange} />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="no_hp_kontak_pertama" className="form-label">
                                No Telepon Kontak Pertama
                            </label>
                            <input id="no_hp_kontak_pertama" type="text" className="form-control" placeholder="No Telepon Kontak Pertama" name="no_hp_kontak_pertama" value={formData.no_hp_kontak_pertama} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                            <label htmlFor="pilihan_kontak_ayah" className="form-label">
                            Hubungan Kontak Pertama
                            </label>
                            <div className="flex flex-col sm:flex-row mt-2">
                            <div className="form-check mr-5">
                                <input id="pilihan_kontak_ayah" className="form-check-input" type="radio" value="Ayah" name="pilihan_kontak_pertama" checked={formData.pilihan_kontak_pertama === "Ayah"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_ayah">
                                Ayah
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_ibu" className="form-check-input" type="radio" value="Ibu" name="pilihan_kontak_pertama" onChange={handleChange} checked={formData.pilihan_kontak_pertama === "Ibu"} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_ibu">
                                Ibu
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_suami" className="form-check-input" type="radio" value="Suami" name="pilihan_kontak_pertama" onChange={handleChange} checked={formData.pilihan_kontak_pertama === "Suami"} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_suami">
                                Suami
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_istri" className="form-check-input" type="radio" value="Istri" name="pilihan_kontak_pertama" onChange={handleChange} checked={formData.pilihan_kontak_pertama === "Istri"} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_istri">
                                Istri
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_lainnya" className="form-check-input" type="radio" value="Lainnya" name="pilihan_kontak_pertama" onChange={handleChange} checked={!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_pertama)} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_lainnya">
                                Lainnya
                                </label>
                            </div>
                            {!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_pertama) && (
                                <div className="mt-2 sm:mt-0 ml-0 sm:ml-5">
                                <input type="text" className="form-control" placeholder="Sebutkan hubungan" name="kontak_pertama_lainnya" value={formData.kontak_pertama_lainnya || ""} onChange={handleChange} />
                                </div>
                            )}
                            </div>
                        </div>

                        <h2 className="text-2xl mt-8 mb-8">Kontak Kedua</h2>
                        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="nama_kontak_kedua" className="form-label">
                                Nama Kontak Kedua
                            </label>
                            <input id="nama_kontak_kedua" type="text" className="form-control" placeholder="Nama Kontak Kedua" name="nama_kontak_kedua" value={formData.nama_kontak_kedua} onChange={handleChange} />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="no_hp_kontak_kedua" className="form-label">
                                No Telepon Kontak Kedua
                            </label>
                            <input id="no_hp_kontak_kedua" type="text" className="form-control" placeholder="No Telepon Kontak Kedua" name="no_hp_kontak_kedua" value={formData.no_hp_kontak_kedua} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                            <label htmlFor="pilihan_kontak_ayah" className="form-label">
                            Hubungan Kontak Kedua
                            </label>
                            <div className="flex flex-col sm:flex-row mt-2">
                            <div className="form-check mr-5">
                                <input id="pilihan_kontak_ayah" className="form-check-input" type="radio" value="Ayah" name="pilihan_kontak_kedua" checked={formData.pilihan_kontak_kedua === "Ayah"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_ayah">
                                Ayah
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_ibu" className="form-check-input" type="radio" value="Ibu" name="pilihan_kontak_kedua" onChange={handleChange} checked={formData.pilihan_kontak_kedua === "Ibu"} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_ibu">
                                Ibu
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_suami" className="form-check-input" type="radio" value="Suami" name="pilihan_kontak_kedua" onChange={handleChange} checked={formData.pilihan_kontak_kedua === "Suami"} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_suami">
                                Suami
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_istri" className="form-check-input" type="radio" value="Istri" name="pilihan_kontak_kedua" onChange={handleChange} checked={formData.pilihan_kontak_kedua === "Istri"} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_istri">
                                Istri
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="pilihan_kontak_lainnya" className="form-check-input" type="radio" value="Lainnya" name="pilihan_kontak_kedua" onChange={handleChange} checked={!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_kedua)} />
                                <label className="form-check-label" htmlFor="pilihan_kontak_lainnya">
                                Lainnya
                                </label>
                            </div>
                            {!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_kedua) && (
                                <div className="mt-2 sm:mt-0 ml-0 sm:ml-5">
                                <input type="text" className="form-control" placeholder="Sebutkan hubungan" name="kontak_kedua_lainnya" value={formData.kontak_kedua_lainnya || ""} onChange={handleChange} />
                                </div>
                            )}
                            </div>
                        </div>
                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                            <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/user/information" title="Kembali" />
                            <SubmitButton isSubmitting={submitButton} />
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default UserKontak;
