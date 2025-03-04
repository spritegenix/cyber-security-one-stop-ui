import AuthSlider from "@/components/elements/AuthSliderModel/AuthSlider";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Cybersecurity One Stop",
};

export default function SignUpPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center">
        <AuthSlider isSignIn={false} />
      </Wrapper>
    </Layout>
  );
}
