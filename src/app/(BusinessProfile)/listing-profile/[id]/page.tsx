import BusinessProfile from "@/app/(BusinessProfile)/listing-profile/[id]/_sections/BusinessProfileSection";
import QuickLinks from "@/app/(BusinessProfile)/listing-profile/[id]/_sections/QuickLinksSection";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";

export default function FirmProfilePage() {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      {/* Business  Profile */}
      <Wrapper
        id="profile"
        isTop2={true}
        containerClassName="py-10"
        className="grid grid-cols-1 gap-2 md:grid-cols-12 lg:gap-5"
      >
        <BusinessProfile />
        <QuickLinks />
      </Wrapper>
    </Layout>
  );
}
