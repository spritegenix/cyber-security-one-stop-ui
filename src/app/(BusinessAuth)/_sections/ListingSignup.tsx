"use client";
import Button from "@/components/elements/Button";
import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useBusinessSignup } from "@/app/_queryCall/businessAuth/csr";

// Validation schema allowing either email or phone number
const listingSignUpSchema = z.object({
  loginIdentifier: z
    .string()
    .refine((value) => /\S+@\S+\.\S+/.test(value) || /^\+\d{1,3}\d{10,15}$/.test(value), {
      message: "Enter a valid email or phone number with a country code (e.g., +1234567890).",
    }),
});

type ListingSignUpFormValues = z.infer<typeof listingSignUpSchema>;

export default function ListingSignUp() {
  const { businessSignup, data, loading, error } = useBusinessSignup();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSignUpFormValues>({
    resolver: zodResolver(listingSignUpSchema),
  });

  const onSubmit = async (data: ListingSignUpFormValues) => {
    const type = data.loginIdentifier.includes("@") ? "email" : "phone";
    const identifier = data.loginIdentifier.includes("@")
      ? { email: data.loginIdentifier || undefined }
      : { phone: data.loginIdentifier || undefined };

    const result = await businessSignup(identifier.email, identifier.phone);
    if (result.response) {
      // Navigate to the next page upon success
      const input = identifier.email || identifier.phone;
      router.push(`/listing-signup-with-otp-password/${type}/${input}`);
    } else {
      console.error("Signup Error:", result.error);
    }
  };

  return (
    <div className="rounded-lg bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-2 text-lg">
        <div className="h-full w-full">
          <Input
            {...register("loginIdentifier")}
            type="text"
            label="Email or Phone Number"
            placeholder=" "
            autoFocus
          />
          {errors.loginIdentifier && (
            <p className="text-xs text-red-500">{errors.loginIdentifier.message}</p>
          )}
        </div>
        <Button
          className="move-right-shine-animation relative mt-5 h-min w-min overflow-hidden"
          size="lg"
          type="submit"
          disabled={loading}
          rightIcon={<FaArrowRight className="move-right-animation text-xl" />}
        >
          Start Now
        </Button>
      </form>
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props }: any,
  ref,
) {
  const id = useId();
  return (
    <div className="relative mt-5 w-full min-w-[200px]">
      <input
        type={type}
        className={`peer h-full w-full rounded-md border border-gray-200 bg-transparent bg-white px-3 py-[1.1rem] font-sans text-lg font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 focus:border-2 focus:border-bg1 focus:border-t-transparent focus:outline-0 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
      {label && (
        <label
          className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-lg font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all focus:border-t-transparent peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-lg peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-orange-500 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-orange-500"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
});
