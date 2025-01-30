import React from "react";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import Otp from "@/app/(UserAuth)/_sections/Otp";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Verify | Cybersecurity One Stop",
};

type Props = {
  params: {
    type: "email" | "phone";
    input: string;
  };
  searchParams: {
    requestId?: string;
  };
};

export default function UserVerifyPage({ params, searchParams }: Props) {
  const input = decodeURIComponent(params.input);
  // console.log(searchParams, "input");
  const type = params.type;
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex h-screen justify-center">
        <div className="rounded-lg bg-white p-5 shadow-lg">
          <Otp type={type} userIdentifier={input} requestId={searchParams?.requestId} />
        </div>
      </Wrapper>
    </Layout>
  );
}
