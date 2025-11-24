"use client";

import Loading from "@/app/components/common/Loading";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getIdentitasPendidikanById } from "@/app/services/recruitmentIdentitas";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RiwayatPendidikan = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await getIdentitasPendidikanById(id);
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
        <h2 className="intro-y text-lg font-medium mt-10">Data Identitas Riwayat Pendidikan</h2>
        <div className="intro-y box mt-5">
          <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <h2 className="font-medium text-base mr-auto">{data.nama_lengkap}</h2>
          </div>
          {data.riwayat_pendidikan !== null ? (
          <div className="p-5">
            <div className="preview">
              <p className="py-2">
                <strong>Sekolah Dasar : </strong>
                {data.riwayat_pendidikan.sd}
              </p>
              <p className="py-2">
                <strong>Tahun Lulus SD : </strong>
                {data.riwayat_pendidikan.tahun_lulus_sd}
              </p>
              <p className="py-2">
                <strong>Sekolah Menengah Pertama : </strong>
                {data.riwayat_pendidikan.smp}
              </p>
              <p className="py-2">
                <strong>Tahun Lulus SMP : </strong>
                {data.riwayat_pendidikan.tahun_lulus_smp}
              </p>
              <p className="py-2">
                <strong>Sekolah Menengah Atas : </strong>
                {data.riwayat_pendidikan.sma}
              </p>
              <p className="py-2">
                <strong>Tahun Lulus SMA : </strong>
                {data.riwayat_pendidikan.tahun_lulus_sma}
              </p>
              <p className="py-2">
                <strong>Universitas : </strong>
                {data.riwayat_pendidikan.universitas}
              </p>
              <p className="py-2">
                <strong>Jurusan : </strong>
                {data.riwayat_pendidikan.jurusan}
              </p>
              <p className="py-2">
                <strong>Tahun Lulus Universitas : </strong>
                {data.riwayat_pendidikan.tahun_lulus_universitas}
              </p>
              <p className="py-2">
                <strong>Pendidikan Non Formal : </strong>
                {data.riwayat_pendidikan.riwayat_pendidikan_non_formal}
              </p>
            </div>
          </div>
          ) : (
            <p className="p-5 text-center">Data riwayat pendidikan tidak ditemukan</p>
          )}
        </div>
        <Link className="btn btn-primary mt-5" href="/admin/rekrutment/identitas">
          Back
        </Link>
      </div>
    </Dashboard>
  );
};

export default RiwayatPendidikan;
