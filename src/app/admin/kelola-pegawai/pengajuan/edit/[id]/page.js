"use client";
import InputFile from "@/app/components/common/InputFile";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import SelectPegawai from "@/app/components/pegawai/SelectPegawai";
import { usePengajuanFormEdit } from "@/app/hook/usePengajuanFormEdit";
import Dashboard from "@/app/layouts/AdminDashboard";
import { DateRangePicker } from 'react-date-range';
import { useParams } from "next/navigation";
import LinkButton from "@/app/components/common/LinkButton";



const EditPengajuan = () => {
  const { id } = useParams();
  const { 
    formData,
    options,
    dateRange,
    loading,
    error,
    submitButton,
    filePreview,
    fileName,
    fileInputRef,
    handleChange,
    handleFileChange,
    clearFile,
    handleSubmit,
    handlePegawaiChange,
    handleDateChange,
   } = usePengajuanFormEdit(id);
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
            <div className="font-medium text-center text-lg">Edit Pengajuan Absensi Pegawai</div>
            <div className="text-slate-500 text-center mt-2">Info pengajuan absensi pegawai</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="tanggal_absen" className="form-label mb-3">
                    Tanggal Pengajuan Absen
                  </label>
                  <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[300px] max-w-[360px] mx-auto">
                      <DateRangePicker
                        editableDateInputs={true}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        showSelectionPreview={true}
                        months={1}
                        direction="vertical"
                      />
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="id_pegawai" className="form-label">
                    Nama Pegawai
                  </label>
                  <SelectPegawai options={options} value={formData.id_pegawai} defaultValue={formData.id_pegawai} isEdit={true} onChange={handlePegawaiChange} />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="jenis_izin" className="form-label">
                    Jenis Izin
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="sakit" 
                        name="jenis_izin" 
                        value="Sakit" 
                        checked={formData.jenis_izin === "Sakit"} 
                        onChange={(e) => handleChange("jenis_izin", e)} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required 
                      />
                      <label htmlFor="sakit" className="ml-2 text-sm text-gray-700">Sakit</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="izin" 
                        name="jenis_izin" 
                        value="Izin" 
                        checked={formData.jenis_izin === "Izin"} 
                        onChange={(e) => handleChange("jenis_izin", e)} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="izin" className="ml-2 text-sm text-gray-700">Izin</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="cuti" 
                        name="jenis_izin" 
                        value="Cuti" 
                        checked={formData.jenis_izin === "Cuti"} 
                        onChange={(e) => handleChange("jenis_izin", e)} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="cuti" className="ml-2 text-sm text-gray-700">Cuti</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="absen" 
                        name="jenis_izin" 
                        value="Absen" 
                        checked={formData.jenis_izin === "Absen"} 
                        onChange={(e) => handleChange("jenis_izin", e)} 
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="absen" className="ml-2 text-sm text-gray-700">Absen</label>
                    </div>
                  </div>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="keterangan" className="form-label">
                    Keterangan
                  </label>
                  <textarea id="keterangan" type="text" className="form-control" placeholder="Keterangan" name="keterangan" cols={"5"} rows={"6"} value={formData.keterangan} onChange={(e) => handleChange("keterangan", e)}></textarea>
                </div>
                {formData.jenis_izin === "Sakit" && (
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
                )}
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                  <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/kelola-pegawai/pengajuan" title="Kembali" />
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

export default EditPengajuan;
