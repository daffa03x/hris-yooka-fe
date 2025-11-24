"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import SelectPegawai from "@/app/components/pegawai/SelectPegawai";
import { useKontakFormCreate } from "@/app/hook/useKontakFormCreate";
import Dashboard from "@/app/layouts/AdminDashboard";

const CreateKontak = () => {
  const { formData, error, isLoading, submitButton, options, handleChange, handleSubmit, handlePegawaiChange } = useKontakFormCreate();

  if (isLoading) {
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
            <div className="font-medium text-center text-lg">Tambah Kontak Darurat Pegawai</div>
            <div className="text-slate-500 text-center mt-2">Info kontak darurat pegawai</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl my-4">Kontak Pertama</h2>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nama_kontak_pertama" className="form-label">
                    Nama Kontak Pertama
                  </label>
                  <input id="nama_kontak_pertama" type="text" className="form-control" placeholder="Nama Kontak Pertama" name="nama_kontak_pertama" value={formData.nama_kontak_pertama} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_pegawai" className="form-label">
                    Nama Pegawai
                  </label>
                  <SelectPegawai options={options} value={formData.id_pegawai} onChange={handlePegawaiChange} isEdit={false} defaultValue={null} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="no_hp_kontak_pertama" className="form-label">
                    No Telepon Kontak Pertama
                  </label>
                  <input id="no_hp_kontak_pertama" type="text" className="form-control" placeholder="No Telepon Kontak Pertama" name="no_hp_kontak_pertama" value={formData.no_hp_kontak_pertama} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
              </div>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div></div>
                <div></div>
              </div>
              <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                <label htmlFor="pilihan_kontak_ayah" className="form-label">
                  Hubungan Kontak Pertama
                </label>
                <div className="flex flex-col sm:flex-row mt-2">
                  <div className="form-check mr-5">
                    <input id="pilihan_kontak_ayah" className="form-check-input" type="radio" value="Ayah" name="pilihan_kontak_pertama" checked={formData.pilihan_kontak_pertama === "Ayah"} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_ayah">
                      Ayah
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_ibu" className="form-check-input" type="radio" value="Ibu" name="pilihan_kontak_pertama" onChange={handleChange} checked={formData.pilihan_kontak_pertama === "Ibu"} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_ibu">
                      Ibu
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_suami" className="form-check-input" type="radio" value="Suami" name="pilihan_kontak_pertama" onChange={handleChange} checked={formData.pilihan_kontak_pertama === "Suami"} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_suami">
                      Suami
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_istri" className="form-check-input" type="radio" value="Istri" name="pilihan_kontak_pertama" onChange={handleChange} checked={formData.pilihan_kontak_pertama === "Istri"} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_istri">
                      Istri
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_lainnya" className="form-check-input" type="radio" value="Lainnya" name="pilihan_kontak_pertama" onChange={handleChange} checked={!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_pertama)} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_lainnya">
                      Lainnya
                    </label>
                  </div>
                  {!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_pertama) && (
                    <div className="mt-2 sm:mt-0 ml-0 sm:ml-5">
                      <input type="text" className="form-control" placeholder="Sebutkan hubungan" name="kontak_pertama_lainnya" value={formData.kontak_pertama_lainnya || ""} onChange={handleChange} />
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-2xl mt-8 mb-8">Kontak Kedua</h2>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nama_kontak_kedua" className="form-label">
                    Nama Kontak Kedua
                  </label>
                  <input id="nama_kontak_kedua" type="text" className="form-control" placeholder="Nama Kontak Kedua" name="nama_kontak_kedua" value={formData.nama_kontak_kedua} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="no_hp_kontak_kedua" className="form-label">
                    No Telepon Kontak Kedua
                  </label>
                  <input id="no_hp_kontak_kedua" type="text" className="form-control" placeholder="No Telepon Kontak Kedua" name="no_hp_kontak_kedua" value={formData.no_hp_kontak_kedua} onChange={handleChange} />
                </div>
              </div>
              <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                <label htmlFor="pilihan_kontak_ayah" className="form-label">
                  Hubungan Kontak Kedua
                </label>
                <div className="flex flex-col sm:flex-row mt-2">
                  <div className="form-check mr-5">
                    <input id="pilihan_kontak_ayah" className="form-check-input" type="radio" value="Ayah" name="pilihan_kontak_kedua" checked={formData.pilihan_kontak_kedua === "Ayah"} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_ayah">
                      Ayah
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_ibu" className="form-check-input" type="radio" value="Ibu" name="pilihan_kontak_kedua" onChange={handleChange} checked={formData.pilihan_kontak_kedua === "Ibu"} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_ibu">
                      Ibu
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_suami" className="form-check-input" type="radio" value="Suami" name="pilihan_kontak_kedua" onChange={handleChange} checked={formData.pilihan_kontak_kedua === "Suami"} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_suami">
                      Suami
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_istri" className="form-check-input" type="radio" value="Istri" name="pilihan_kontak_kedua" onChange={handleChange} checked={formData.pilihan_kontak_kedua === "Istri"} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_istri">
                      Istri
                    </label>
                  </div>
                  <div className="form-check mr-5 mt-2 sm:mt-0">
                    <input id="pilihan_kontak_lainnya" className="form-check-input" type="radio" value="Lainnya" name="pilihan_kontak_kedua" onChange={handleChange} checked={!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_kedua)} />
                    <label className="form-check-label" htmlFor="pilihan_kontak_lainnya">
                      Lainnya
                    </label>
                  </div>
                  {!["Ayah", "Ibu", "Suami", "Istri"].includes(formData.pilihan_kontak_kedua) && (
                    <div className="mt-2 sm:mt-0 ml-0 sm:ml-5">
                      <input type="text" className="form-control" placeholder="Sebutkan hubungan" name="kontak_kedua_lainnya" value={formData.kontak_kedua_lainnya || ""} onChange={handleChange} />
                    </div>
                  )}
                </div>
              </div>
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/kontak" title="Kembali" />
                <SubmitButton isSubmitting={submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CreateKontak;
