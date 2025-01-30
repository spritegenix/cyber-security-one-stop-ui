"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/elements/Input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Button from "@/components/elements/Button";
import { useAdminLogin } from "@/app/_queryCall/adminAuth/csr";
import { loginSchema } from "./zodValidations";

// Define TypeScript type for the form values based on Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogIn() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { adminLogin, data, loading, error } = useAdminLogin();

  const onSubmit = async (data: LoginFormValues) => {
    // console.log("Form data submitted:", data);
    await adminLogin({
      email: data.userName,
      password: data.password,
    });
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white p-5">
      <h2 className="mb-5 text-2xl font-bold">LogIn Now</h2>
      <div>
        {/* Form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input {...register("userName")} type="text" label="UserName" placeholder=" " autoFocus />
          {errors.userName && <p className="text-xs text-red-500">{errors.userName.message}</p>}
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
            {!loading ? "Sign In" : "Signing In..."}
          </Button>
        </form>
        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
