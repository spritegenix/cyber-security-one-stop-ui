import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import Wrapper from "@/components/elements/Wrappers";
import Logo from "@/components/elements/Logo";

export default function Footer1({ footerData }: any) {
  return (
    <Wrapper
      as="footer"
      containerClassName="w-full text-black"
      className="pt-5 text-white md:pt-12"
      bgColor="bg-bg1"
    >
      {/* Footer links section  */}
      <div className="grid grid-cols-1 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-6">
        {/* Footer Company About  */}
        <div className="flex flex-col gap-y-5">
          <Logo mode="light" />
          <p className="mb-4 max-w-[400px] text-wrap text-justify max-sm:mt-3 max-sm:!w-[80vw]">
            <TextWithLineBreak text={footerData?.text} />
          </p>
        </div>
        {/* Categories  */}
        <div className="col-span-2 flex flex-col gap-y-2 md:col-span-3">
          <h4 className="my-2 mb-5 text-2xl font-semibold">{footerData?.list2?.title}</h4>
          <ul className="grid grid-cols-2 grid-rows-5 md:grid-cols-3">
            {footerData?.list2?.links?.map((item: any, i: number) => (
              <li key={item?.id || i}>
                <Link
                  href={item?.slug ? `/services/${item?.slug}` : "#"}
                  className="transition-all duration-300 hover:pl-2 hover:font-medium hover:text-zinc-900"
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Quick Links  */}
        <div className="flex flex-col gap-y-2">
          <h4 className="my-2 mb-5 text-2xl font-semibold">{footerData?.list1?.title}</h4>
          <ul>
            {footerData?.list1?.links?.map((d: any, i: number) => (
              <li key={i}>
                <Link
                  href={d?.href}
                  className="transition-all duration-300 hover:pl-2 hover:font-medium hover:text-zinc-900"
                >
                  {d?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Us  */}
        <div className="flex flex-col">
          <h4 className="my-2 mb-5 text-2xl font-semibold">Contact Us</h4>
          <p>
            <Link href={`tel:${footerData?.contactDetails?.contactNo}`}>
              {footerData?.contactDetails?.contactNo}
            </Link>
          </p>
          <p>
            <Link href={`mailto:${footerData?.contactDetails?.email}`}>
              {footerData?.contactDetails.email}
            </Link>
          </p>
          <h4 className="my-2 text-xl font-semibold">Location</h4>
          <p>
            <TextWithLineBreak text={footerData?.contactDetails?.location} />
          </p>
        </div>
      </div>
      {/* copyright  */}
      <div className="flex items-center justify-between gap-5 border-t border-white py-5 max-md:flex-col">
        <p className="text-center text-sm">
          Copyrights © 2024 <span className="font-medium">CyberSecurity</span>. All rights
          reserved. Designed and Developed by{" "}
          <Link
            target="_blank"
            className="font-medium hover:underline"
            href={"https://www.spritegenix.com/"}
          >
            Sprite Genix
          </Link>
        </p>

        {/* Socials  */}
        {footerData?.socials && (
          <div className="flex-center gap-2 text-3xl text-white">
            {footerData?.socials?.facebook && (
              <FaFacebook
                className="social-icon text-xl"
                onClick={() => window.open(footerData?.socials?.facebook, "_blank")}
              />
            )}
            {footerData?.socials?.instagram && (
              <AiFillInstagram
                className="social-icon text-xl"
                onClick={() => window.open(footerData?.socials?.instagram, "_blank")}
              />
            )}
            {footerData?.socials?.linkedin && (
              <FaLinkedinIn
                className="social-icon text-xl"
                onClick={() => window.open(footerData?.socials?.linkedin, "_blank")}
              />
            )}
            {footerData?.socials?.youtube && (
              <TbBrandYoutubeFilled
                className="social-icon text-xl"
                onClick={() => window.open(footerData?.socials?.youtube, "_blank")}
              />
            )}
            {footerData?.socials?.twitter && (
              <FaXTwitter
                className="social-icon text-xl"
                onClick={() => window.open(footerData?.socials?.twitter, "_blank")}
              />
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
