"use client";
import LinkButton from "@/app/components/common/LinkButton";
import SubmitButton from "@/app/components/common/SubmitButton";
import { usePasswordFormEdit } from "@/app/hook/usePasswordFormEdit";
import UserDashboard from "@/app/layouts/UserDashboard";
import { useParams } from "next/navigation";

const EditPassword = () => {
  const { id } = useParams(); // Ambil id dari query
  const { formData, error, submitButton, handleChange, handleSubmit } = usePasswordFormEdit(id);

  return (
    <UserDashboard>
      <div className="content">
        <div className="intro-y box py-5 sm:py-10 mt-5">
          <div className="px-5 my-10">
            <div className="font-medium text-center text-lg">Edit Password</div>
            <div className="text-slate-500 text-center mt-2">Info edit password</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="password" className="form-label">
                    Password Baru
                  </label>
                  <input id="password" type="password" className="form-control" placeholder="Password Baru" name="password" value={formData.password || ""} onChange={handleChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="password_confirm" className="form-label">
                    Konfirmasi Password
                  </label>
                  <input id="password_confirm" type="password" className="form-control" placeholder="Konfirmasi Password" name="password_confirm" value={formData.password_confirm || ""} onChange={handleChange} />
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

export default EditPassword;
