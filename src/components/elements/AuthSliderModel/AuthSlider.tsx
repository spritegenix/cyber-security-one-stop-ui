"use client";
import React, { useEffect } from "react";
import SignUp from "../../../app/(UserAuth)/_sections/SignUp";
import { useState } from "react";
import Button from "../Button";
import useIsMobile from "@/customHooks/useIsMobile";
import LogIn from "@/app/(UserAuth)/_sections/LogIn";

export default function AuthSlider({ isSignIn, handleModelClose }: any) {
  const [signIn, setSignIn] = useState<Boolean>(isSignIn);
  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile ? (
        <div
          className="relative min-h-[34.6rem] max-w-full overflow-hidden rounded-lg bg-white shadow-lg md:w-[678px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`absolute left-0 top-0 z-[1] h-full w-1/2 overflow-y-auto transition-all duration-700 ${!signIn ? "z-[5] translate-x-full opacity-100" : "opacity-0"}`}
          >
            {/* Sign Up  */}
            <SignUp handleModelClose={handleModelClose} />
          </div>

          <div
            className={`absolute left-0 top-0 z-[2] h-full w-1/2 transition-all duration-700 ${!signIn ? "translate-x-full" : ""}`}
          >
            {/* LogIn  */}
            <LogIn handleModelClose={handleModelClose} />
          </div>
          <div
            className={`absolute left-1/2 top-0 z-[40] h-full w-1/2 overflow-hidden transition-all duration-700 ${!signIn ? "-translate-x-full" : ""}`}
          >
            <div
              className={`duration-600 relative -left-full h-full w-[200%] transform bg-bgGradient1 bg-cover bg-[0_0] bg-no-repeat text-white transition-transform ease-in-out ${
                !signIn ? "translate-x-1/2" : ""
              }`}
            >
              {/* LeftOverlayPanel  */}
              <div
                className={`absolute top-0 h-full w-1/2 transform transition-transform duration-1000 ease-in-out ${
                  !signIn ? "translate-x-0" : "translate-x-[-20%]"
                }`}
              >
                <LeftOverlayPanel setSignIn={setSignIn} />
              </div>
              {/* RightOverlayPanel  */}
              <div
                className={`absolute right-0 top-0 h-full w-1/2 transform transition-transform duration-1000 ease-in-out ${
                  !signIn ? "translate-x-[20%]" : "translate-x-0"
                }`}
              >
                <RightOverlayPanel setSignIn={setSignIn} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">{isSignIn ? <LogIn /> : <SignUp />}</div>
      )}
    </>
  );
}

export function LeftOverlayPanel({ setSignIn }: any) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-10 text-center">
      <h2 className="text-3xl font-bold">Welcome Back!</h2>
      <p className="mb-5">
        Enter your credentials to access your account and continue where you left off. We’ve made it
        easier for you to stay connected!
      </p>
      <Button onClick={() => setSignIn(true)}>Sign In</Button>
    </div>
  );
}

export function RightOverlayPanel({ setSignIn }: any) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-10 text-center">
      <h2 className="text-3xl font-bold">Join Us Today!</h2>
      <p className="mb-5">
        Sign up to access a world of possibilities. Enjoy personalized services, exclusive offers,
        and a community of like-minded individuals.
      </p>
      <Button onClick={() => setSignIn(false)}>Sigin Up</Button>
    </div>
  );
}
