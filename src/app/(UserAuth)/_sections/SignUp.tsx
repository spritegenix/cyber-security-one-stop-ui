"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/elements/Button";
import { GoogleAuthButton } from "../../../components/elements/AuthSliderModel/GoogleAuthButton";
import { Input } from "../../../components/elements/Input";
import Link from "next/link";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { signUpSchema } from "./zodValidations";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Otp from "./Otp";
import { useUserSignup } from "@/app/_queryCall/userAuth/csr";
import { useRouter } from "next/navigation";

// Define TypeScript type for the form values based on Zod schema
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp({ handleModelClose }: any) {
  const { userSignup, data, loading, error } = useUserSignup();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const phoneNumber = watch("phoneNumber");
  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    console.log(data);
    const result = await userSignup({
      name: data.name,
      password: data.password,
      email: data.email,
      phone: data.phoneNumber,
    });
    // if (result?.response) {
    //   // Navigate to the next page upon success
    //   const identifier = data.email || data.phoneNumber;
    //   const type = data.email ? "email" : "phone";
    //   router.push(`/user-verify/${type}/${identifier}`);
    //   // router.prefetch(`/user-verify/${type}/${identifier}`);
    //   window.location.href = `/user-verify/${type}/${identifier}`;
    // } else {
    //   console.error("Signup Error:", result.error);
    // }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-y-auto bg-white px-5 py-1">
      <h2 className="mb-5 text-2xl font-bold">Sign Up Now</h2>
      <GoogleAuthButton />
      <div className="mt-3 flex items-center justify-center">
        <p className="h-0 w-32 border-b border-zinc-300" />
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
          OR
        </button>
        <p className="h-0 w-32 border-b border-zinc-300" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input {...register("name")} type="text" label="Name" placeholder=" " autoFocus />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        <div className="mt-5">
          <PhoneInput
            defaultCountry="in"
            onChange={(value, country) => {
              setValue("phoneNumber", value);
            }}
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
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <Input {...register("email")} type="email" label="Email" placeholder=" " />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        <div className="relative">
          <Input
            {...register("password")}
            type={isPasswordShow ? "text" : "password"}
            label="Password"
            placeholder=" "
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-zinc-500 duration-300 hover:text-bg1"
            onClick={() => setIsPasswordShow((pre) => !pre)}
          >
            {isPasswordShow ? <IoIosEye /> : <IoIosEyeOff />}
          </span>
        </div>
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        <Button className="mt-5 w-full" type="submit">
          Generate OTP
        </Button>
      </form>
      {data && <p className="text-xs text-green-500">{data.message}</p>}
      {error && <p className="text-xs text-red-500">{error.message}</p>}
      <Link
        href={"/login"}
        onClick={(e) => {
          e.preventDefault(); // Prevent the default SPA navigation
          window.location.href = "/login"; // Use a full reload
        }}
        className="text-sm text-blue-500 hover:underline md:hidden"
      >
        Already have an account? Login
      </Link>
    </div>
  );
}
