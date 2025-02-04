"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
// import { testimonials } from "@/data/global";
export const TestimonialSlider = ({ testimonials }: any) => {
  // console.log(testimonials);
  const uniqueId = "testimonials123";

  const getSlidesPerView = (base: number) => {
    return testimonials.length < base ? testimonials.length : base;
  };

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
      640: { slidesPerView: getSlidesPerView(1) },
      768: { slidesPerView: getSlidesPerView(2) },
      1024: { slidesPerView: getSlidesPerView(3) },
    },
  };

  return (
    <>
      <Swiper {...swiperOptions} className="w-full max-w-fit px-5 md:w-[90%]">
        {testimonials?.map((testimonial: any, index: number) => (
          <SwiperSlide
            key={testimonial?.id || index}
            className="mb-12 w-full overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg"
          >
            <TestimonialCard
              avatar={testimonial?.user?.avatar || undefined}
              name={testimonial?.user?.name || undefined}
              profession={"User"} // Default profession if not available
              testimonial={testimonial?.comment || undefined}
              rating={testimonial?.rating || undefined}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`${uniqueId}-next swiper-button-next`}></div>
      <div className={`${uniqueId}-prev swiper-button-prev`}></div>
    </>
  );
};

function TestimonialCard({ avatar, name, profession, testimonial, rating }: any) {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 180;
  const isTruncated = testimonial.length > MAX_LENGTH;

  return (
    <div className="flex w-full flex-col justify-between rounded-lg border bg-white p-4 shadow-md">
      <div className="flex items-center">
        <div className="flex-center h-14 w-14 rounded-full border-2 border-white bg-bg1 font-bold text-white shadow-lg">
          {avatar ? (
            <Image
              src={avatar}
              alt="profile"
              width={50}
              height={50}
              className="h-full w-full rounded-full object-cover object-top"
            />
          ) : (
            <p className="text-2xl capitalize">{name?.slice(0, 1) || "U"}</p>
          )}
        </div>
        <div className="ml-5 p-3">
          <h3 className="font-bold">{name || "User"}</h3>
          <p className="text-sm text-zinc-500">{profession}</p>
        </div>
      </div>

      <p className="my-2 text-justify">
        {expanded || !isTruncated ? testimonial : `${testimonial.slice(0, MAX_LENGTH)}...`}
      </p>

      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto w-max text-sm text-bg1 underline"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

      <div className="mt-3 flex justify-center">
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} className="mx-1 text-xl text-bg1" />
        ))}
      </div>
    </div>
  );
}
