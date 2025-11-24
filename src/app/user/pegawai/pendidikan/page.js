"use client";
import InputFile from "@/app/components/common/InputFile";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getPegawaiByToken, putUserPegawaiPendidikan } from "@/app/services/userPegawai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPendidikan = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nama_instansi: "",
        jurusan: "",
        jenjang: "",
        ijazah: "",
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
                    nama_instansi: data.pendidikan.nama_instansi || "",
                    jurusan: data.pendidikan.jurusan || "",
                    jenjang: data.pendidikan.jenjang || "",
                    ijazah: null, // Reset avatar as we don't want to show the old file
                });
            } catch (error) {
                setError("Gagal mengambil data pegawai");
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
        ...prevData,
        ijazah: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Tambahkan validasi di sisi klien untuk memastikan semua field terisi
        const requiredFields = [
            "nama_instansi", "jurusan", "jenjang"
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
          nama_instansi: formData.nama_instansi,
          jurusan: formData.jurusan,
          jenjang: formData.jenjang,
        };
    
        // Append semua field ke FormData
        Object.entries(fieldMappings).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
          }
        });
    
        // Tambahkan ijazah hanya jika ada file baru
        if (formData.ijazah) {
          newFormData.append("ijazah", formData.ijazah);
        }
    
        try {
          setSubmitButton(true);
          const response = await putUserPegawaiPendidikan(newFormData);
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
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="nama_instansi" className="form-label">
                                Instansi
                            </label>
                            <input id="nama_instansi" type="text" className="form-control" placeholder="Instansi" name="nama_instansi" value={formData.nama_instansi} onChange={handleChange} />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                            <label htmlFor="jurusan" className="form-label">
                                Jurusan
                            </label>
                            <input id="jurusan" type="text" className="form-control" placeholder="Jurusan" name="jurusan" value={formData.jurusan} onChange={handleChange} />
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                            <label htmlFor="jenjang_sma" className="form-label">
                            Jenjang
                            </label>
                            <div className="flex flex-col sm:flex-row mt-2">
                            <div className="form-check mr-5">
                                <input id="jenjang_sma" className="form-check-input" type="radio" value="SMA" name="jenjang" checked={formData.jenjang === "SMA"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="jenjang_sma">
                                SMA
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="jenjang_smk" className="form-check-input" type="radio" value="SMK" name="jenjang" onChange={handleChange} checked={formData.jenjang === "SMK"} />
                                <label className="form-check-label" htmlFor="jenjang_smk">
                                SMK
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="jenjang_s1" className="form-check-input" type="radio" value="S1" name="jenjang" onChange={handleChange} checked={formData.jenjang === "S1"} />
                                <label className="form-check-label" htmlFor="jenjang_s1">
                                S1
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="jenjang_s2" className="form-check-input" type="radio" value="S2" name="jenjang" onChange={handleChange} checked={formData.jenjang === "S2"} />
                                <label className="form-check-label" htmlFor="jenjang_s2">
                                S2
                                </label>
                            </div>
                            <div className="form-check mr-5 mt-2 sm:mt-0">
                                <input id="jenjang_s3" className="form-check-input" type="radio" value="S3" name="jenjang" onChange={handleChange} checked={formData.jenjang === "S3"} />
                                <label className="form-check-label" htmlFor="jenjang_s3">
                                S3
                                </label>
                            </div>
                            </div>
                            </div>
                                <div className="intro-y col-span-12 sm:col-span-6">
                                <InputFile
                                    label="Upload Ijazah"
                                    name="ijazah"
                                    handleFileChange={handleFileChange}
                                />
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

export default UserPendidikan;
