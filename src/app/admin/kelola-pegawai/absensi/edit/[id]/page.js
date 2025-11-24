"use client";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useAbsensiFormEdit } from "@/app/hook/useAbsensiFormEdit";
import Dashboard from "@/app/layouts/AdminDashboard";
import SelectPegawai from "@/app/components/pegawai/SelectPegawai";
import Loading from "@/app/components/common/Loading";
import LinkButton from "@/app/components/common/LinkButton";
import { useParams } from "next/navigation";

const EditAbsensi = () => {
  const { id } = useParams();
  const { formData, error, loading, submitButton, options, handleChange, handleSubmit, handlePegawaiChange,handleNullJamPulang } = useAbsensiFormEdit(id);

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
            <div className="font-medium text-center text-lg">Edit Absensi Pegawai</div>
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
                  <SelectPegawai options={options} value={formData.id_pegawai} defaultValue={formData.id_pegawai} isEdit={true} onChange={handlePegawaiChange} />
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
                  <input
                    type="time"
                    id="jam_pulang"
                    className="form-control"
                    // If jam_pulang is null, display an empty string in the input
                    value={formData.jam_pulang || ""}
                    onChange={(e) => handleChange("jam_pulang", e)}
                    step="1"
                  />
                  {/* --- Button to trigger setting jam_pulang to null --- */}
                  <button
                    type="button" // Use type="button" to prevent form submission
                    onClick={handleNullJamPulang}
                    className="btn btn-sm btn-outline-secondary mt-2" // Example styling
                  >
                    Clear Jam Pulang
                  </button>
                  {/* --- End of button --- */}
                </div>
              </div>
              <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/absensi" title="Kembali" />
                <SubmitButton isSubmitting={submitButton} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default EditAbsensi;
