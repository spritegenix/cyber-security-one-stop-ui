"use client";
import { useHeaderUser } from "@/app/_queryCall/businessAuth/csr";
import { ad, contact, profile, share } from "@/assets";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function QuickLinks() {
  const { userData: loggedUser, loading, error, refetch } = useHeaderUser();
  return (
    <>
      <div className="col-span-1 flex flex-wrap gap-5 md:flex-col">
        <QuickLinkCard
          title={"Share \\nProfile"}
          href={
            loggedUser?.phoneNumber
              ? `https://api.whatsapp.com/send/?phone=%2B${loggedUser?.phoneNumber}&text&type=phone_number&app_absent=0`
              : "#"
          }
          icon={share}
        />
        <QuickLinkCard
          title={"User View"}
          href={loggedUser?.slug ? `http://localhost:3000/${loggedUser?.slug}` : "#"}
          icon={profile}
        />
        <QuickLinkCard title={"Ads Subscription"} href={"/subscription"} icon={ad} />
        <QuickLinkCard title={"Business Support"} href={"tel:+91 9999999999"} icon={contact} />
      </div>
    </>
  );
}

function QuickLinkCard({ title, href, icon }: any) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") || href.startsWith("https") ? "_blank" : "_self"}
      className="group flex cursor-pointer flex-col items-center gap-2 text-center"
    >
      <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl bg-bg1/20 p-4 text-3xl duration-300 group-hover:bg-bg1">
        <Image src={icon} alt="icon" className="h-full w-full object-contain" />
      </div>
      <h6 className="cursor-pointer font-medium duration-300 group-hover:text-bg1">
        <TextWithLineBreak text={title} />
      </h6>
    </Link>
  );
}
