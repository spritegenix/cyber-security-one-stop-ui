import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import React from "react";
import ForgotPassword from "../../_sections/ForgotPassword";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Cybersecurity One Stop",
};

type Props = {
  params: {
    type: "email" | "phone";
  };
};

export default function forgetPasswordPage({ params }: Props) {
  const passwordChangeBy = params?.type;
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center p-2">
        <ForgotPassword type={passwordChangeBy} />
      </Wrapper>
    </Layout>
  );
}
