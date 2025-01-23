import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { TestimonialSlider } from "@/app/_sections/TestimonialSlider";
import HomeHero from "@/app/_sections/HomeHero";
import Categories from "@/app/_sections/Categories";
import React from "react";
import { AdBannerSlider } from "./_sections/AdBannerSlider";
import { fetchCategoriesSSR, fetchTestimonialsSSR } from "./_queryCall/ssr";

export const revalidate = 1000; // Rebuild the page every hour

export default async function Home() {
  // Checking Loading Page
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // Checking Error Page
  // throw new Error("This is a test error!");
  const categories = await fetchCategoriesSSR();
  const testimonials = await fetchTestimonialsSSR({ type: "REVIEW", page: 1, limit: 10 });
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <HomeHero />
      <Categories categories={categories?.allCategories} />
      {/* AdBannerSlider  */}
      <Wrapper className="swiperStyle2 relative">
        <AdBannerSlider />
      </Wrapper>
      {/* Testimonials  */}
      {testimonials?.allTestimonials.length > 0 && (
        <Wrapper className="relative space-y-5 py-16">
          <h2 className="mb-5 text-center text-3xl font-bold text-bg1">What Client Say About Us</h2>
          <div className="sliderStyle relative">
            <TestimonialSlider testimonials={testimonials?.allTestimonials} />
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
      )}
    </Layout>
  );
}
