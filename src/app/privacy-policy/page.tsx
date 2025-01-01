import React from "react";
import type { Metadata } from "next";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true}>
        <h1>Privacy Policy</h1>
      </Wrapper>
    </Layout>
  );
}
