"use client";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Dashboard from "@/app/layouts/AdminDashboard";
import { getRecruitmentLowonganById, updateRecruitmentLowongan } from "@/app/services/recruitmentLowongan";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/components/common/Loading";
import SubmitButton from "@/app/components/common/SubmitButton";
import LinkButton from "@/app/components/common/LinkButton";

const EditLowongan = ({ dataEdit }) => {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _method: "put",
      nama_lowongan: "",
      fields_responsibility: [{ value: "" }],
      fields_qualification: [{ value: "" }],
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

  useEffect(() => {
    if (dataEdit) {
      reset(dataEdit);
    } else {
      fetchDataById();
    }
  }, [dataEdit]);

  const fetchDataById = async () => {
    setLoading(true);
    const response = await getRecruitmentLowonganById(id);
    if (response?.data) {
      // Format the data correctly for field arrays
      const formattedData = {
        nama_lowongan: response.data.nama_lowongan,
        // Make sure the field arrays are properly formatted
        fields_qualification: response.data.qualification?.length ? response.data.qualification.map((item) => ({ value: item.field_value, id: item.id })) : [{ value: "" }],
        fields_responsibility: response.data.responsibility?.length ? response.data.responsibility.map((item) => ({ value: item.field_value, id: item.id })) : [{ value: "" }],
      };
      reset(formattedData);
    }
    setLoading(false);
  };

  const onSubmit = async (dataEdit) => {
    try {
      setSubmitButton(true);
      //   console.log(dataEdit);
      const response = await updateRecruitmentLowongan(id, dataEdit);
      console.log(response);
      if (response && response.data) {
        localStorage.setItem("successMessage", "Data berhasil diubah");
        router.push("/admin/rekrutment/lowongan");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitButton(false);
    }
  };

  if (loading) {
    return (
      <Dashboard>
        <div className="content">
          <div className="intro-y box py-5 sm:py-10 mt-5">
            <Loading />
          </div>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div className="content">
        <div className="intro-y box py-5 sm:py-10 mt-5">
          <div className="px-5 my-10">
            <div className="font-medium text-center text-lg">Edit Lowongan</div>
            <div className="text-slate-500 text-center mt-2">Info lowongan</div>
          </div>
          <div className="px-5 sm:px-20 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                {/* Nama Lowongan */}
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label className="block mb-1">Nama Lowongan</label>
                  <input {...register("_method")} defaultValue="put" className="hidden" />
                  <input {...register("nama_lowongan", { required: "Nama Lowongan wajib diisi" })} className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300" placeholder="Nama Lowongan" />
                  {errors.nama_lowongan && <p className="text-red-500 text-sm">{errors.nama_lowongan.message}</p>}
                </div>

                <div className="intro-y col-span-12 sm:col-span-6"></div>

                {/* Qualifications */}
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

                {/* Responsibilities */}
                <div className="intro-y col-span-12 sm:col-span-6">
                  <label htmlFor="responsibility" className="form-label">
                    Tanggung Jawab
                  </label>
                  {responsibilityFields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2 mb-2">
                      <textarea {...register(`fields_responsibility.${index}.value`, { required: "Tanggung Jawab wajib diisi" })} placeholder="Tanggung Jawab" className="block w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 resize-none h-24" />
                      <button type="button" onClick={() => removeResponsibility(index)} className="ml-3 btn btn-danger text-sm">
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addResponsibility({ value: "" })} className="btn btn-success text-white text-sm">
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

export default EditLowongan;
