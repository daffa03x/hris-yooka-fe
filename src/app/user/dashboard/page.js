import AbsensiChart from "@/app/components/chart/AbsensiChart";
import UserDashboard from "@/app/layouts/UserDashboard";

export default function Home() {
  return (
    <UserDashboard>
      <div className="content">
          <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                  <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12 mt-8">
                          <div className="intro-y flex items-center h-10">
                              <h1 className="text-2xl font-medium truncate mr-5 mb-3">
                                  Dashboard
                              </h1>
                          </div>
                      </div>
                      <div className="col-span-12 lg:col-span-6">
                          <div className="intro-y block sm:flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Absensi Pegawai
                              </h2>
                          </div>
                          <div className="intro-y box p-5 mt-5">
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
                      <div className="col-span-12 lg:col-span-6">
                          <div className="intro-y block sm:flex items-center h-10">
                              <h2 className="text-lg font-medium truncate mr-5">
                                  Ringkasan Cuti
                              </h2>
                          </div>
                          <div className="intro-y box p-5 mt-5">
                              <div className="report-chart">
                                  <div className="h-[275px]">
                                      <AbsensiChart/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </UserDashboard>
  );
}
