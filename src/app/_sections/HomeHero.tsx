import GlobalSearch from "@/components/elements/globalSearch/GlobalSearch";
import Wrapper from "@/components/elements/Wrappers";
import React from "react";

export default function HomeHero() {
  return (
    <Wrapper isTop={true} className="relative rounded-lg bg-bg1 p-5">
      {/* Line Animation  */}
      <div className="line-shape first flex h-full w-full flex-wrap">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="relative z-10">
        <h1 className="mx-auto max-w-screen-md py-8 text-center text-3xl text-white md:py-16 md:text-5xl">
          Find Your Trusted Partner in <span className="font-font1 text-bg3">Fraud Prevention</span>{" "}
          and <span className="pl-1 font-font1 text-bg3"> Legal Consultancy</span>
        </h1>
        {/* Global Search  */}
        <div className="flex w-full justify-center">
          <GlobalSearch />
        </div>
      </div>
    </Wrapper>
  );
}
