"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
// import { servicesListingAdBanners } from "@/data/global";
import { GrNext, GrPrevious } from "react-icons/gr";
import useIsMobile from "@/customHooks/useIsMobile";
import { useFetchAllAdBanners } from "../_queryCall/csr";
export const AdBannerSlider = ({
  mobileHeight = "",
  desktopHeight = "",
  onlyMobile = false,
}: any) => {
  const uniqueId = "adBanner123";
  const { data, loading, error, refetch } = useFetchAllAdBanners();

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
  const isMobile = useIsMobile();
  return (
    <>
      {!loading ? (
        <Swiper
          {...swiperOptions}
          className={`${isMobile || onlyMobile ? mobileHeight : desktopHeight} w-full`}
        >
          {isMobile || onlyMobile
            ? data &&
              data?.getAllMobileAddBanners?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <AdCard image={item?.url} href={item?.businessDetails?.business?.slug} />
                </SwiperSlide>
              ))
            : data &&
              data?.getAllAddBanners?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <AdCard image={item?.url} href={item?.businessDetails?.business?.slug} />
                </SwiperSlide>
              ))}
        </Swiper>
      ) : (
        <AdCardSkeleton className={`${isMobile ? mobileHeight : desktopHeight} w-full`} />
      )}
      {/* Add navigation buttons */}
      {!loading && (
        <div
          className={`${uniqueId}-next swiper-button-next !right-0 !top-1/2 !bg-white !bg-opacity-50 !text-xs !text-white`}
        >
          <GrNext />
        </div>
      )}
      {!loading && (
        <div
          className={`${uniqueId}-prev swiper-button-prev !left-0 !top-1/2 !bg-white !bg-opacity-50 !text-xs !text-white`}
        >
          <GrPrevious />
        </div>
      )}
    </>
  );
};

function AdCard({ href, image }: { href?: string; image?: string }) {
  return (
    <Link
      href={href ? `/${href}` : "#"}
      className="flex h-full w-full cursor-pointer justify-center overflow-hidden rounded-xl bg-gray-100"
      aria-label="Advertisement"
    >
      {image ? (
        <Image
          src={image}
          alt="Advertisement Banner"
          width={1500}
          height={200}
          className="mx-auto h-full w-full object-cover"
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          No image available
        </div>
      )}
    </Link>
  );
}

function AdCardSkeleton({ className }: any) {
  return (
    <div
      className={`flex ${className} w-full animate-pulse justify-center overflow-hidden rounded-xl bg-gray-100`}
    >
      <div className="flex h-full w-full items-center justify-center bg-gray-300">
        <div className="h-full w-3/4 bg-gray-200"></div>
      </div>
    </div>
  );
}

export default AdCardSkeleton;
