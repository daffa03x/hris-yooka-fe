"use client";
import LinkButton from "@/app/components/common/LinkButton";
import Loading from "@/app/components/common/Loading";
import SelectReact from "@/app/components/common/Select";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useAssetAssignmentFormCreate } from "@/app/hook/useAssetAssignmentFormCreate";
import Dashboard from "@/app/layouts/AdminDashboard";

const CreateAssetAssignment = () => {
  const { formData, error, loading, submitButton, pegawai, asset, handleChange, handleSubmit, handleAssetChange, handlePegawaiChange } = useAssetAssignmentFormCreate();
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
            <div className="font-medium text-center text-lg">Tambah Peminjaman Asset</div>
            <div className="text-slate-500 text-center mt-2">Info asset assignment</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_pegawai" className="form-label">
                    Pegawai
                  </label>
                  <SelectReact name="id_pegawai" options={pegawai} value={formData.id_pegawai} onChange={handlePegawaiChange} isEdit={false} defaultValue={null} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_asset" className="form-label">
                    Asset
                  </label>
                  <SelectReact name="id_asset" options={asset} value={formData.id_asset} onChange={handleAssetChange} isEdit={false} defaultValue={null} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_peminjaman" className="form-label">
                    Tanggal Peminjaman
                  </label>
                  <input type="date" id="tanggal_peminjaman" className="form-control" value={formData.tanggal_peminjaman} onChange={(e) => handleChange("tanggal_peminjaman", e)} step="1" required />
                </div>
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                  <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/inventaris/asset-assignment" title="Kembali" />
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

export default CreateAssetAssignment;
