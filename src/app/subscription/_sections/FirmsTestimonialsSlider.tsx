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
import { FaStar } from "react-icons/fa";
import Button from "@/components/elements/Button";
import { unknown } from "zod";
export const FirmsTestimonialsSlider = ({ testimonials }: any) => {
  const uniqueId = "FirmsTestimonialsSlider";

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
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  };

  return (
    <>
      <Swiper {...swiperOptions} className="w-full max-w-fit px-5 md:w-[90%]">
        {testimonials?.map((testimonial: any, index: number) => (
          <SwiperSlide
            key={index}
            className="mb-12 w-full overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg"
          >
            <TestimonialCard
              avatar={testimonial?.user?.avatar || undefined}
              name={testimonial?.user?.name || undefined}
              profession={testimonial?.user?.profession || "Unknown"} // Default profession if not available
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
  return (
    <div className="flex min-h-[19.2rem] w-full flex-col justify-between p-4">
      <div className="flex items-center">
        <div className="flex-center h-14 w-14 rounded-full border-2 border-white bg-orange-500 font-bold text-white shadow-lg">
          {avatar ? (
            <Image
              src={avatar}
              alt="profile"
              width={50}
              height={50}
              className="h-full w-full rounded-full object-cover object-top"
            />
          ) : (
            <p>{name?.slice(0, 1)}</p>
          )}
        </div>
        <div className="ml-5 p-3">
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-zinc-500">{profession}</p>
        </div>
      </div>
      <p className="my-2 line-clamp-4">{testimonial}</p>
      <div className="flex-center mb-3">
        {Array.from({ length: rating }, (_, i) => (
          <FaStar key={i} className="mx-2 text-2xl text-orange-500" />
        ))}
      </div>
      <Link href={"#"} target="_blank" className="my-2">
        <Button className="!w-full">View Story</Button>
      </Link>
    </div>
  );
}
