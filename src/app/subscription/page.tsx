import Button from "@/components/elements/Button";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { subscriptionPage } from "@/data/global";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FirmsTestimonialsSlider } from "./_sections/FirmsTestimonialsSlider";
import Accordion1 from "@/components/elements/Accordions/Accordion1";
import { fetchTestimonialsSSR } from "../_queryCall/ssr";
import { fetchBusinessSubscriptionsSSR } from "../_queryCall/businessSubscription/ssr";
import SubscriptionCards from "./_sections/SubscriptionCards";

export default async function SubscriptionPage() {
  const testimonials = await fetchTestimonialsSSR({ type: "FEEDBACK", page: 1, limit: 10 });
  const plans = await fetchBusinessSubscriptionsSSR();
  console.log(plans, "plans");
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <Wrapper isTop2={true} className="mb-10 mt-3">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h1 className="mb-3 text-3xl font-bold text-bg1">{subscriptionPage?.title}</h1>
            <p>
              <TextWithLineBreak text={subscriptionPage?.description} />
            </p>
            <ul>
              {subscriptionPage?.features.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-xl font-medium">
                  <IoCheckmarkDoneSharp className="text-bold text-4xl text-green-600" />
                  <TextWithLineBreak text={item} />
                </li>
              ))}
            </ul>
          </div>
          <SubscriptionCards plans={plans} />
        </div>
      </Wrapper>
      {/* Testimonials  */}
      {testimonials?.allTestimonials.length > 0 && (
        <Wrapper className="relative space-y-5 py-16">
          <h2 className="mb-5 text-center text-3xl font-bold text-bg1">
            What Makes Us the Preferred Choice
          </h2>
          <div className="sliderStyle relative">
            <FirmsTestimonialsSlider testimonials={testimonials?.allTestimonials} />
          </div>
          <div className="relative mx-auto !-mt-60 h-64 w-full rounded-2xl bg-bg1">
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
      {/* FAQ's  */}
      <Wrapper className="space-y-5 py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-bg1">Frequently Asked Questions</h2>
        <Accordion1 data={subscriptionPage?.faqs} />
      </Wrapper>
    </Layout>
  );
}
