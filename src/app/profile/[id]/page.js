"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useProfileFormEdit } from "@/app/hook/useProfileFormEdit";
import UserDashboard from "@/app/layouts/UserDashboard";
import { useParams } from "next/navigation";

const EditProfile = () => {
  const { id } = useParams(); // Ambil id dari query
  const { formData, error, isLoading, submitButton, handleChange, handleFileChange, handleSubmit } = useProfileFormEdit(id);

  if (isLoading) {
    return (
      <UserDashboard>
        <Loading />
      </UserDashboard>
    );
  }

  return (
    <UserDashboard>
      <div className="content">
        <div className="intro-y box py-5 sm:py-10 mt-5">
          <div className="px-5 my-10">
            <div className="font-medium text-center text-lg">Edit Profile</div>
            <div className="text-slate-500 text-center mt-2">Info profile</div>
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
                  <label htmlFor="tempat_lahir" className="form-label">
                    Tempat Lahir
                  </label>
                  <input id="tempat_lahir" type="text" className="form-control" placeholder="Tempat Lahir Anda" name="tempat_lahir" value={formData.tempat_lahir || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input id="email" type="email" className="form-control" placeholder="Email Anda" name="email" value={formData.email || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_lahir" className="form-label">
                    Tanggal Lahir
                  </label>
                  <input id="tanggal_lahir" type="date" className="form-control" placeholder="Tanggal Lahir Anda" name="tanggal_lahir" value={formData.tanggal_lahir || ""} onChange={handleChange} />
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
                  <label htmlFor="alamat" className="form-label">
                    Alamat
                  </label>
                  <textarea id="alamat" type="text" className="form-control" placeholder="Alamat Anda" name="alamat" cols={"5"} rows={"5"} value={formData.alamat || ""} onChange={handleChange}></textarea>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="avatar" className="form-label">
                    Avatar
                  </label>
                  <input id="avatar" type="file" className="form-control" name="avatar" onChange={handleFileChange} />
                </div>
              </div>
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                {/* <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/dashboard" title="Kembali" /> */}
                <SubmitButton isSubmitting={submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserDashboard>
  );
};

export default EditProfile;
