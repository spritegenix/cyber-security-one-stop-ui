"use client"; // Error boundaries must be Client Components

import Logo from "@/components/elements/Logo";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <ErrorPage tryAgain={() => reset()} />
    </>
  );
}

function ErrorPage({ tryAgain }: any) {
  return (
    <div className="relative flex h-screen w-screen items-center overflow-hidden bg-blue-100 p-5 lg:p-20">
      <div className="relative flex min-h-full min-w-full flex-1 flex-col items-center rounded-3xl bg-white p-10 text-center text-gray-800 shadow-xl md:flex-row md:text-left lg:p-20">
        {/* Left Content */}
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <Logo />
          </div>
          <div className="mb-10 font-light text-gray-600 md:mb-20">
            <h1 className="mb-10 text-3xl font-black uppercase text-yellow-500 lg:text-5xl">
              SomeThing Broke!
            </h1>
            <p>The page you&apos;re looking for is Showing Error.</p>
            <p>Try again or use the Go Back button below.</p>
          </div>
          <div className="mb-20 space-x-5 md:mb-0">
            <button
              onClick={() => window.history.back()}
              className="transform text-lg font-light text-yellow-500 outline-none transition-all hover:scale-110 hover:text-yellow-600 focus:outline-none"
            >
              <i className="mdi mdi-arrow-left mr-2"></i>Go Back
            </button>
            <button
              className="transform text-lg font-light text-yellow-500 outline-none transition-all hover:scale-110 hover:text-yellow-600 focus:outline-none"
              onClick={() => tryAgain()}
            >
              Try again
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full text-center md:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 441.85 285.44"
            className="mx-auto w-full max-w-lg lg:max-w-full"
          >
            <style>
              {`.st0{fill:#fff}.st1{fill:#b5dfea}.st2{opacity:.55;fill:#90cedd}.st3{fill:#d7f0f9}.st4{fill:#0582c1}.st5{fill:#79c9e8}.st6{fill:#ffbf4d}.st7{fill:#00668e}.st8{fill:#05556d}.st9{fill:#f98d3d}.st10{fill:#ed701b}.st11{fill:none}.st12{fill:#efaa3a}.st13{opacity:.29;fill:#f98d2b}.st14{fill:#49b4d6}.st15{fill:#ff9f50}.st16{fill:#f77e2d}.st17{opacity:.55;fill:url(#SVGID_1_)}`}
            </style>
            {/* Add SVG content */}
          </svg>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -top-64 right-20 h-96 w-64 -rotate-45 transform rounded-full bg-blue-200 bg-opacity-30 md:-top-96 md:right-32 md:h-full md:w-96"></div>
      <div className="pointer-events-none absolute -bottom-96 right-64 h-full w-96 -rotate-45 transform rounded-full bg-yellow-200 bg-opacity-20"></div>
    </div>
  );
}
