'use client';
import { useEffect, useState } from "react";
import AbsensiChart from "@/app/components/chart/AbsensiChart";
import GenderChart from "@/app/components/chart/GenderChart";
import MasaKerjaChart from "@/app/components/chart/MasaKerjaChart";
import UsiaPegawaiChart from "@/app/components/chart/UsiaPegawaiChart";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getDataDashboard } from "@/app/services/dashboardAdmin";

export default function Home() {
    const [cardDashboard, setCardDashboard] = useState([]);

    const fecthCardDashboard = async () => {
        const response = await getDataDashboard();
        console.log(response);
        setCardDashboard(response); 
    }

    useEffect(() => {
        fecthCardDashboard();
    },[])
  return (
    <Dashboard>
      <div className="content">
          <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                  <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 mt-8">
                          <div className="intro-y flex items-center h-10">
                              <h1 className="text-2xl font-medium truncate mr-5 mb-3">
                                  Dashboard Admin
                              </h1>
                          </div>
                          <div className="grid grid-cols-12 gap-6 mt-5">
                              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                  <div className="report-box zoom-in">
                                      <div className="box p-5">
                                          <div className="text-3xl font-medium leading-8 mt-6">{cardDashboard.total_pegawai}</div>
                                          <div className="text-base text-slate-500 mt-1">Jumlah Pegawai</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                  <div className="report-box zoom-in">
                                      <div className="box p-5">
                                          <div className="text-3xl font-medium leading-8 mt-6">{cardDashboard.pegawai_baru}</div>
                                          <div className="text-base text-slate-500 mt-1">Pegawai Baru</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                  <div className="report-box zoom-in">
                                      <div className="box p-5">
                                          <div className="text-3xl font-medium leading-8 mt-6">{cardDashboard.persen_kehadiran}</div>
                                          <div className="text-base text-slate-500 mt-1">Absensi hari ini</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                  <div className="report-box zoom-in">
                                      <div className="box p-5">
                                          <div className="text-3xl font-medium leading-8 mt-6">{cardDashboard.cuti_hari_ini}</div>
                                          <div className="text-base text-slate-500 mt-1">Cuti hari ini</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6 mt-8">
                          <div className="intro-y block sm:flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Absensi Report
                              </h2>
                          </div>
                          <div className="intro-y box p-5 mt-12 sm:mt-5">
                              <div className="flex flex-col md:flex-row md:items-center">
                                  <div className="flex">
                                      <div>
                                          <div className="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">95%</div>
                                          <div className="mt-0.5 text-slate-500">Bulan Ini</div>
                                      </div>
                                      <div className="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"></div>
                                      <div>
                                          <div className="text-slate-500 text-lg xl:text-xl font-medium">93%</div>
                                          <div className="mt-0.5 text-slate-500">Bulan Lalu</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="report-chart">
                                  <div className="h-[275px]">
                                      <AbsensiChart/>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6 mt-8">
                          <div className="intro-y flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Rata Rata masa kerja
                              </h2>
                          </div>
                          <div className="intro-y box p-5 mt-5">
                              <div className="mt-3">
                                  <div className="h-[275px]">
                                      <MasaKerjaChart/>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6 mt-4">
                          <div className="intro-y flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Usia Pegawai
                              </h2>
                          </div>
                          <div className="intro-y box p-5 mt-5">
                              <div className="mt-3">
                                  <div className="h-[275px]">
                                      <UsiaPegawaiChart/>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6 mt-4">
                          <div className="intro-y flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Jenis Kelamin Pegawai
                              </h2>
                          </div>
                          <div className="intro-y box p-5 mt-5">
                              <div className="mt-3">
                                  <div className="h-[275px]">
                                      <GenderChart/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Dashboard>
  );
}
