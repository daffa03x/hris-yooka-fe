"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import SelectPegawai from "@/app/components/pegawai/SelectPegawai";
import { useKontrakFormCreate } from "@/app/hook/useKontrakFormCreate";
import Dashboard from "@/app/layouts/AdminDashboard";

const CreateKontrak = () => {
  const { formData, error, loading, submitButton, options, handleChange, handleSubmit, handlePegawaiChange } = useKontrakFormCreate();
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
            <div className="font-medium text-center text-lg">Tambah Kontrak Pegawai</div>
            <div className="text-slate-500 text-center mt-2">Info kontrak pegawai</div>
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
                  <label htmlFor="id_pegawai" className="form-label">
                    Nama Pegawai
                  </label>
                  <SelectPegawai options={options} value={formData.id_pegawai} onChange={handlePegawaiChange} isEdit={false} defaultValue={null} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_akhir" className="form-label">
                    Tanggal Akhir
                  </label>
                  <input id="tanggal_akhir" type="date" className="form-control" placeholder="Tanggal Akhir" name="tanggal_akhir" value={formData.tanggal_akhir} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                  <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/kontrak" title="Kembali" />
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

export default CreateKontrak;
