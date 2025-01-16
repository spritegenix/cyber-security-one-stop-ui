import Button from "@/components/elements/Button";
import Link from "next/link";
import React from "react";

export default function PageTabs() {
  return (
    <div className="flex flex-wrap gap-5">
      <Button as={Link} href="/admin/dashboard" variant="orange">
        Dashboard
      </Button>
      <Button as={Link} href="/admin/user" variant="orange">
        Manage Users
      </Button>
      <Button as={Link} href="/admin/business" variant="orange">
        Manage Business
      </Button>
      <Button as={Link} href="/admin/ads-management" variant="orange">
        Manage Ads
      </Button>
      <Button as={Link} href="/admin/testimonials" variant="orange">
        Manage Testimonials
      </Button>
    </div>
  );
}
