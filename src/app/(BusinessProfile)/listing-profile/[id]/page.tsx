import BusinessProfile from "@/app/(BusinessProfile)/listing-profile/[id]/_sections/BusinessProfileSection";
import QuickLinks from "@/app/(BusinessProfile)/listing-profile/[id]/_sections/QuickLinksSection";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
type Params = {
  params: {
    id: string;
  };
};

export default function FirmProfilePage({ params }: Params) {
  const { id } = params;
  return (
    <Layout headerStyle={2} footerStyle={1}>
      {/* Business  Profile */}
      <Wrapper
        id="profile"
        isTop2={true}
        containerClassName="py-10"
        className="grid grid-cols-1 md:grid-cols-12 gap-2 lg:gap-5"
      >
        <BusinessProfile />
        <QuickLinks />
      </Wrapper>
    </Layout>
  );
}
