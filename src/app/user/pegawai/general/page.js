"use client";
import InputFile from "@/app/components/common/InputFile";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getPegawaiByToken, putUserPegawaiGeneral } from "@/app/services/userPegawai";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const UserGeneral = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nama_lengkap: "",
        email: "",
        no_hp: "",
        nik: "",
        alamat: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        status: "",
        avatar: null,
    });
    const [error, setError] = useState("");
    const [filePreview, setFilePreview] = useState(null);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [submitButton, setSubmitButton] = useState(false);

    useEffect(() => {
        const fecthData = () => {
            try {
                const response = localStorage.getItem("pegawai");
                const data = JSON.parse(response);
                // Format the date to YYYY-MM-DD for the date input
                const formattedDate = data.pegawai.tanggal_lahir ? new Date(data.pegawai.tanggal_lahir).toISOString().split("T")[0] : "";

                setFormData({
                    nama_lengkap: data.pegawai.users.name || "",
                    email: data.pegawai.users.email || "",
                    no_hp: data.pegawai.no_hp || "",
                    nik: data.pegawai.nik || "",
                    alamat: data.pegawai.alamat || "",
                    jenis_kelamin: data.pegawai.jenis_kelamin || "",
                    tempat_lahir: data.pegawai.tempat_lahir || "",
                    tanggal_lahir: formattedDate,
                    status: data.pegawai.status || "",
                    avatar: null, // Reset avatar as we don't want to show the old file
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
        if (!file) return;

        setFormData((prevData) => ({
            ...prevData,
            avatar: file,
        }));

        setFileName(file.name);

        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview(null);
        }
    };

    const clearFile = () => {
        setFilePreview(null);
        setFileName("");
        setFormData((prev) => ({
            ...prev,
            avatar: null,
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Tambahkan validasi di sisi klien untuk memastikan semua field terisi
        const requiredFields = [
            "nama_lengkap", "email", "no_hp", "nik", "alamat", "jenis_kelamin",
            "tempat_lahir", "tanggal_lahir", "status",
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
          nama_lengkap: formData.nama_lengkap,
          email: formData.email,
          no_hp: formData.no_hp,
          nik: formData.nik,
          alamat: formData.alamat,
          jenis_kelamin: formData.jenis_kelamin,
          tempat_lahir: formData.tempat_lahir,
          tanggal_lahir: formData.tanggal_lahir,
          status: formData.status,
        };
    
        // Append semua field ke FormData
        Object.entries(fieldMappings).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            newFormData.append(key, value.toString()); // Pastikan semua nilai dikonversi ke string
          }
        });
    
        // Tambahkan avatar hanya jika ada file baru
        if (formData.avatar) {
          newFormData.append("avatar", formData.avatar);
        }
    
        try {
          setSubmitButton(true);
          const response = await putUserPegawaiGeneral(newFormData);
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
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="nama_lengkap" className="form-label">
                                        Nama Lengkap
                                    </label>
                                    <input id="nama_lengkap" type="text" className="form-control" placeholder="Nama Lengkap Anda" name="nama_lengkap" value={formData.nama_lengkap || ""} onChange={handleChange} />
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input id="email" type="email" className="form-control" placeholder="Email Anda" name="email" value={formData.email || ""} onChange={handleChange} />
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="no_hp" className="form-label">
                                        No Telepon
                                    </label>
                                    <input id="no_hp" type="text" className="form-control" placeholder="No Telepon Anda" name="no_hp" value={formData.no_hp || ""} onChange={handleChange} />
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="nik" className="form-label">
                                        NIK
                                    </label>
                                    <input id="nik" type="text" className="form-control" placeholder="NIK Anda" name="nik" value={formData.nik || ""} onChange={handleChange} />
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="jenis_kelamin" className="form-label">
                                        Gender
                                    </label>
                                    <div className="flex flex-col sm:flex-row mt-2">
                                        <div className="form-check mr-10">
                                            <input id="jenis_kelamin_laki" className="form-check-input" type="radio" value="L" name="jenis_kelamin" checked={formData.jenis_kelamin === "L"} onChange={handleChange} />
                                            <label className="form-check-label" htmlFor="jenis_kelamin_laki">
                                                Laki Laki
                                            </label>
                                        </div>
                                        <div className="form-check mr-2 mt-2 sm:mt-0">
                                            <input id="jenis_kelamin_perempuan" className="form-check-input" type="radio" value="P" name="jenis_kelamin" onChange={handleChange} checked={formData.jenis_kelamin === "P"} />
                                            <label className="form-check-label" htmlFor="jenis_kelamin_perempuan">
                                                Perempuan
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="status" className="form-label">
                                        Status
                                    </label>
                                    <div className="flex flex-col sm:flex-row mt-2">
                                        <div className="form-check mr-10">
                                            <input id="status_menikah" className="form-check-input" type="radio" value="Menikah" name="status" onChange={handleChange} checked={formData.status === "Menikah"} />
                                            <label className="form-check-label" htmlFor="status_menikah">
                                                Menikah
                                            </label>
                                        </div>
                                        <div className="form-check mr-2 mt-2 sm:mt-0">
                                            <input id="status_belum" className="form-check-input" type="radio" value="Belum Menikah" name="status" onChange={handleChange} checked={formData.status === "Belum Menikah"} />
                                            <label className="form-check-label" htmlFor="status_belum">
                                                Belum Menikah
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="tempat_lahir" className="form-label">
                                        Tempat Lahir
                                    </label>
                                    <input id="tempat_lahir" type="text" className="form-control" placeholder="Tempat Lahir Anda" name="tempat_lahir" value={formData.tempat_lahir || ""} onChange={handleChange} />
                                </div>

                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label htmlFor="tanggal_lahir" className="form-label">
                                        Tanggal Lahir
                                    </label>
                                    <input id="tanggal_lahir" type="date" className="form-control" placeholder="Tanggal Lahir Anda" name="tanggal_lahir" value={formData.tanggal_lahir || ""} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                                <label htmlFor="alamat" className="form-label">
                                    Alamat
                                </label>
                                <textarea id="alamat" type="text" className="form-control" placeholder="Alamat Anda" name="alamat" cols={"5"} rows={"5"} value={formData.alamat || ""} onChange={handleChange}></textarea>
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <InputFile
                                label="Avatar"
                                name="avatar"
                                filePreview={filePreview}
                                fileName={fileName}
                                fileInputRef={fileInputRef}
                                handleFileChange={handleFileChange}
                                clearFile={clearFile}
                                />
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

export default UserGeneral;
