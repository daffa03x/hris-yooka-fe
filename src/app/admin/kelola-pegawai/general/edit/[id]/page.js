"use client";
import InputFile from "@/app/components/common/InputFile";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useGeneralFormEdit } from "@/app/hook/useGeneralFormEdit";
import Dashboard from "@/app/layouts/AdminDashboard";
import { useParams } from "next/navigation";

const EditPegawai = () => {
  const { id } = useParams();
  const { 
    formData, 
    error, 
    isLoading, 
    submitButton, 
    filePreview,
    fileName,
    fileInputRef,
    handleChange,
    handleFileChange,
    clearFile,
    handleSubmit 
  } = useGeneralFormEdit(id);

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
            <div className="font-medium text-center text-lg">Edit Pegawai</div>
            <div className="text-slate-500 text-center mt-2">Info general pegawai</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nama_lengkap" className="form-label">
                    Nama Lengkap
                  </label>
                  <input id="nama_lengkap" type="text" className="form-control" placeholder="Nama Lengkap Anda" name="nama_lengkap" value={formData.nama_lengkap || ""} onChange={handleChange} />
                </div>

                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input id="email" type="email" className="form-control" placeholder="Email Anda" name="email" value={formData.email || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input id="password" type="password" className="form-control" placeholder="Password Anda" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="no_hp" className="form-label">
                    No Telepon
                  </label>
                  <input id="no_hp" type="text" className="form-control" placeholder="No Telepon Anda" name="no_hp" value={formData.no_hp || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nik" className="form-label">
                    NIK
                  </label>
                  <input id="nik" type="text" className="form-control" placeholder="NIK Anda" name="nik" value={formData.nik || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nip" className="form-label">
                    NIP
                  </label>
                  <input id="nip" type="text" className="form-control" placeholder="NIP Anda" name="nip" value={formData.nip || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="role" className="form-label">
                    Jabatan
                  </label>
                  <input id="role" type="text" className="form-control" placeholder="Jabatan Anda" name="role" value={formData.role || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_card" className="form-label">
                    ID Card
                  </label>
                  <input id="id_card" type="text" className="form-control" placeholder="ID Card" name="id_card" value={formData.id_card} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="lembaga" className="form-label">
                    Lembaga
                  </label>
                  <input id="lembaga" type="text" className="form-control" placeholder="Lembaga" name="lembaga" value={formData.lembaga} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="jenis_kelamin" className="form-label">
                    Gender
                  </label>
                  <div className="flex flex-col sm:flex-row mt-2">
                    <div className="form-check mr-10">
                      <input id="jenis_kelamin_laki" className="form-check-input" type="radio" value="L" name="jenis_kelamin" checked={formData.jenis_kelamin === "L"} onChange={handleChange} />
                      <label className="form-check-label" htmlFor="jenis_kelamin_laki">
                        Laki Laki
                      </label>
                    </div>
                    <div className="form-check mr-2 mt-2 sm:mt-0">
                      <input id="jenis_kelamin_perempuan" className="form-check-input" type="radio" value="P" name="jenis_kelamin" onChange={handleChange} checked={formData.jenis_kelamin === "P"} />
                      <label className="form-check-label" htmlFor="jenis_kelamin_perempuan">
                        Perempuan
                      </label>
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <div className="flex flex-col sm:flex-row mt-2">
                    <div className="form-check mr-10">
                      <input id="status_menikah" className="form-check-input" type="radio" value="Menikah" name="status" onChange={handleChange} checked={formData.status === "Menikah"} />
                      <label className="form-check-label" htmlFor="status_menikah">
                        Menikah
                      </label>
                    </div>
                    <div className="form-check mr-2 mt-2 sm:mt-0">
                      <input id="status_belum" className="form-check-input" type="radio" value="Belum Menikah" name="status" onChange={handleChange} checked={formData.status === "Belum Menikah"} />
                      <label className="form-check-label" htmlFor="status_belum">
                        Belum Menikah
                      </label>
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tempat_lahir" className="form-label">
                    Tempat Lahir
                  </label>
                  <input id="tempat_lahir" type="text" className="form-control" placeholder="Tempat Lahir Anda" name="tempat_lahir" value={formData.tempat_lahir || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_lahir" className="form-label">
                    Tanggal Lahir
                  </label>
                  <input id="tanggal_lahir" type="date" className="form-control" placeholder="Tanggal Lahir Anda" name="tanggal_lahir" value={formData.tanggal_lahir || ""} onChange={handleChange} />
                </div>
              </div>
              <div className="intro-y col-span-12 sm:col-span-6 mt-3">
                <label htmlFor="alamat" className="form-label">
                  Alamat
                </label>
                <textarea id="alamat" type="text" className="form-control" placeholder="Alamat Anda" name="alamat" cols={"5"} rows={"5"} value={formData.alamat || ""} onChange={handleChange}></textarea>
              </div>
              <div className="intro-y col-span-12 sm:col-span-6">
                <InputFile
                  label="Upload Surat Sakit"
                  name="upload_surat_sakit"
                  filePreview={filePreview}
                  fileName={fileName}
                  fileInputRef={fileInputRef}
                  handleFileChange={handleFileChange}
                  clearFile={clearFile}
                />
              </div>
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/general" title="Kembali" />
                <SubmitButton isSubmitting={submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default EditPegawai;
