"use client";
import Loading from "@/app/components/common/Loading";
import Dashboard from "@/app/layouts/UserDashboard";
import { sumMasaKerja } from "@/app/utils/global/sumMasaKerja";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";


const IndexUserPegawai = () => {
    const [tab, setTab] = useState("kontak");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Inisialisasi true agar loading langsung muncul
    const [error, setError] = useState(null);

    const handleTab = (value) => {
        console.log(value)
        setTab(value);
        return 
    }

    useEffect(() => {
        const fetchData = () => {
            try {
                const response = localStorage.getItem("pegawai");
                const data = JSON.parse(response);
                setData(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Terjadi kesalahan tak terduga.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Hanya jalankan sekali saat mount

    if (loading) {
        return (
        <Dashboard>
            <Loading />
        </Dashboard>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!data || !data.pegawai) {
        return <div>Data profil pegawai tidak ditemukan atau tidak lengkap.</div>;
    }

  return (
    <Dashboard>
        <div className="content">
            <div className="intro-y flex items-center mt-8">
                <h2 className="text-lg font-medium mr-auto">
                    Informasi Pegawai
                </h2>
            </div>
            <div className="intro-y box px-5 pt-5 mt-5">
                <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
                    <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL_PRODUCTION}/${data.pegawai.users?.avatar}`}
                                width={200}
                                height={200}
                                alt="Avatar"
                                className="rounded-full"
                            />
                            <div className="absolute mb-1 mr-1 flex items-center justify-center bottom-0 right-0 bg-primary rounded-full p-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera2 text-white" viewBox="0 0 16 16">
                                <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4"/>
                                <path d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.97 5.97 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1M2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0M14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0"/>
                                </svg> 
                            </div>
                        </div>
                        <div className="ml-5">
                            <div className="w-24 sm:w-64 truncate sm:whitespace-normal font-medium text-lg">
                                {data.pegawai.users?.name || 'Nama Tidak Tersedia'}
                            </div>
                            <div className="text-slate-500 mb-1">
                                {data.pegawai.users?.role || 'Jabatan Tidak Tersedia'}
                            </div>
                            <div>
                                <Link href="/user/pegawai/general" className="btn btn-sm btn-warning text-white"><FaPencil/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
                        <div className="font-medium text-center lg:text-left lg:mt-3">Contact Details</div>
                        <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                            <div className="truncate sm:whitespace-normal flex items-center"> NIP : {data.pegawai.nip} </div>
                            <div className="truncate sm:whitespace-normal flex items-center mt-3"> ID Card : {data.pegawai.id_card} </div>
                            <div className="truncate sm:whitespace-normal flex items-center mt-3"> Lembaga :  {data.pegawai.lembaga} </div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0">
                        <div className="font-medium text-center lg:text-left lg:mt-5"></div>
                        <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                            <div className="truncate sm:whitespace-normal flex items-center">NIK : {data.pegawai.nik} </div>
                            <div className="truncate sm:whitespace-normal flex items-center mt-3"> Email : {data.pegawai.users?.email} </div>
                            <div className="truncate sm:whitespace-normal flex items-center mt-3"> NO HP : {data.pegawai.no_hp} </div>
                            <div className="truncate sm:whitespace-normal flex items-center mt-3"> Alamat : {data.pegawai.alamat} </div>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center" role="tablist" >
                    <li onClick={() => handleTab("kontak")} id="dashboard-tab" className="nav-item" role="presentation">
                        <button
                            className={`nav-link py-4 ${tab === 'kontak' ? 'active' : ''}`}
                            aria-selected={tab === "kontak" ? true : false}
                            role="tab"
                        >
                            Kontak Darurat
                        </button>
                    </li>
                    <li onClick={() => handleTab("kontrak")} id="dashboard-tab" className="nav-item" role="presentation">
                        <button
                            className={`nav-link py-4 ${tab === 'kontrak' ? 'active' : ''}`}
                            aria-selected={tab === "kontrak" ? true : false}
                            role="tab"
                        >
                            Kontrak
                        </button>
                    </li>
                    <li onClick={() => handleTab("pendidikan")} id="dashboard-tab" className="nav-item" role="presentation">
                        <button
                            className={`nav-link py-4 ${tab === 'pendidikan' ? 'active' : ''}`}
                            aria-selected={tab === "pendidikan" ? true : false}
                            role="tab"
                        >
                            Pendidikan
                        </button>
                    </li>
                </ul>
            </div>
            <div className="intro-y tab-content mt-5">
                {tab == "kontak" &&
                    <div id="dashboard" className="tab-pane active" role="tabpanel" aria-labelledby="dashboard-tab">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y box col-span-12 lg:col-span-6">
                                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="font-medium text-base mr-auto">
                                        Kontak Darurat Pertama
                                    </h2>
                                    <Link href="/user/pegawai/kontak" className="btn btn-sm btn-warning text-white"><FaPencil/></Link>
                                </div>
                                <div className="p-5">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="mr-auto">
                                            <a href="" className="font-medium">{data.kontak?.nama_kontak_pertama}</a> 
                                            <div className="text-slate-500 mt-1">{data.kontak?.no_hp_kontak_pertama}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-32 -ml-2 sm:ml-0 mt-5 mr-auto sm:mr-5">
                                                <div className="h-[30px]">
                                                    <canvas className="simple-line-chart-1" data-random="true"></canvas>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium mr-4">{data.kontak?.pilihan_kontak_pertama}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="intro-y box col-span-12 lg:col-span-6">
                                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="font-medium text-base mr-auto">
                                        Kontak Darurat Kedua
                                    </h2>
                                </div>
                                <div className="p-5">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="mr-auto">
                                            <a href="" className="font-medium">{data.kontak?.nama_kontak_kedua}</a> 
                                            <div className="text-slate-500 mt-1">{data.kontak?.no_hp_kontak_kedua}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-32 -ml-2 sm:ml-0 mt-5 mr-auto sm:mr-5">
                                                <div className="h-[30px]">
                                                    <canvas className="simple-line-chart-1" data-random="true"></canvas>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium mr-4">{data.kontak?.pilihan_kontak_kedua}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {tab == "kontrak" &&
                    <div id="dashboard" className="tab-pane active" role="tabpanel" aria-labelledby="dashboard-tab">
                        <div className="grid grid-cols-12 gap-6">

                            {/* --- KARTU TANGGAL MASUK --- */}
                            <div className="intro-y box col-span-12 lg:col-span-4">
                                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="font-medium text-base mr-auto">
                                        Tanggal Masuk
                                    </h2>
                                    <Link href="/user/pegawai/kontrak" className="btn btn-sm btn-warning text-white"><FaPencil/></Link>
                                </div>
                                <div className="p-5 text-center">
                                    <div className="text-xl font-bold">{data.kontrak?.tanggal_mulai || 'Belum Ada Data'}</div>
                                </div>
                            </div>

                            {/* --- KARTU TANGGAL HABIS KONTRAK --- */}
                            <div className="intro-y box col-span-12 lg:col-span-4">
                                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="font-medium text-base mr-auto">
                                        Tanggal Habis Kontrak
                                    </h2>
                                </div>
                                <div className="p-5 text-center">
                                    <div className="text-xl font-bold">{data.kontrak?.tanggal_akhir || 'Belum Ada Data'}</div>
                                </div>
                            </div>

                            {/* --- KARTU MASA KERJA BARU --- */}
                            <div className="intro-y box col-span-12 lg:col-span-4">
                                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="font-medium text-base mr-auto">
                                        Masa Kerja
                                    </h2>
                                </div>
                                <div className="p-5 text-center">
                                    {/* Panggil fungsi hitungMasaKerja di sini */}
                                    <div className="text-xl font-bold">
                                        {sumMasaKerja(data.kontrak?.tanggal_mulai, Date.now())}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                }
                {tab == "pendidikan" &&
                    <div id="dashboard" className="tab-pane active" role="tabpanel" aria-labelledby="dashboard-tab">
                        <h2 className="font-medium text-lg mb-4">Pendidikan Terakhir</h2>
                        <div className="grid grid-cols-12 gap-6">
                            {/* Menggunakan md:col-span-12 karena Anda ingin satu kolom di desktop */}
                            <div className="intro-y box col-span-12">
                                {/* Menggunakan 'relative' untuk menjadikan div ini sebagai acuan posisi absolut */}
                                <div className="p-5 relative">
                                    {/* Tombol edit dengan posisi 'absolute' di kanan atas */}
                                    <div className="absolute top-0 right-0 p-5">
                                        <Link href="/user/pegawai/pendidikan" className="btn btn-sm btn-warning text-white">
                                            <FaPencil />
                                        </Link>
                                    </div>
                                    {/* Konten pendidikan */}
                                    <div className="mb-3">
                                        <label className="text-slate-500 text-xs">Nama Instansi</label>
                                        <div className="font-medium text-base mt-1">{data.pendidikan?.nama_instansi || '-'}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-slate-500 text-xs">Jenjang</label>
                                        <div className="font-medium text-base mt-1">{data.pendidikan?.jenjang || '-'}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-slate-500 text-xs">Jurusan</label>
                                        <div className="font-medium text-base mt-1">{data.pendidikan?.jurusan || '-'}</div>
                                    </div>
                                    <div>
                                        <label className="text-slate-500 text-xs">Ijazah</label>
                                        <div className="font-medium text-base mt-1">{data.pendidikan?.ijazah || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </Dashboard>
  );
};

export default IndexUserPegawai;
