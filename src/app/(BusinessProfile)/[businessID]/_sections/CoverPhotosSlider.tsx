"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Modal from "@/components/elements/Modal";

export const CoverPhotosSlider = ({ data }: any) => {
  const uniqueId = "CoverPhotosSlider123";

  // Calculate max slides per view based on data length
  const calculateSlidesPerView = (slides: number) => Math.min(slides, data.length);

  const swiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    autoplay: { delay: 5000, disableOnInteraction: false },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Navigation],
    breakpoints: {
      640: { slidesPerView: calculateSlidesPerView(2) },
      768: { slidesPerView: calculateSlidesPerView(3) },
      1024: { slidesPerView: calculateSlidesPerView(5) },
    },
  };

  return (
    <>
      <Swiper {...swiperOptions} className="w-full">
        {data?.map((item: any, index: number) => (
          <SwiperSlide key={index} className="w-full">
            <Card image={item} index={index} imageLength={data.length} data={data} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`${uniqueId}-next text-grey1 absolute bottom-0 left-1 z-10 flex h-full cursor-pointer items-center justify-center bg-slate-50/70 px-2 shadow-lg hover:bg-slate-50`}
      >
        &lt;
      </div>
      <div
        className={`${uniqueId}-prev text-grey1 absolute bottom-0 right-1 z-10 flex h-full cursor-pointer items-center justify-center bg-slate-50/70 px-2 shadow-lg hover:bg-slate-50`}
      >
        {" "}
        &gt;
      </div>
    </>
  );
};

export default function Card({ image, index, imageLength, data }: any) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(index);

  // Get the image based on the current index
  const currentImage = data[currentIndex];

  return (
    <>
      <div className="h-36 w-full">
        <Image
          src={image}
          alt="image"
          width={500}
          height={344}
          className="h-full w-full cursor-pointer object-cover"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal
          handlePrevious={() => setCurrentIndex((currentIndex - 1 + imageLength) % imageLength)}
          handleNext={() => setCurrentIndex((currentIndex + 1) % imageLength)}
          onClose={() => setIsModalOpen(false)}
        >
          <Image
            src={currentImage}
            alt="Selected image"
            className="max-h-[90vh] w-auto rounded-md object-contain"
            width={1000}
            height={800}
          />
        </Modal>
      )}
    </>
  );
}
