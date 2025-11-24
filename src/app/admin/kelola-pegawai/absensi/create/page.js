"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import SelectPegawai from "@/app/components/pegawai/SelectPegawai";
import { useAbsensiFormCreate } from "@/app/hook/useAbsensiFormCreate";
import Dashboard from "@/app/layouts/AdminDashboard";

const CreateAbsensi = () => {
  const { formData, error, loading, submitButton, options, handleChange, handleSubmit, handlePegawaiChange } = useAbsensiFormCreate();
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
            <div className="font-medium text-center text-lg">Tambah Absensi Pegawai</div>
            <div className="text-slate-500 text-center mt-2">Info absensi pegawai</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_absen" className="form-label">
                    Tanggal Absen
                  </label>
                  <input id="tanggal_absen" type="date" className="form-control" name="tanggal_absen" value={formData.tanggal_absen} onChange={(e) => handleChange("tanggal_absen", e)} required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_pegawai" className="form-label">
                    Nama Pegawai
                  </label>
                  <SelectPegawai options={options} value={formData.id_pegawai} onChange={handlePegawaiChange} isEdit={false} defaultValue={null} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="jam_masuk" className="form-label">
                    Jam Masuk
                  </label>
                  <input type="time" id="jam_masuk" className="form-control" value={formData.jam_masuk} onChange={(e) => handleChange("jam_masuk", e)} step="1" required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="jam_pulang" className="form-label">
                    Jam Pulang
                  </label>
                  <input type="time" id="jam_pulang" className="form-control" value={formData.jam_pulang} onChange={(e) => handleChange("jam_pulang", e)} step="1" />
                </div>
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                  <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/absensi" title="Kembali" />
                  <SubmitButton isSubmitting={submitButton} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CreateAbsensi;
