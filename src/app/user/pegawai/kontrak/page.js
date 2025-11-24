"use client";
import InputFile from "@/app/components/common/InputFile";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getPegawaiByToken, putUserPegawaiGeneral, putUserPegawaiKontrak } from "@/app/services/userPegawai";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const UserKontrak = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        tanggal_mulai: "",
        tanggal_akhir: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitButton, setSubmitButton] = useState(false);

    useEffect(() => {
        const fecthData = () => {
            try {
                const response = localStorage.getItem("pegawai");
                const data = JSON.parse(response);
                // Format the date to YYYY-MM-DD for the date input
                const formattedDateMulai = data.kontrak.tanggal_mulai ? new Date(data.kontrak.tanggal_mulai).toISOString().split("T")[0] : "";
                const formattedDateAkhir = data.kontrak.tanggal_akhir ? new Date(data.kontrak.tanggal_akhir).toISOString().split("T")[0] : "";

                setFormData({
                    tanggal_mulai: formattedDateMulai || "",
                    tanggal_akhir: formattedDateAkhir || "",
                });
            } catch (error) {
                setError("Gagal mengambil data kontrak");
            } finally {
                setLoading(false);
            }
        }
        fecthData();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Tambahkan validasi di sisi klien untuk memastikan semua field terisi
        const requiredFields = [
            "tanggal_mulai", "tanggal_akhir"
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
          tanggal_mulai: formData.tanggal_mulai,
          tanggal_akhir: formData.tanggal_akhir,
        };
    
        // Append semua field ke FormData
        Object.entries(fieldMappings).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
          }
        });
    
        try {
          setSubmitButton(true);
          const response = await putUserPegawaiKontrak(newFormData);
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
                        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="tanggal_mulai" className="form-label">
                                Tanggal Mulai
                            </label>
                            <input id="tanggal_mulai" type="date" className="form-control" placeholder="Tanggal Mulai" name="tanggal_mulai" value={formData.tanggal_mulai} onChange={handleChange} />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="tanggal_akhir" className="form-label">
                                Tanggal Akhir
                            </label>
                            <input id="tanggal_akhir" type="date" className="form-control" placeholder="Tanggal Akhir" name="tanggal_akhir" value={formData.tanggal_akhir} onChange={handleChange} />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6"></div>
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

export default UserKontrak;
