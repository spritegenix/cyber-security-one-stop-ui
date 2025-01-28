"use client";
import Button from "@/components/elements/Button";
import useAuthStore from "@/zustandStore/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function PageTabs() {
  return (
    <div className="flex w-full items-center justify-between">
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
      <LogoutButton />
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();
  const { clearAdminTokens } = useAuthStore();
  return (
    <Button
      onClick={() => {
        clearAdminTokens();
        router.push("/");
      }}
    >
      Logout
    </Button>
  );
}
