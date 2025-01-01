import Button from "@/components/elements/Button";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { subscriptionPage } from "@/data/global";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FirmsTestimonialsSlider } from "./_sections/FirmsTestimonialsSlider";
import Accordion1 from "@/components/elements/Accordions/Accordion1";

export default function SubscriptionPage() {
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
          {subscriptionPage?.plans.map((item, index) => (
            <SubscriptionCard
              key={index}
              title={item.title}
              description={item.description}
              monthlyPrice={item.monthlyPrice}
              totalPrice={item.totalPrice}
              index={index}
            />
          ))}
        </div>
      </Wrapper>
      {/* Testimonials  */}
      <Wrapper className="relative space-y-5 py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-bg1">What Makes Us the Preferred Choice</h2>
        <div className="sliderStyle relative">
          <FirmsTestimonialsSlider />
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
      {/* FAQ's  */}
      <Wrapper className="space-y-5 py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-bg1">Frequently Asked Questions</h2>
        <Accordion1 data={subscriptionPage?.faqs} />
      </Wrapper>
    </Layout>
  );
}

function SubscriptionCard({ title, description, monthlyPrice, totalPrice, index }: any) {
  return (
    <div
      className={`${index === 1 ? "md:scale-110" : ""} relative flex flex-col items-center justify-center gap-3 rounded-md border border-gray-300 bg-bg1 p-5 text-center text-white`}
    >
      { index === 1 && <Ribbon />}
      <h1 className="font-bold">
        <span className="text-4xl">{title}</span>
        <br />
        <span className="">Subscription</span>
      </h1>
      <h1 className="font-bold">
        <span className="text-3xl">₹ {monthlyPrice}</span> <span className="mt-auto">/month</span>
      </h1>
      <p>
        <TextWithLineBreak text={description} />
      </p>
      <Button variant="orange-gradient" className="w-full border !border-white">
        ₹ {totalPrice}
      </Button>
    </div>
  );
}

function Ribbon() {
  return (
    <div className="ribbon ribbon-top-right"><span>Popular</span></div>
  );
}
