"use client";
import React, { use, useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import Button from "@/components/elements/Button";
import {
  useAddUserContact,
  useResendUserOtp,
  useVerifyUserContact,
} from "@/app/_queryCall/userAuth/csr";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import useCountdownTimer from "@/customHooks/useCountdownTimer";

// Define a schema specifically for OTP verification
const otpVerificationSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits.")
    .regex(/^\d+$/, "OTP must contain only numbers."),
});

interface VerifyByOtpValue {
  type?: "email" | "phone";
  userIdentifier?: string;
  backToEdit?: () => void;
}

export default function Otp({ type, userIdentifier }: VerifyByOtpValue) {
  const route = useRouter();
  const { verifyUserContact, data, loading, error } = useVerifyUserContact();
  const {
    resendOtp,
    data: resendOtpData,
    loading: resendOtpLoading,
    error: resendOtpError,
  } = useResendUserOtp();
  const [userOtp, setUserOtp] = useState("");
  const [errors, setErrors] = useState({
    otp: "",
  });
  // Countdown timer hook
  const { timeLeft, isRunning, resetTimer } = useCountdownTimer({ initialTime: 5 }); // seconds

  const handleBackToEdit = () => {
    route.push("/signup");
  };

  const {
    addUserContact,
    data: addUserContactData,
    loading: addUserContactLoading,
    error: addUserContactError,
  } = useAddUserContact();

  const handleResendOTP = async () => {
    let queryInput = {
      email: type === "email" ? userIdentifier : undefined,
      phone: type === "phone" ? userIdentifier : undefined,
    };

    const result = await resendOtp(queryInput.email, queryInput.phone);
    setUserOtp("");
    resetTimer();
  };

  const handleSubmit = async () => {
    const parsedData = otpVerificationSchema.safeParse({
      otp: userOtp,
    });
    if (parsedData?.success) {
      let queryInput = {
        otp: parsedData?.data?.otp,
        email: type === "email" ? userIdentifier : undefined,
        phone: type === "phone" ? userIdentifier : undefined,
      };
      const result = await verifyUserContact({
        otp: queryInput.otp,
        email: queryInput.email,
        phone: queryInput.phone,
      });
    } else {
      const fieldErrors: any = {};
      parsedData.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <button
        className="mb-5 flex items-center gap-2 text-lg text-blue-500"
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
      <Button className="mt-5 w-full" onClick={handleSubmit}>
        Verify your {type === "phone" ? "Phone" : "Email"}
      </Button>
      <p
        className={`text-center text-sm ${
          isRunning
            ? "cursor-not-allowed text-gray-500"
            : "cursor-pointer text-blue-500 hover:underline"
        }`}
        onClick={handleResendOTP}
      >
        {isRunning ? `Resend OTP in ${formatTime(timeLeft)}` : "Resend OTP"}
      </p>
      {error && <p className="text-center text-xs text-red-500">{error?.message}</p>}
      {resendOtpError && (
        <p className="text-center text-xs text-red-500">{resendOtpError?.message}</p>
      )}
      {addUserContactError && (
        <p className="text-center text-xs text-red-500">{addUserContactError?.message}</p>
      )}
      {addUserContactData && (
        <p className="text-center text-xs text-green-500">{addUserContactData?.message}</p>
      )}
    </>
  );
}
