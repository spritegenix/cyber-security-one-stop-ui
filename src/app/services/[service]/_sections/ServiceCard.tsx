"use client";
import Button from "@/components/elements/Button";
import React, { useState } from "react";
import { FaPhone, FaStar } from "react-icons/fa";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";
import { SiExpensify } from "react-icons/si";
import { ServiceCardSlider } from "./ServiceCardSlider";
import Link from "next/link";
import { VscVerifiedFilled } from "react-icons/vsc";
import useAuthStore from "@/zustandStore/authStore";

export default function ServiceCard({
  name,
  isVerified,
  city,
  state,
  country,
  rating,
  review,
  yearsOfExperience,
  sliderImages,
  slug,
  tags,
  phoneNumber,
  whatsAppNumber,
}: any) {
  const [isPhoneDisplay, setIsPhoneDisplay] = useState(false);
  const isLoggedIn = useAuthStore((state) => state?.userToken);
  return (
    <li className="relative grid w-full grid-cols-1 gap-5 rounded-lg bg-white p-3 shadow-xl md:grid-cols-12">
      <div className="swiperStyle2 relative col-span-1 max-h-52 min-h-48 md:col-span-4">
        <ServiceCardSlider id={slug} images={sliderImages} />
      </div>
      <div className="col-span-1 flex flex-col justify-between gap-2 md:col-span-8">
        <div className="space-y-2">
          <Link
            href={`/${slug || "#"} `}
            className="flex cursor-pointer text-2xl font-bold duration-300 hover:text-bg1"
          >
            <span>{name}</span>{" "}
            {isVerified && <VscVerifiedFilled className="text-3xl text-green-500" />}
          </Link>
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <IoLocationOutline className="text-lg" />{" "}
            <span>
              {city && `${city},`} {state && `${state} ,`} {country && `${country}`}
            </span>
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>{Number(rating).toFixed(1)}</span>
              <span>({review} reviews)</span>
            </div>
            {yearsOfExperience && (
              <div className="flex items-center gap-2">
                <SiExpensify className="text-bg1" />
                <span>{yearsOfExperience} Years of Experience</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {tags?.map((tag: string) => (
              <span key={tag} className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <Button
            onClick={() => {
              if (!isPhoneDisplay) {
                setIsPhoneDisplay(true);
                if (!isLoggedIn) {
                  window.location.href = "/login";
                  return;
                }
              } else if (isLoggedIn) {
                window.open(`tel:${phoneNumber}`);
              }
            }}
            variant="green"
            leftIcon={<FaPhone className="scale-x-[-1] transform duration-300" />}
          >
            {isPhoneDisplay && isLoggedIn ? phoneNumber : "Show Number"}
          </Button>

          <Button
            onClick={() => {
              if (isLoggedIn) {
                window.open(`https://api.whatsapp.com/send?phone=${whatsAppNumber}`, "_blank");
              } else {
                window.location.href = "/login";
              }
            }}
            variant="white"
            leftIcon={<IoLogoWhatsapp className="transform text-xl text-green-500 duration-300" />}
          >
            WhatsApp
          </Button>
          {/* <Button
            variant="orange"
            leftIcon={
              <IoChatbubblesOutline className="transform text-xl text-white duration-300" />
            }
          >
            Chat Directly
          </Button> */}
        </div>
      </div>
    </li>
  );
}

export function ServiceCardSkeleton() {
  return (
    <li className="relative grid w-full animate-pulse grid-cols-1 gap-5 rounded-lg bg-gray-200 p-3 shadow-xl md:grid-cols-12">
      <div className="swiperStyle2 relative col-span-1 max-h-52 rounded-lg bg-gray-300 md:col-span-4"></div>
      <div className="col-span-1 flex flex-col justify-between gap-2 md:col-span-8">
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded-md bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded-md bg-gray-300"></div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-300"></div>
              <div className="h-4 w-10 rounded-md bg-gray-300"></div>
              <div className="h-4 w-16 rounded-md bg-gray-300"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gray-300"></div>
              <div className="h-4 w-32 rounded-md bg-gray-300"></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 rounded-md bg-gray-300"></div>
            <div className="h-6 w-20 rounded-md bg-gray-300"></div>
            <div className="h-6 w-12 rounded-md bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="h-10 w-32 rounded-md bg-gray-300"></div>
          <div className="h-10 w-32 rounded-md bg-gray-300"></div>
        </div>
      </div>
    </li>
  );
}
