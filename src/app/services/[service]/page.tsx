import Layout from "@/components/layout/Layout";
import React from "react";
import PageSections from "./_sections/PageSections";
import Env from "@/lib/env";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Cybersecurity One Stop",
};

export const revalidate = Number(Env.REVALIDATE_TIME);

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
