"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/elements/Button";
import { Input, TextareaAutoGrowing } from "@/components/elements/Input";
import ProfilePicture from "./ProfilePicture";
import MultiInput from "@/components/elements/multiInput/MultiInput";
import { IoShareSocialOutline } from "react-icons/io5";
import { additionalInformationSchema } from "./zodSchema";
import WeekCheckbox from "@/components/elements/TimeScheduling";
import {
  useMutationBusinessDetails,
  useMutationBusinessFile,
} from "@/app/_queryCall/businessAuth/csr";
import { useEffect } from "react";
import {
  convertToDayTimingsDefaultValue,
  convertToWorkingHour,
} from "../../../../../utils/WorkingHourConverter";
import { isValidUrl } from "@/utils/customText";

type AdditionalInformationFormValues = z.infer<typeof additionalInformationSchema>;

const dayTimingsDefaultValue = {
  monday: { start: "", end: "", checked: true },
  tuesday: { start: "", end: "", checked: true },
  wednesday: { start: "", end: "", checked: true },
  thursday: { start: "", end: "", checked: true },
  friday: { start: "", end: "", checked: true },
  saturday: { start: "", end: "", checked: false },
  sunday: { start: "", end: "", checked: false },
};
export default function AdditionalInformationForm({ data, refetchData }: any) {
  const { handleUpdate, data: mutationResult, loading, error } = useMutationBusinessDetails();
  const {
    handleUpdate: handleUpdateLogo,
    data: mutationLogoResult,
    loading: logoLoading,
    error: logoError,
  } = useMutationBusinessFile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AdditionalInformationFormValues>({
    resolver: zodResolver(additionalInformationSchema),
    defaultValues: {
      bio: "",
      dayTimings: dayTimingsDefaultValue,
    },
  });

  let socialLinks = watch("socialMediaLinks") || [];
  let dayTimings = watch("dayTimings") || dayTimingsDefaultValue;

  // Update Default form values coming from backend
  useEffect(() => {
    if (data) {
      // console.log(data, "BasicInformationForm");
      const dayTimings = convertToDayTimingsDefaultValue(data?.businessDetails?.operatingHours);
      reset({
        ...data,
        profileImage: data?.businessDetails?.logo || "",
        bio: data?.businessDetails?.description || "",
        websiteUrl: data?.businessDetails?.primaryWebsite || "",
        socialMediaLinks:
          data?.businessDetails?.websites
            ?.filter((website: any) => website?.type !== "website")
            ?.map((website: any) => ({ id: website?.id, name: website?.url, isDelete: false })) ||
          [],
        dayTimings: dayTimings || dayTimingsDefaultValue,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: AdditionalInformationFormValues) => {
    // console.log("Form submitted:", formData);
    // console.log(formData.dayTimings, "formData.dayTimings");
    const operatingHours = convertToWorkingHour(formData.dayTimings);
    // console.log(operatingHours, "operatingHours");
    const socialLinks =
      (formData?.socialMediaLinks &&
        formData?.socialMediaLinks.map((item: any) => ({
          websiteId: item.id || undefined,
          url: item.name,
          type: "social",
          toDelete: item.isDelete,
        }))) ||
      [];
    try {
      await handleUpdate({
        description: formData.bio,
        operatingHours: operatingHours,
        primaryWebsite: formData.websiteUrl || "",
        websites: [...socialLinks],
        addresses: [],
      });
      refetchData();
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="mb-5 text-2xl font-semibold">Additional Information</h2>
      {/* Profile Picture & Bio/Description */}
      <div className="grid gap-5 md:grid-cols-12">
        {/* Profile Picture */}
        <div className="justify-center max-md:flex md:col-span-2">
          <ProfilePicture
            defaultImage={data?.businessDetails?.logo}
            mutation={handleUpdateLogo}
            mutationData={mutationLogoResult?.businessDetails?.logo}
            loading={logoLoading}
            error={logoError}
          />
        </div>
        {/* Bio/Description */}
        <div className="col-span-10">
          <TextareaAutoGrowing
            label="Bio/Description"
            rows={5}
            {...register("bio")}
            placeholder=" "
          />
          {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
        </div>
      </div>
      {/* Website URL */}
      <div>
        <Input {...register("websiteUrl")} label="Website URL" placeholder=" " />
        {errors.websiteUrl && <p className="text-xs text-red-500">{errors.websiteUrl.message}</p>}
      </div>
      {/* Social Media Links */}
      <div>
        <MultiInput
          label="Social Media Links"
          inputArray={socialLinks || []}
          setInputArray={(value: any) => setValue("socialMediaLinks", value)}
          leftIcon={<IoShareSocialOutline className="text-gray-800" />}
          individualErrors={
            errors && errors?.socialMediaLinks && Array.isArray(errors?.socialMediaLinks)
              ? errors.socialMediaLinks.map((item: any) => item?.name?.message)
              : []
          }
          inputValidationFunction={(text: string) => isValidUrl(text)}
          error={
            (errors?.socialMediaLinks &&
              !Array.isArray(errors?.socialMediaLinks) &&
              errors?.socialMediaLinks?.message) ||
            undefined
          }
        />
      </div>
      <div>
        <WeekCheckbox
          label="Consultation Timing"
          timeSlots={dayTimings}
          setTimeSlots={(value: any) => setValue("dayTimings", value)}
          errors={errors?.dayTimings || undefined}
        />
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

// const ccc = [
//   { dayOfWeek: "MONDAY", openingTime: "10:30", closingTime: "16:00" },
//   { dayOfWeek: "WEDNESDAY", openingTime: "9:00", closingTime: "16:00" },
//   { dayOfWeek: "FRIDAY", openingTime: "10:00", closingTime: "18:00" },
// ];
