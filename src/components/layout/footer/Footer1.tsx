"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import Wrapper from "@/components/elements/Wrappers";
import Button from "@/components/elements/Button";
import Logo from "@/components/elements/Logo";
import { footer } from "@/data/layout";

export default function Footer1() {
  return (
    <Wrapper
      as="footer"
      containerClassName="w-full text-black"
      className="pt-5 text-white md:pt-12"
      bgColor="bg-bg1"
    >
      {/* Footer links section  */}
      <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4">
        {/* Footer Company About  */}
        <div className="col-span-2 flex flex-col gap-y-5 md:col-span-1">
          <Logo mode="dark" />
          <p className="mb-4 max-w-[400px] text-wrap max-sm:mt-3 max-sm:!w-[80vw]">
            <TextWithLineBreak text={footer?.text} />
          </p>
        </div>
        {/* Quick Links  */}
        <div className="col-span-1 flex flex-col gap-y-2">
          <h4 className="my-2 text-xl font-semibold">{footer?.list1?.title}</h4>
          <ul>
            {footer?.list1?.links?.map((d: any, i: number) => (
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
        {/* Categories  */}
        <div className="col-span-1 flex flex-col gap-y-2">
          <h4 className="my-2 text-xl font-semibold">{footer?.list2?.title}</h4>
          <ul>
            {footer?.list2?.links?.map((d: any, i: number) => (
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
        <div className="col-span-1 flex flex-col">
          <h4 className="my-2 mb-3 text-xl font-semibold">Contact Us</h4>
          <p>
            <Link href={`tel:${footer?.contactDetails?.contactNo}`}>
              {footer?.contactDetails?.contactNo}
            </Link>
          </p>
          <p>
            <Link href={`mailto:${footer?.contactDetails?.email}`}>
              {footer?.contactDetails.email}
            </Link>
          </p>
          <h4 className="my-2 text-xl font-semibold">Location</h4>
          <p>
            <TextWithLineBreak text={footer?.contactDetails?.location} />
          </p>
        </div>
      </div>
      {/* copyright  */}
      <div className="flex items-center justify-between border-t border-white py-5 max-md:flex-col">
        <p className="text-center text-sm">
          Copyrights © 2024 <span className="font-medium">CyberSecurity</span>. All rights
          reserved. Designed and Developed by{" "}
          <Link
            target="_blank"
            className="font-medium hover:underline"
            href={"https://www.spritegenix.com/"}
          >
            SpriteGenix
          </Link>
        </p>

        {/* Socials  */}
        {footer?.socials && (
          <div className="flex-center gap-x-2 text-3xl text-white">
            {footer?.socials?.facebook && (
              <FaFacebook
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.facebook, "_blank")}
              />
            )}
            {footer?.socials?.instagram && (
              <AiFillInstagram
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.instagram, "_blank")}
              />
            )}
            {footer?.socials?.linkedin && (
              <FaLinkedinIn
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.linkedin, "_blank")}
              />
            )}
            {footer?.socials?.youtube && (
              <TbBrandYoutubeFilled
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.youtube, "_blank")}
              />
            )}
            {footer?.socials?.twitter && (
              <FaXTwitter
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.twitter, "_blank")}
              />
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
