"use client";
import { useEffect, useState } from "react";
import { Input } from "../../../components/elements/Input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Button from "@/components/elements/Button";
import { passwordChangeSchema } from "./zodValidations";

export function ChangePassword() {
  //   const { changeAdminPassword, data, loading, error } = useChangeAdminPassword();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [errors, setErrors] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    const parsedData = passwordChangeSchema.safeParse({
      password: password.password,
      confirmPassword: password.confirmPassword,
    });

    if (parsedData.success) {
      try {
        // await changeAdminPassword({
        //   password: queryInput.password,
        // });
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    } else {
      const fieldErrors: any = {};
      parsedData.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Change Admin Password</h2>
      <div className="relative">
        <Input
          value={password.password}
          type={isPasswordShow ? "text" : "password"}
          label="Password"
          placeholder=" "
          onChange={(e: any) => setPassword({ ...password, password: e.target.value })}
        />
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-zinc-500 duration-300 hover:text-bg1"
          onClick={() => setIsPasswordShow((pre) => !pre)}
        >
          {isPasswordShow ? <IoIosEye /> : <IoIosEyeOff />}
        </span>
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </div>

      <Input
        value={password.confirmPassword}
        type={isPasswordShow ? "text" : "password"}
        label="Confirm Password"
        placeholder=" "
        onChange={(e: any) => setPassword({ ...password, confirmPassword: e.target.value })}
      />
      {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}

      <Button
        className="mt-5 w-full"
        onClick={handleSubmit}
        //    disabled={loading}
      >
        {false ? "Changing Password..." : "Change Password"}
      </Button>
      {/* {error && <p className="text-center text-xs text-red-500">{error?.message}</p>}
      {data && <p className="text-center text-xs text-green-500">{data?.message}</p>} */}
    </div>
  );
}
