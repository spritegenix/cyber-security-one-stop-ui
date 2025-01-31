"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/elements/Input";
import MultiSelect from "@/components/elements/multiInput/MultiSelect";
import Button from "@/components/elements/Button";
import { FaBuildingColumns } from "react-icons/fa6";
import { languageProficiencyIndia } from "@/data/global";
import { FaRegCheckCircle } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { professionalDetailsSchema } from "./zodSchema";
import { useMutationBusinessDetails } from "@/app/_queryCall/businessAuth/csr";
import { useFetchAllCategories } from "@/app/_queryCall/csr";
import MultiInputWithStringInput from "@/components/elements/multiInput/MultiInputwithStringInput";

type ProfessionalDetailsFormValues = z.infer<typeof professionalDetailsSchema>;

export default function ProfessionalDetailsForm({ data, refetchData }: any) {
  const { handleUpdate, data: mutationResult, loading, error } = useMutationBusinessDetails();
  const { allCategoriesList } = useFetchAllCategories();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfessionalDetailsFormValues>({
    resolver: zodResolver(professionalDetailsSchema),
  });

  const practiceAreas = watch("practiceAreas") || [];
  const practiceCourts = watch("practiceCourts") || [];
  const languageProficiency = watch("languageProficiency") || [];
  const academicDegree = watch("academicDegree") || [];

  // Update Default form values coming from backend
  useEffect(() => {
    if (data) {
      // console.log(data, "BasicInformationForm");
      reset({
        ...data,
        registrationNumber: data?.businessDetails?.registrationNumber || "",
        licenseNumber: data?.businessDetails?.license || "",
        yearsOfExperience: data?.businessDetails?.experience?.toString() || "",
        teamSize: data?.businessDetails?.teamSize?.toString() || "",
        practiceCourts:
          data?.businessDetails?.courts?.map((item: any) => ({
            id: item?.id || "",
            name: item?.name,
          })) || [],
        practiceAreas:
          (data?.businessDetails?.categories.length > 0 &&
            data?.businessDetails?.categories?.map((item: any) => ({
              id: item?.id,
              name: item?.name,
            }))) ||
          [],
        academicDegree:
          (data?.businessDetails?.degrees.length > 0 &&
            data?.businessDetails?.degrees?.map((degree: any) => degree)) ||
          [],
        languageProficiency:
          data?.businessDetails?.languages?.map((item: any) => ({
            id: item?.id || "",
            name: item?.name,
          })) || [],
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: ProfessionalDetailsFormValues) => {
    // console.log("Form submitted:", formData);
    // console.log(errors);
    try {
      await handleUpdate({
        registrationNumber: formData.registrationNumber,
        license: formData.licenseNumber,
        experience: Number(formData.yearsOfExperience),
        teamSize: Number(formData.teamSize),
        categoryIds:
          formData.practiceAreas?.map((item: { id: string; name: string }) => item?.id) || [],
        courts:
          formData.practiceCourts?.map((item: { id: string; name: string }) => item?.name) || [],
        degrees: formData.academicDegree,
        languages:
          formData.languageProficiency?.map((item: { id: string; name: string }) => item?.name) ||
          [],
        addresses: [],
      });
      refetchData();
      // console.log("Update successful");
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="mb-5 text-2xl font-semibold">Professional Details</h2>
      {/* Registration Number  */}
      <div>
        <Input {...register("registrationNumber")} label="Registration Number" placeholder=" " />
        {errors.registrationNumber && (
          <p className="text-xs text-red-500">{errors.registrationNumber.message}</p>
        )}
      </div>
      {/* License/Bar Number  */}
      <div>
        <Input {...register("licenseNumber")} label="GST Number (If Indian)" placeholder=" " />
        {errors.licenseNumber && (
          <p className="text-xs text-red-500">{errors.licenseNumber.message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Years of Experience  */}
        <div>
          <Input {...register("yearsOfExperience")} label="Years of Experience" placeholder=" " />
          {errors.yearsOfExperience && (
            <p className="text-xs text-red-500">{errors.yearsOfExperience.message}</p>
          )}
        </div>
        {/* Team Size  */}
        <div>
          <Input {...register("teamSize")} label="Team Size" placeholder=" " />
          {errors.teamSize && <p className="text-xs text-red-500">{errors.teamSize.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
        {/* Service Areas  */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Service Areas</h3>
          <MultiSelect
            options={
              !!allCategoriesList?.length
                ? allCategoriesList?.map((item: any) => ({ id: item?.id, name: item?.name }))
                : []
            }
            selectedOptions={practiceAreas || []}
            setSelectedOptions={(value) => setValue("practiceAreas", value)}
            leftIcon={
              <span>
                <FaBuildingColumns />
              </span>
            }
          />
          {errors?.practiceAreas && (
            <p className="text-xs text-red-500">{errors.practiceAreas?.message}</p>
          )}
        </div>
        {/* Practice Courts */}
        {/* <div>
          <h3 className="mb-5 text-lg font-semibold">Practice Courts</h3>
          <MultiSelect
            options={courtTypes?.map((item) => ({ id: item, name: item }))}
            selectedOptions={practiceCourts}
            setSelectedOptions={(value) => setValue("practiceCourts", value)}
            leftIcon={
              <span>
                <VscLaw />
              </span>
            }
          />
          {errors?.practiceCourts && (
            <p className="text-xs text-red-500">{errors.practiceCourts?.message}</p>
          )}
        </div> */}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold">Certifications</h3>
          <MultiInputWithStringInput
            label="Add Certifications"
            inputArray={academicDegree}
            setInputArray={(value) => setValue("academicDegree", value)}
            leftIcon={<PiStudentBold className="text-gray-800" />}
            errors={errors?.academicDegree || undefined}
          />
        </div>
        {/* Language Proficiency  */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Language Proficiency</h3>
          <MultiSelect
            options={
              !!languageProficiencyIndia?.length
                ? languageProficiencyIndia?.map((item) => ({
                    id: item.toLowerCase(),
                    name: item,
                  }))
                : []
            }
            selectedOptions={languageProficiency || []}
            setSelectedOptions={(value) => setValue("languageProficiency", value)}
            leftIcon={
              <span>
                <FaRegCheckCircle />
              </span>
            }
          />
          {errors?.languageProficiency && (
            <p className="text-xs text-red-500">{errors.languageProficiency?.message}</p>
          )}
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </Button>
      {mutationResult && (
        <p className="text-center text-sm text-green-500">
          {mutationResult?.updateBusinessDetails?.message}
        </p>
      )}
      {error && <p className="text-center text-sm text-red-500">{error?.message}</p>}
    </form>
  );
}
