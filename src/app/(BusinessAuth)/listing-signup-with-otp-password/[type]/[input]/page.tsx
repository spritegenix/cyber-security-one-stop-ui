import { SignUpWithPasswordByOtp } from "@/app/(BusinessAuth)/_sections/SignUpWithPasswordByOtp ";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listing Signup With Otp Password | Cybersecurity One Stop",
};

type Props = {
  params: {
    type: "email" | "phone";
    input: string;
  };
  searchParams: {
    requestId: string;
  };
};

export default function ListingSignupWithOtpPasswordPage({ params, searchParams }: Props) {
  const input = decodeURIComponent(params.input);
  const type = params.type;
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop2={true} className="mb-10 flex h-screen justify-center">
        <div className="h-max rounded-lg bg-white p-5 shadow-lg">
          <SignUpWithPasswordByOtp
            type={type}
            userIdentifier={input}
            requestId={searchParams?.requestId}
          />
        </div>
      </Wrapper>
    </Layout>
  );
}
