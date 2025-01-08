import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import ListingLogIn from "@/app/(BusinessAuth)/_sections/ListingLogIn";
import React from "react";

export default function ListingLogInPage() {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop2={true} className="mb-10 flex h-screen justify-center">
        <ListingLogIn />
      </Wrapper>
    </Layout>
  );
}
