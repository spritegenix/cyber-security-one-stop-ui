"use client";
import { useState } from "react";
import OTPInput from "react-otp-input";
import Button from "../../../components/elements/Button";
import { Input } from "../../../components/elements/Input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { z } from "zod";
import { changePasswordSchema } from "./zodValidations";
import { FiEdit } from "react-icons/fi";
import { useChangeUserPassword } from "@/app/_queryCall/userAuth/csr";

interface ChangePasswordByOtpValue {
  type?: "email" | "phone";
  userIdentifier?: string;
  backToEdit?: () => void;
}

export function ChangePasswordByOtp({
  type,
  userIdentifier,
  backToEdit,
}: ChangePasswordByOtpValue) {
  const [userOtp, setUserOtp] = useState("");
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

  const { changeUserPassword, loading, error } = useChangeUserPassword();

  const handleSubmit = async () => {
    const parsedData = changePasswordSchema.safeParse({
      otp: userOtp,
      password: password.password,
      confirmPassword: password.confirmPassword,
    });

    if (parsedData.success) {
      try {
        const response = await changeUserPassword({
          otp: parsedData.data.otp,
          password: parsedData.data.password,
          email: type === "email" ? userIdentifier : undefined,
          phone: type === "phone" ? userIdentifier : undefined,
        });

        if (response) {
          console.log("Password changed successfully:", response.response);
          // Redirect or display success message if needed
        } else {
          console.error("Error while changing password:", error);
        }

        setErrors({ otp: "", password: "", confirmPassword: "" }); // Clear errors
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
    <>
      <button className="mb-5 flex items-center gap-2 text-lg text-blue-500" onClick={backToEdit}>
        <FiEdit className="text-lg" />
        <span>
          {type === "phone" && "+91"} {userIdentifier}
        </span>
      </button>
      <div className="otp mb-5 flex justify-center">
        <OTPInput
          value={userOtp}
          onChange={setUserOtp}
          numInputs={6}
          renderSeparator={<span className="mx-1 text-gray-300">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              className="h-9 w-9 rounded-md border border-gray-300 text-center text-lg focus:border-bg1 focus:outline-none"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
            />
          )}
          shouldAutoFocus={true}
          inputType="tel"
        />
        {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
      </div>

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

      <Button className="mt-5 w-full" onClick={handleSubmit}>
        Update Password
      </Button>
    </>
  );
}
