import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import ListingSignUp from "@/app/(BusinessAuth)/_sections/ListingSignup";
import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function ListingSignUpPage() {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper
        containerClassName="py-5"
        isTop2={true}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
        bgColor="bg-white"
      >
        <div className="col-span-1">
          <h1 className="text-3xl font-bold md:text-5xl">
            List Your Firm or Individual Services{" "}
            <span className="text-bg1">for Free!</span>
          </h1>
          <div className="py-5">
            <ListingSignUp />
          </div>
          <div className="space-y-2 text-3xl font-bold">
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
        <div className="col-span-1"></div>
      </Wrapper>
    </Layout>
  );
}
