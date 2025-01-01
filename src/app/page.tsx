import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { TestimonialSlider } from "@/app/_sections/TestimonialSlider";
import HomeHero from "@/app/_sections/HomeHero";
import Categories from "@/app/_sections/Categories";
import React, { useEffect } from "react";
import { AdBannerSlider } from "./_sections/AdBannerSlider";

// export const revalidate = 3600; // Rebuild the page every hour

export default async function Home() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <HomeHero />
      <Categories />
      {/* AdBannerSlider  */}
      <Wrapper className="swiperStyle2 relative">
        <AdBannerSlider />
      </Wrapper>
      {/* Testimonials  */}
      <Wrapper className="relative space-y-5 py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-bg1">What Client Say About Us</h2>
        <div className="sliderStyle relative">
          <TestimonialSlider />
        </div>
        <div className="relative mx-auto !-mt-60 h-64 w-full overflow-hidden rounded-2xl bg-bg1 max-sm:hidden">
          {/* Line Animation  */}
          <div className="line-shape first flex h-full w-full flex-wrap">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}
