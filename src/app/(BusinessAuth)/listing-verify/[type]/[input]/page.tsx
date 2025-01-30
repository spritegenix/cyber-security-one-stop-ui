import React from "react";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { VerifyByOtp } from "@/app/(BusinessAuth)/_sections/VerifyByOtp";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listing Verify Profile | Cybersecurity One Stop",
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

export default function BusinessVerifyPage({ params, searchParams }: Props) {
  const input = decodeURIComponent(params.input);
  const type = params.type;
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center p-2">
        <div className="h-max rounded-lg bg-white p-5 shadow-lg">
          <VerifyByOtp type={type} userIdentifier={input} requestId={searchParams?.requestId} />
        </div>
      </Wrapper>
    </Layout>
  );
}
