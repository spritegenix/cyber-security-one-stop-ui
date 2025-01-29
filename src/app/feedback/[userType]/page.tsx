import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import React from "react";
import Reviews from "./_sections/Reviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback | Cybersecurity One Stop",
};

type Params = {
  params: {
    userType: string;
  };
};

export default function page({ params }: Params) {
  const { userType } = params;
  return (
    <Layout headerStyle={userType === "user" ? 1 : 2} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex h-screen justify-center">
        <div className="flex h-max flex-col items-center justify-center rounded-md bg-white p-5">
          <h2 className="mb-5 text-2xl font-semibold text-gray-800">Feedback</h2>
          <Reviews userType={userType} />
        </div>
      </Wrapper>
    </Layout>
  );
}
