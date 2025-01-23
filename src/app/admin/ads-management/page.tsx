import Wrapper from "@/components/elements/Wrappers";
import React from "react";
import PageTabs from "../_sections/PageTabs";
import MobileAdCards from "./MobileAdCards";
import DesktopAdCards from "./DesktopAdCards";

export default function AdManagementPage() {
  return (
    <>
      <Wrapper className="py-5">
        <PageTabs />
      </Wrapper>
      <Wrapper className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2">
        <DesktopAdCards />
        <MobileAdCards />
      </Wrapper>
    </>
  );
}
