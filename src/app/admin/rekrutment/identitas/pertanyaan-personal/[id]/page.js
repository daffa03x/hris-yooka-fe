"use client";

import Loading from "@/app/components/common/Loading";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getIdentitasPertanyaanById } from "@/app/services/recruitmentIdentitas";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PertanyaanPersonal = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getIdentitasPertanyaanById(id);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
        <h2 className="intro-y text-lg font-medium mt-10">Data Identitas Pertanyaan Personal</h2>
        <div className="intro-y box mt-5">
          <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <h2 className="font-medium text-base mr-auto">{data.nama_lengkap}</h2>
          </div>
          {data.pertanyaan_personal !== null ? (
          <div className="p-5">
            <div className="preview">
              <p className="py-2">
                <strong>Mengapa Anda tertarik mendaftar di lembaga kami ? </strong>
                {data.pertanyaan_personal.mengapa_tertarik_bergabung}
              </p>
              <p className="py-2">
                <strong>Apa yang Anda ketahui tentang jobdesk dari posisi yang Anda lamar di lembaga Kami ? </strong>
                {data.pertanyaan_personal.diketahui_tentang_jobdesk}
              </p>
              <p className="py-2">
                <strong>Apa yang Anda bayangkan tentang lembaga Kami ? </strong>
                {data.pertanyaan_personal.bayangkan_tentang_perusahaan}
              </p>
              <p className="py-2">
                <strong>Jelaskan tentang diri Anda, mengapa Kami harus menerima Anda di lembaga kami ? </strong>
                {data.pertanyaan_personal.tentang_diri_anda}
              </p>
              <p className="py-2">
                <strong>Siap bekerja paling cepat pada tanggal ? </strong>
                {data.pertanyaan_personal.siap_bekerja}
              </p>
              <p className="py-2">
                <strong>CV : </strong>
                {data.pertanyaan_personal.cv}
              </p>
              <p className="py-2">
                <strong>Portofolio : </strong>
                {data.pertanyaan_personal.portofolio}
              </p>
              <p className="py-2">
                <strong>Perkiraan gaji yang Anda harapkan : </strong>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data.pertanyaan_personal.perkiraan_gaji_diharapkan)}
              </p>
            </div>
          </div>
          ) : (
            <p className="p-5 text-center">Data pertanyaan personal tidak ditemukan</p>
          )}
        </div>
        <Link className="btn btn-primary mt-5" href="/admin/rekrutment/identitas">
          Back
        </Link>
      </div>
    </Dashboard>
  );
};

export default PertanyaanPersonal;
