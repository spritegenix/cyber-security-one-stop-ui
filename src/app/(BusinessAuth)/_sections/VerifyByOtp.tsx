"use client";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { FiEdit } from "react-icons/fi";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
import {
  useAddBusinessPrimaryContact,
  useResendBusinessOtp,
  useVerifyBusinessContact,
} from "@/app/_queryCall/businessAuth/csr";
import { z } from "zod";
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
  requestId?: string;
}

export function VerifyByOtp({ type, userIdentifier, requestId }: VerifyByOtpValue) {
  const route = useRouter();
  const { verifyContact, data, loading, error } = useVerifyBusinessContact();
  const {
    resendOtp,
    data: resendOtpData,
    loading: resendOtpLoading,
    error: resendOtpError,
  } = useResendBusinessOtp();
  const [userOtp, setUserOtp] = useState("");
  const [errors, setErrors] = useState({
    otp: "",
  });
  // Countdown timer hook
  const { timeLeft, isRunning, resetTimer } = useCountdownTimer({ initialTime: 60 }); // seconds

  const handleBackToEdit = () => {
    route.back();
  };

  // Handling Primary Contact Verification
  const {
    addBusinessPrimaryContact,
    data: addBusinessPrimaryContactData,
    loading: addBusinessPrimaryContactLoading,
    error: addBusinessPrimaryContactError,
  } = useAddBusinessPrimaryContact();

  const handleResendOTP = async () => {
    let queryInput = {
      email: type === "email" ? userIdentifier : undefined,
      phone: type === "phone" ? userIdentifier : undefined,
    };

    await resendOtp(queryInput.email, queryInput.phone);
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
      await verifyContact({
        otp: queryInput.otp,
        email: queryInput.email,
        phone: queryInput.phone,
        requestId: requestId,
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
      {resendOtpData && (
        <p className="text-center text-xs text-green-500">{resendOtpData?.message}</p>
      )}
      {resendOtpError && (
        <p className="text-center text-xs text-red-500">{resendOtpError?.message}</p>
      )}
      {addBusinessPrimaryContactError && (
        <p className="text-center text-xs text-red-500">
          {addBusinessPrimaryContactError?.message}
        </p>
      )}
      {addBusinessPrimaryContactData && (
        <p className="text-center text-xs text-green-500">
          {addBusinessPrimaryContactData?.message}
        </p>
      )}
    </>
  );
}
