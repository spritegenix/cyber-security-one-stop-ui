import Button from "@/components/elements/Button";
import React from "react";

export default function PageTabs() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button href="/admin/user" variant="orange">
        Manage Users
      </Button>
      <Button href="/admin/business" variant="orange">
        Manage Business
      </Button>
      <Button href="/admin/ads-management" variant="orange">
        Manage Ads
      </Button>
      <Button href="/admin/testimonials" variant="orange">
        Manage Testimonials
      </Button>
    </div>
  );
}
