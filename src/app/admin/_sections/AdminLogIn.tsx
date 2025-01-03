"use client";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/elements/Input";
import Link from "next/link";
import { useLocalStorage } from "@/customHooks/useLocalStorage";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Button from "@/components/elements/Button";
import { loginSchema } from "@/app/(UserAuth)/_sections/zodValidations";
import { TextAccordion } from "@/components/elements/Accordions/TextAccordion";
import { useBusinessLogin } from "@/app/_queryCall/businessAuth/csr";

// Define TypeScript type for the form values based on Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogIn() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loginCredentials, setLoginCredentials] = useLocalStorage("listing-loginCredentials", {
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
  const { businessLogin, data, loading, error } = useBusinessLogin();

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  useEffect(() => {
    console.log("error", error);
  }, [error]);

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Form data submitted:", data);
    // Save the login identifier to local storage
    setLoginCredentials({ loginIdentifier: data.loginIdentifier });

    const type = data.loginIdentifier.includes("@") ? "email" : "phone";
    const identifier = data.loginIdentifier.includes("@")
      ? { email: data.loginIdentifier || undefined }
      : { phone: data.loginIdentifier || undefined };
    await businessLogin({
      password: data.password,
      email: identifier.email,
      phone: identifier.phone,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white p-5">
      <h2 className="mb-5 text-2xl font-bold">LogIn Now</h2>
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
          <Button className="mt-5 w-full" disabled={loading} type="submit">
            {!loading ? "Sign In" : "Signing In"}
          </Button>
        </form>
        {error && <p className="text-xs text-red-500">{error.message}</p>}
        <Link href={"/listing-signup"} className="text-sm text-blue-500 hover:underline">
          Don&apos;t have an account? Sign Up
        </Link>
        <TextAccordion
          items={[
            {
              title: "Forgot your password?",
              className: "text-sm text-blue-500",
              content: (
                <>
                  <Link
                    className="text-sm text-blue-500 hover:underline"
                    href="/listing-forgot-password/email"
                  >
                    Recover Password by Email
                  </Link>
                  <br />
                  <Link
                    className="text-sm text-blue-500 hover:underline"
                    href="/listing-forgot-password/phone"
                  >
                    Recover Password by Phone Number
                  </Link>
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
