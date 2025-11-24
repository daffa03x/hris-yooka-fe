"use client";
import LinkButton from "@/app/components/common/LinkButton";
import SubmitButton from "@/app/components/common/SubmitButton";
import { usePegawaiNationalFormCreate } from "@/app/hook/usePegawaiNationalFormCreate";
import Dashboard from "@/app/layouts/AdminDashboard";

const CreateHariNasional = () => {
  const { 
    formData, 
    error, 
    submitButton,
    handleChange,
    handleSubmit, 
  } = usePegawaiNationalFormCreate();
  return (
    <Dashboard>
      <div className="content">
        <div className="intro-y box py-5 sm:py-10 mt-5">
          <div className="px-5 my-10">
            <div className="font-medium text-center text-lg">Tambah Hari Nasional</div>
            <div className="text-slate-500 text-center mt-2">Info hari nasional</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="name" className="form-label">
                    Hari Nasional
                  </label>
                  <input id="name" type="text" className="form-control" placeholder="Hari Nasional" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="date" className="form-label">
                    Tanggal
                  </label>
                  <input id="date" type="date" className="form-control" placeholder="Tanggal" name="date" value={formData.date} onChange={handleChange} />
                </div>
              </div>
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-6">
                <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/hari-nasional" title="Kembali" />
                <SubmitButton isSubmitting={submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CreateHariNasional;
