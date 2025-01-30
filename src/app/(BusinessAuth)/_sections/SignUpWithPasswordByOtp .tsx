"use client";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Input } from "../../../components/elements/Input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { changePasswordSchema } from "@/app/(UserAuth)/_sections/zodValidations";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
import { useVerifyBusinessContact } from "@/app/_queryCall/businessAuth/csr";

interface ChangePasswordByOtpValue {
  type?: "email" | "phone";
  userIdentifier?: string;
  backToEdit?: () => void;
  requestId?: string;
}

export function SignUpWithPasswordByOtp({
  type,
  userIdentifier,
  requestId,
}: ChangePasswordByOtpValue) {
  const { verifyContact, data, loading, error } = useVerifyBusinessContact();
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  useEffect(() => {
    console.log("error", error);
  }, [error]);
  const router = useRouter();
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

  const handleBackToEdit = () => {
    router.back();
  };
  const handleSubmit = async () => {
    const parsedData = changePasswordSchema.safeParse({
      otp: userOtp,
      password: password.password,
      confirmPassword: password.confirmPassword,
    });

    if (parsedData.success) {
      const queryInput = {
        otp: parsedData.data.otp,
        email: type === "email" ? userIdentifier : undefined,
        phone: type === "phone" ? userIdentifier : undefined,
        password: parsedData.data.password,
      };

      try {
        await verifyContact({
          otp: queryInput.otp,
          email: queryInput.email,
          phone: queryInput.phone,
          requestId: requestId,
          password: queryInput.password,
        });
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
      <button
        className="mb-5 flex h-max items-center gap-2 text-lg text-blue-500"
        onClick={handleBackToEdit}
      >
        <FiEdit className="text-lg" />
        <span>{userIdentifier}</span>
      </button>
      <div className="otp mb-5 flex flex-col justify-center">
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
      {error && <p className="text-center text-xs text-red-500">{error?.message}</p>}
    </>
  );
}
