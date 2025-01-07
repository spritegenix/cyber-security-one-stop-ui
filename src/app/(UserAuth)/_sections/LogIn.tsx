"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { loginSchema } from "../../../app/(UserAuth)/_sections/zodValidations";
import { useLocalStorage } from "@/customHooks/useLocalStorage";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { GoogleAuthButton } from "@/components/elements/AuthSliderModel/GoogleAuthButton";
import { Input } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { TextAccordion } from "@/components/elements/Accordions/TextAccordion";
import { useUserLogin } from "@/app/_queryCall/userAuth/csr";

// Define TypeScript type for the form values based on Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LogIn({ handleModelClose }: any) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loginCredentials, setLoginCredentials] = useLocalStorage("loginCredentials", {
    loginIdentifier: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginIdentifier: loginCredentials.loginIdentifier,
    },
  });

  const { userLogin, data, loading, error } = useUserLogin();

  const onSubmit = async (formData: LoginFormValues) => {
    // console.log("Form data submitted:", formData);
    setLoginCredentials({ loginIdentifier: formData.loginIdentifier });

    // const type = formData.loginIdentifier.includes("@") ? "email" : "phone";
    const identifier = formData.loginIdentifier.includes("@")
      ? { email: formData.loginIdentifier || undefined }
      : { phone: formData.loginIdentifier || undefined };
    const response: any = await userLogin({
      password: formData.password,
      email: identifier.email,
      phone: identifier.phone,
    });
    if (response?.response) handleModelClose();
  };
  return (
    <div className="flex h-full flex-col items-center justify-center overflow-y-auto bg-white px-5 py-5">
      <h2 className="mb-5 text-2xl font-bold">LogIn Now</h2>
      <GoogleAuthButton />
      {/* OR  */}
      <div className="mt-5 flex items-center justify-center">
        <p className="h-0 w-32 border-b border-zinc-300" />
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300">
          OR
        </button>
        <p className="h-0 w-32 border-b border-zinc-300" />
      </div>
      <div>
        {/* Form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
            Sign In
          </Button>
          {error && <p className="text-xs text-red-500">{error?.message}</p>}
          {data && <p className="text-xs text-green-500">{data?.message}</p>}
        </form>
        <TextAccordion
          items={[
            {
              title: "Forgot your password?",
              className: "text-sm text-blue-500",
              content: (
                <>
                  <Link
                    className="text-sm text-blue-500 hover:underline"
                    href="/forgot-password/email"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/forgot-password/email";
                    }}
                  >
                    Recover Password by Email
                  </Link>
                  <br />
                  <Link
                    className="text-sm text-blue-500 hover:underline"
                    href="/forgot-password/phone"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/forgot-password/phone";
                    }}
                  >
                    Recover Password by Phone Number
                  </Link>
                </>
              ),
            },
          ]}
        />
        <Link
          href={"/signup"}
          onClick={(e) => {
            e.preventDefault(); // Prevent the default SPA navigation
            window.location.href = "/signup"; // Use a full reload
          }}
          className="text-sm text-blue-500 hover:underline md:hidden"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}
