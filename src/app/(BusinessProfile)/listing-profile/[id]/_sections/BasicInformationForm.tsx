"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { basicInfoSchema } from "./zodSchema";
import { FaPhoneAlt } from "react-icons/fa";
import { countries, indianStatesAndUTs } from "@/data/global";
import { Reorder } from "framer-motion";
import { RxDragHandleDots1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import VerifyButton from "@/components/elements/VerifyButton";
import {
  useAddBusinessPrimaryContact,
  useMutationBusinessDetails,
} from "@/app/_queryCall/businessAuth/csr";
import { useRouter } from "next/navigation";
import MultiInputWithStringInput from "@/components/elements/multiInput/MultiInputwithStringInput";
import { address } from "framer-motion/m";

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

export default function BasicInformationForm({ data, refetchData }: any) {
  const router = useRouter();
  const { handleUpdate, data: mutationResult, loading, error } = useMutationBusinessDetails();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
  });

  // Update Default form values coming from backend
  useEffect(() => {
    if (data) {
      // console.log(data, "BasicInformationForm");
      setIsEmailVerified(
        data?.primaryContacts?.find((contact: any) => contact?.type === "EMAIL")?.isVerified,
      );
      setIsPhoneVerified(
        data?.primaryContacts?.find((contact: any) => contact?.type === "PHONE")?.isVerified,
      );
      const newAddresses =
        data?.businessDetails &&
        data?.businessDetails?.addresses.map((address: any) => ({
          addressId: address?.id || "",
          streetAddress: address?.street || "",
          city: address?.city || "",
          state: address?.state || "",
          pincode: address?.pincode || "",
          country: address?.country || "",
          priority: address?.order || 0,
          isDeleted: false,
        }));
      setAddresses(newAddresses);
      reset({
        ...data,
        name: data?.name,
        email: data?.primaryContacts?.find((contact: any) => contact?.type === "EMAIL")?.value,
        phoneNumber: data?.primaryContacts?.find((contact: any) => contact?.type === "PHONE")
          ?.value,
        alternatePhoneNumbers: data?.additionalContacts?.map((contact: any) => contact) || [],
        addresses: newAddresses,
      });
    }
  }, [data, reset]);

  const [active, setActive] = useState(0);
  const {
    fields: addressFields,
    append: addAddress,
    remove: removeAddress,
    move,
    swap,
    update,
  } = useFieldArray({ control, name: "addresses" });

  const phoneNumber = watch("phoneNumber");
  const email = watch("email");
  const alternatePhoneNumbers = watch("alternatePhoneNumbers") || [];

  const [addressToBeDeleted, setAddressToBeDeleted] = useState<any[]>([]);
  const onSubmit = async (formData: BasicInfoFormValues) => {
    // console.log("Form submitted:", formData);
    const addresses =
      formData.addresses && formData.addresses.length > 0
        ? formData.addresses.map((address) => ({
            addressId: address.addressId || undefined,
            street: address.streetAddress,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country,
            order: address.priority,
            toDelete: false,
          }))
        : [];
    const deletedAddress = addressToBeDeleted.map((address) => ({
      addressId: address.addressId || undefined,
      street: address.streetAddress,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      order: address.priority,
      toDelete: true,
    }));
    const totalAddress = [...addresses, ...deletedAddress];
    try {
      await handleUpdate({
        name: formData.name,
        addresses: totalAddress,
        additionalContacts: formData.alternatePhoneNumbers,
      });
      // console.log("Update successful");
    } catch (error) {
      console.error("Error in submission:", error);
    }

    // Optionally log validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
    }
  };

  // Handling Primary Contact Verification
  const {
    addBusinessPrimaryContact,
    data: addBusinessPrimaryContactData,
    loading: addBusinessPrimaryContactLoading,
    error: addBusinessPrimaryContactError,
  } = useAddBusinessPrimaryContact();

  const handlePrimaryContact = async (contact: any) => {
    const type = contact.includes("@") ? "email" : "phone";
    const identifier = contact.includes("@")
      ? { email: contact || undefined }
      : { phone: contact || undefined };

    const result = await addBusinessPrimaryContact(identifier.email, identifier.phone);
    if (result.response) {
      // Navigate to the next page upon success
      const input = identifier.email || identifier.phone;
      router.push(`/listing-verify/${type}/${input}`);
    } else {
      console.error("Signup Error:", result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="mb-5 text-2xl font-semibold">Basic Information</h2>
      {/* Name  */}
      <div>
        <Input {...register("name")} label="Individual / Firm Name" placeholder=" " />
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
              disabled={isEmailVerified}
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
          {addBusinessPrimaryContactError && (
            <p className="text-xs text-red-500">{addBusinessPrimaryContactError?.message}</p>
          )}
        </div>
        {/* Email  */}
        <div>
          <div className="flex w-full gap-3">
            <div className="w-full">
              <Input
                {...register("email")}
                label="Email Address"
                placeholder=" "
                disabled={isEmailVerified}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              {addBusinessPrimaryContactError && (
                <p className="text-xs text-red-500">{addBusinessPrimaryContactError?.message}</p>
              )}
            </div>
            <VerifyButton
              className="pt-5"
              isVerified={isEmailVerified}
              onClick={() => handlePrimaryContact(email)}
              disabledValidation={
                email === "" || email === undefined || email?.includes("@") === false
              }
            />
          </div>
        </div>
      </div>
      {/* Alternate Phone Numbers  */}
      <div>
        <MultiInputWithStringInput
          label="Add Alternate Phone Numbers"
          inputArray={alternatePhoneNumbers}
          setInputArray={(value) => setValue("alternatePhoneNumbers", value)}
          leftIcon={<FaPhoneAlt className="text-gray-800" />}
          errors={errors?.alternatePhoneNumbers || undefined}
        />
      </div>
      {/* Addresses  */}
      {addresses && (
        <div>
          <div className="mb-2">
            <h3 className="text-lg font-medium">Addresses</h3>
            {addressFields.length > 1 && (
              <p className="text-xs text-red-600">
                <span className="font-semibold">Note:</span> Drag the address to Priority One to set
                it as <span className="font-semibold">Primary</span>.
              </p>
            )}
          </div>
          <Reorder.Group
            as="div"
            values={addressFields}
            onReorder={(newOrder) => {
              newOrder.map((field: any, index: number) => {
                const activeElement = addressFields[active];
                if (field === activeElement) {
                  move(active, index);
                  setActive(index);
                }
              });
            }}
            className="space-y-4"
          >
            {addressFields.map((field, index) => (
              <Reorder.Item
                key={field.id}
                value={field}
                className="flex items-center gap-2 max-md:flex-wrap"
              >
                <div className="relative mb-5 flex items-center gap-5 border-b pb-3">
                  <h6 className="borderedText absolute left-5 top-0 select-none text-5xl font-bold">
                    {index + 1}
                  </h6>
                  <RxDragHandleDots1 className="text-[4rem] text-bg1/80" />
                  <div>
                    <div>
                      <Input
                        {...register(`addresses.${index}.streetAddress`)}
                        label="Street Address"
                        placeholder=" "
                      />
                      {errors?.addresses?.[index]?.streetAddress && (
                        <p className="text-xs text-red-500">
                          {errors.addresses[index]?.streetAddress?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <Input
                          {...register(`addresses.${index}.pincode`)}
                          label="Pincode"
                          placeholder=" "
                        />
                        {errors?.addresses?.[index]?.pincode && (
                          <p className="text-xs text-red-500">
                            {errors?.addresses[index]?.pincode?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <select
                          className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm capitalize text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                          {...register(`addresses.${index}.state`)}
                        >
                          <option value="">State</option>
                          {indianStatesAndUTs.map((state) => (
                            <option className="capitalize" value={state} key={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors?.addresses?.[index]?.state && (
                          <p className="text-xs text-red-500">
                            {errors.addresses[index]?.state?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          {...register(`addresses.${index}.city`)}
                          label="City"
                          placeholder=" "
                        />
                        {errors?.addresses?.[index]?.city && (
                          <p className="text-xs text-red-500">
                            {errors.addresses[index]?.city?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <select
                          className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm capitalize text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                          {...register(`addresses.${index}.country`)}
                        >
                          <option value="">Country</option>
                          {countries.map((country) => (
                            <option className="capitalize" value={country} key={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        {errors?.addresses?.[index]?.country && (
                          <p className="text-xs text-red-500">
                            {errors.addresses[index]?.country?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAddressToBeDeleted([...addressToBeDeleted, field]);
                      return removeAddress(index);
                    }}
                    className="text-xl text-red-500 transition-all duration-300 hover:scale-125 active:scale-95"
                  >
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <div
            onClick={() =>
              addAddress({
                streetAddress: "",
                pincode: "",
                city: "",
                state: "",
                country: "",
                priority: addressFields.length + 1,
              })
            }
            className="group flex items-center gap-2 text-blue-500"
          >
            <IoAddCircleOutline className="text-2xl transition-all duration-300 active:scale-95 group-hover:scale-125" />
            <span>Add Address</span>
          </div>
        </div>
      )}

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
