import React from "react";
import Wrapper from "@/components/elements/Wrappers";
import AdminLogIn from "./_sections/AdminLogIn";

export default function ListingLogInPage() {
  return (
    <Wrapper isTop2={true} className="mb-10 flex items-center justify-center">
      <AdminLogIn />
    </Wrapper>
  );
}
