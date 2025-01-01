import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { ChangePasswordByOtp } from "@/app/(BusinessAuth)/_sections/ChangePasswordByOtp";
import React from "react";

type Props = {
  params: {
    type: "email" | "phone";
    input: string;
  };
};

export default function ListingSignupWithOtpPasswordPage({ params }: Props) {
  const input = decodeURIComponent(params.input);
  const type = params.type;
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop2={true} className="mb-10 flex items-center justify-center p-2">
        <div className="rounded-lg bg-white p-5 shadow-lg">
          <ChangePasswordByOtp type={type} userIdentifier={input} />
        </div>
      </Wrapper>
    </Layout>
  );
}

