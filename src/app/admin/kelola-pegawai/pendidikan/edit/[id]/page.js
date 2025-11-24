"use client";
import Dashboard from "@/app/layouts/AdminDashboard";
import SubmitButton from "@/app/components/common/SubmitButton";
import Loading from "@/app/components/common/Loading";
import { usePendidikanEditForm } from "@/app/hook/usePendidikanEditForm";
import SelectPegawai from "@/app/components/pegawai/SelectPegawai";
import { useParams } from "next/navigation";
import LinkButton from "@/app/components/common/LinkButton";
import InputFile from "@/app/components/common/InputFile";

const EditPendidikan = () => {
  const { id } = useParams();
  const { formData, error, loading, submitButton, options, handleChange, handleSubmit, handleFileChange, handlePegawaiChange } = usePendidikanEditForm(id);
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
            <div className="font-medium text-center text-lg">Edit Pendidikan Pegawai</div>
            <div className="text-slate-500 text-center mt-2">Info pendidikan pegawai</div>
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
                  <label htmlFor="id_pegawai" className="form-label">
                    Nama Pegawai
                  </label>
                  <SelectPegawai options={options} value={formData.id_pegawai} defaultValue={formData.id_pegawai} isEdit={true} onChange={handlePegawaiChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="jurusan" className="form-label">
                    Jurusan
                  </label>
                  <input id="jurusan" type="text" className="form-control" placeholder="Jurusan" name="jurusan" value={formData.jurusan} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
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
              <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 sm:col-span-6">
                <InputFile
                    label="Upload Ijazah"
                    name="ijazah"
                    handleFileChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/pendidikan" title="Kembali" />
                <SubmitButton isSubmitting={submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default EditPendidikan;
