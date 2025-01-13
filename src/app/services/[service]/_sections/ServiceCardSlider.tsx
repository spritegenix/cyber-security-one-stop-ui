"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { servicesListingAdBanners } from "@/data/global";
import { GrNext, GrPrevious } from "react-icons/gr";
import useIsMobile from "@/customHooks/useIsMobile";
export const ServiceCardSlider = ({ images, id }: any) => {
  const uniqueId = id || "ServiceCardSlider123";

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Navigation],
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 1 },
    },
  };

  return (
    <>
      <Swiper {...swiperOptions} className="h-full w-full">
        {images?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <ImageCard image={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Add navigation buttons */}
      {true && (
        <div
          className={`${uniqueId}-next swiper-button-next !right-0 !top-1/2 !bg-white !bg-opacity-50 !text-xs !text-white`}
        >
          <GrNext />
        </div>
      )}
      {true && (
        <div
          className={`${uniqueId}-prev swiper-button-prev !left-0 !top-1/2 !bg-white !bg-opacity-50 !text-xs !text-white`}
        >
          <GrPrevious />
        </div>
      )}
    </>
  );
};

function ImageCard({ image }: any) {
  return (
    <Image
      src={image}
      alt="service"
      width={764}
      height={500}
      className="mx-auto h-full w-full cursor-pointer object-cover"
    />
  );
}
