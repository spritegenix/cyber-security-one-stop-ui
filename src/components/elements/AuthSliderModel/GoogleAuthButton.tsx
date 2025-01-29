"use client";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import { useGoogleOAuth } from "@/app/_queryCall/userAuth/googleAuthCsr";
import { useEffect } from "react";
import Env from "@/lib/env";

export function GoogleAuthButton() {
  const { initiateGoogleOAuth, data, loading, error } = useGoogleOAuth();

  useEffect(() => {
    if (data?.link) {
      window.location.href = data?.link;
    }
  }, [data?.link]);

  return (
    <>
      <Button
        variant="white"
        leftIcon={<FcGoogle className="text-2xl" />}
        onClick={() => initiateGoogleOAuth(`${Env.BASE_URL}auth/callback`)}
        disabled={loading}
      >
        {loading ? "Verifying Google OAuth..." : "Sign In with Google"}
      </Button>
      {error && <p>{error.message}</p>}
    </>
  );
}
