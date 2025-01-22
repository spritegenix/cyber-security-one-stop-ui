import AuthSlider from "@/components/elements/AuthSliderModel/AuthSlider";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

export default function LoginPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true} className="mb-10 flex items-center justify-center">
        <AuthSlider isSignIn={true} handleModelClose={() => {}} />
      </Wrapper>
    </Layout>
  );
}
