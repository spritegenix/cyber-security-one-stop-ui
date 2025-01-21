import Layout from "@/components/layout/Layout";
import React from "react";
import PageSections from "./_sections/PageSections";

type Props = {
  params: {
    service: string;
  };
};

export default function IndividualService({ params }: Props) {
  const serviceSlug = params?.service;
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <PageSections serviceSlug={serviceSlug} />
    </Layout>
  );
}
