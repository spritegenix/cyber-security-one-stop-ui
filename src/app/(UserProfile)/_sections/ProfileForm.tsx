"use client";

import { countries, indianStatesAndUTs } from "@/data/global";
import { Input } from "@/components/elements/Input";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import VerifyButton from "@/components/elements/VerifyButton";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddUserContact, useUpdateUserDetails } from "@/app/_queryCall/userAuth/csr";
import { useRouter } from "next/navigation";
import { address } from "framer-motion/m";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  phoneNumber: z
    .string()
    .regex(/^(?:\+\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/, {
      message: "Invalid phone number format",
    }),
  email: z.string().email({ message: "Invalid email format" }),
  addressId: z.string().optional(),
  streetAddress: z.string().max(100, { message: "Street Address cannot exceed 100 characters" }),
  pincode: z.string().max(6, { message: "Invalid Pincode" }).optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
export function ProfileForm({ defaultValues }: any) {
  const router = useRouter();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {},
  });

  const phoneNumber = watch("phoneNumber");
  const email = watch("email");
  const {
    updateUserDetails: handleUpdate,
    queryResponse: mutationResult,
    loading: updateLoading,
    error: updateError,
  } = useUpdateUserDetails();

  useEffect(() => {
    if (defaultValues) {
      // console.log(defaultValues, "BasicInformationForm");
      setIsEmailVerified(
        defaultValues?.contacts?.find((contact: any) => contact?.type === "EMAIL")?.isVerified,
      );
      setIsPhoneVerified(
        defaultValues?.contacts?.find((contact: any) => contact?.type === "PHONE")?.isVerified,
      );
      reset({
        ...defaultValues,
        name: defaultValues.name,
        email:
          defaultValues?.contacts &&
          defaultValues?.contacts?.find((contact: any) => contact.type === "EMAIL")?.value,
        phoneNumber:
          defaultValues?.contacts &&
          defaultValues?.contacts?.find((contact: any) => contact.type === "PHONE")?.value,
        addressId: defaultValues?.addresses[0]?.id,
        streetAddress: defaultValues?.addresses[0]?.street,
        pincode: defaultValues?.addresses[0]?.pincode,
        state: defaultValues?.addresses[0]?.state,
        city: defaultValues?.addresses[0]?.city,
        country: defaultValues?.addresses[0]?.country,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (formData: any) => {
    console.log("Form submitted:", formData);
    const updatedAddress: any = {
      addressId: formData.addressId || undefined,
      street: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
      order: formData.priority,
      toDelete: false,
    };
    try {
      await handleUpdate({
        name: formData.name,
        addresses: [updatedAddress],
      });
      // console.log("Update successful");
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const {
    addUserContact,
    data: addContactData,
    loading: addContactLoading,
    error: addContactError,
  } = useAddUserContact();

  const handlePrimaryContact = async (contact: any) => {
    const identifier = contact.includes("@")
      ? { email: contact || undefined }
      : { phone: contact || undefined };

    await addUserContact(identifier.email, identifier.phone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 pb-2">
      {/* Name  */}
      <div>
        <Input {...register("name")} label="Full Name" placeholder=" " />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Phone Number  */}
        <div>
          <div className="mt-5 flex w-full items-center gap-3">
            <PhoneInput
              defaultCountry="in"
              onChange={(value) => setValue("phoneNumber", value)}
              value={phoneNumber}
              inputStyle={{
                width: "100%",
                padding: "1.3rem",
                borderColor: "#e5e7eb",
                borderRadius: "0.375rem",
                borderTopLeftRadius: "0rem",
                borderBottomLeftRadius: "0rem",
              }}
            />
            <VerifyButton
              isVerified={isPhoneVerified}
              onClick={() => handlePrimaryContact(phoneNumber)}
              disabledValidation={phoneNumber === "" || phoneNumber === undefined}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
          )}
          {addContactError && <p className="text-xs text-red-500">{addContactError?.message}</p>}
          {addContactData && <p className="text-xs text-green-500">{addContactData?.message}</p>}
        </div>
        {/* Email  */}
        <div>
          <div className="flex w-full items-center gap-3">
            <div className="w-full">
              <Input {...register("email")} label="Email Address" placeholder=" " />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              {/* {addBusinessPrimaryContactError && (
                <p className="text-xs text-red-500">{addBusinessPrimaryContactError?.message}</p>
              )} */}
            </div>
            <VerifyButton
              className="pt-5"
              isVerified={isEmailVerified}
              onClick={() => handlePrimaryContact(email)}
              // href={`/user-verify/email/${email}`}
              disabledValidation={
                email === "" || email === undefined || email?.includes("@") === false
              }
            />
          </div>
        </div>
      </div>
      {/* Address  */}
      <div className="w-full">
        <Input {...register(`streetAddress`)} label="Street Address" placeholder=" " />
        {errors?.streetAddress && (
          <p className="text-xs text-red-500">{errors.streetAddress?.message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Input {...register(`pincode`)} label="Pincode" placeholder=" " />
          {errors.pincode && <p className="text-xs text-red-500">{errors?.pincode?.message}</p>}
        </div>
        <div>
          <Input {...register(`state`)} label="State" placeholder=" " />
          {errors?.state && <p className="text-xs text-red-500">{errors?.state?.message}</p>}
        </div>
        <div>
          <Input {...register(`city`)} label="City" placeholder=" " />
          {errors?.city && <p className="text-xs text-red-500">{errors?.city?.message}</p>}
        </div>
        <div>
          <select
            className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm capitalize text-zinc-500 outline-none duration-200 focus:outline-bg1"
            {...register(`country`)}
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option className="capitalize" value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
          {errors?.country && <p className="text-xs text-red-500">{errors?.country?.message}</p>}
        </div>
      </div>
      <Button className="!mt-5 w-full" type="submit" disabled={updateLoading}>
        {updateLoading ? "Updating..." : "Update"}
      </Button>
      {mutationResult && (
        <p className="text-center text-sm text-green-500">
          {mutationResult?.updateUserDetails?.message}
        </p>
      )}
      {updateError && <p className="text-center text-sm text-red-500">{updateError?.message}</p>}
    </form>
  );
}
