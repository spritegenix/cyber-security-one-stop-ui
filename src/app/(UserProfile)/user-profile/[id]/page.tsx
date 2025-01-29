import Layout from "@/components/layout/Layout";
import UserProfile from "../_section/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile | Cybersecurity One Stop",
};

export default function UserProfilePage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <UserProfile />
    </Layout>
  );
}
