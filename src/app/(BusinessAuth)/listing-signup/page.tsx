import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import ListingSignUp from "@/app/(BusinessAuth)/_sections/ListingSignup";
import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Image from "next/image";
import { illustration1 } from "@/assets";
import Env from "@/lib/env";
import { fetchTestimonialsSSR } from "@/app/_queryCall/ssr";
import { FirmsTestimonialsSlider } from "@/app/subscription/_sections/FirmsTestimonialsSlider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listing Sign Up | Cybersecurity One Stop",
};

export const revalidate = Number(Env.REVALIDATE_TIME);

export default async function ListingSignUpPage() {
  const testimonials = await fetchTestimonialsSSR({ filter: "BUSINESS" });
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper
        containerClassName="py-5"
        isTop2={true}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
        bgColor="bg-white"
      >
        <div className="col-span-1 md:py-16">
          <h1 className="text-3xl font-bold md:text-5xl">
            List Your Firm or Individual Services <span className="text-bg1">for Free!</span>
          </h1>
          <div className="py-5">
            <ListingSignUp />
          </div>
          <div className="space-y-4 text-3xl font-bold">
            {[
              "Showcase Your Expertise",
              "Gain Visibility with Verified Profiles",
              "Completely Free & Easy Setup",
            ].map((item, index) => (
              <p key={index} className="flex items-center gap-2">
                <IoCheckmarkDoneSharp className="text-bold text-4xl text-green-600" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="col-span-1 hidden md:block">
          <Image
            src={illustration1}
            alt="signup-ill"
            width={800}
            height={800}
            className="max-h-[30rem] w-full object-contain"
          />
        </div>
      </Wrapper>
      {/* Testimonials  */}
      {testimonials?.length > 0 && (
        <Wrapper className="relative space-y-5 py-16">
          <h2 className="mb-5 text-center text-3xl font-bold text-bg1">
            What Makes Us the Preferred Choice
          </h2>
          <div className="sliderStyle relative">
            <FirmsTestimonialsSlider testimonials={testimonials} />
          </div>
          <div className="relative mx-auto !-mt-60 h-64 w-full rounded-2xl bg-bg1">
            {/* Line Animation  */}
            <div className="line-shape first flex h-full w-full flex-wrap">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Wrapper>
      )}
    </Layout>
  );
}
