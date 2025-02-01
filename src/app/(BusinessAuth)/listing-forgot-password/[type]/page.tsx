import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import ListingForgotPassword from "@/app/(BusinessAuth)/_sections/ListingForgotPassword";
import React from "react";
type Props = {
  params: {
    type: "email" | "phone";
  };
};

export default function forgetPasswordPage({ params }: Props) {
  const passwordChangeBy = params?.type;
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex h-screen justify-center">
        <ListingForgotPassword type={passwordChangeBy} />
      </Wrapper>
    </Layout>
  );
}
