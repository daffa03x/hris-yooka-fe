"use client";
// import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import { useForm, useFieldArray } from "react-hook-form";
import Dashboard from "@/app/layouts/AdminDashboard";
import { storeRecruitmentLowongan } from "@/app/services/recruitmentLowongan";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LinkButton from "@/app/components/common/LinkButton";

const CreateLowongan = () => {
  const router = useRouter();
  const [submitButton, setSubmitButton] = useState(false);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      nama_lowongan: "",
      fields_qualification: [{ value: "" }],
      fields_responsibility: [{ value: "" }],
    },
  });

  const {
    fields: qualificationFields,
    append: addQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "fields_qualification",
  });

  const {
    fields: responsibilityFields,
    append: addResponsibility,
    remove: removeResponsibility,
  } = useFieldArray({
    control,
    name: "fields_responsibility",
  });

  const onSubmit = async (data) => {
    try {
      setSubmitButton(true);
      const response = await storeRecruitmentLowongan(data);
      if (response && response.data) {
        localStorage.setItem("successMessage", "Data berhasil disimpan");
        router.push("/admin/rekrutment/lowongan");
      }
    } catch (err) {
      console.error("Kesalahan saat menyimpan data:", err);
    } finally {
      setSubmitButton(false);
    }
  };

  return (
    <Dashboard>
      <div className="content">
        <div className="intro-y box py-5 sm:py-10 mt-5">
          <div className="px-5 my-10">
            <div className="font-medium text-center text-lg">Tambah Lowongan</div>
            <div className="text-slate-500 text-center mt-2">Info lowongan</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            {/* {error && <div className="text-red-500 mb-4">{error}</div>} */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="nama_lowongan" className="form-label">
                    Lowongan
                  </label>
                  <input {...register("nama_lowongan")} className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300" required />
                </div>
                <div className="intro-y col-span-12 sm:col-span-6"></div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="qualification" className="form-label">
                    Kualifikasi
                  </label>
                  {qualificationFields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 mb-2">
                      <textarea {...register(`fields_qualification.${index}.value`)} placeholder="Kualifikasi" className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 resize-none h-24" />
                      <button type="button" className="ml-3 btn btn-danger text-sm" onClick={() => removeQualification(index)}>
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-success text-white text-sm" onClick={() => addQualification({ value: "" })}>
                    Tambah
                  </button>
                </div>
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="responsibility" className="form-label">
                    Tanggung Jawab
                  </label>
                  {responsibilityFields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 mb-2">
                      <textarea {...register(`fields_responsibility.${index}.value`)} placeholder="Tanggung Jawab" className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 resize-none h-24" />
                      <button type="button" onClick={() => removeResponsibility(index)} className="ml-3 btn btn-danger text-sm">
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-success text-white text-sm" onClick={() => addResponsibility({ value: "" })}>
                    Tambah
                  </button>
                </div>
                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                  <LinkButton classNameLink="btn btn-secondary mr-2" classNameLoading="btn btn-secondary mr-2" link="/admin/rekrutment/lowongan" title="Kembali" />
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

export default CreateLowongan;
