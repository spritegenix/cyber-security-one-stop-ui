import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import React from "react";
import Reviews from "./_sections/Reviews";

type Params = {
  params: {
    userType: string;
  };
};

export default function page({ params }: Params) {
  const { userType } = params;
  return (
    <Layout headerStyle={userType === "user" ? 1 : 2} footerStyle={1}>
      <Wrapper
        isMaxWidthChangeRequired={"max-w-sm"}
        isTop={true}
        className="mb-10 flex flex-col items-center justify-center rounded-lg border border-bg1 bg-white p-2"
      >
        <h2 className="mb-5 text-2xl font-semibold text-gray-800">Feedback</h2>
        <Reviews userType={userType} />
      </Wrapper>
    </Layout>
  );
}
