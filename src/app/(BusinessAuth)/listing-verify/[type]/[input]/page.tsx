import React from "react";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { VerifyByOtp } from "@/app/(BusinessAuth)/_sections/VerifyByOtp";

type Props = {
  params: {
    type: "email" | "phone";
    input: string;
  };
};

export default function BusinessVerifyPage({ params }: Props) {
  const input = decodeURIComponent(params.input);
  const type = params.type;
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center p-2">
        <div className="rounded-lg bg-white p-5 shadow-lg">
          <VerifyByOtp type={type} userIdentifier={input} />
        </div>
      </Wrapper>
    </Layout>
  );
}
