"use client";
import { useEffect } from "react";
import { useUserGoogleOAuthVerify } from "@/app/_queryCall/userAuth/googleAuthCsr";
import { useSearchParams } from "next/navigation";
import Preloader, { Preloader2 } from "@/components/elements/Preloader";

const GoogleOAuthCallback = () => {
  const searchParams = useSearchParams();
  const { userGoogleOAuthVerify, loading, error } = useUserGoogleOAuthVerify();

  useEffect(() => {
    const code = searchParams.get("code");
    if (typeof code === "string") {
      userGoogleOAuthVerify(code);
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-5">
      {loading && (
        <>
          <Preloader2 /> <Preloader />
        </>
      )}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <Preloader2 /> <Preloader />
        </>
      )}
    </div>
  );
};

export default GoogleOAuthCallback;
