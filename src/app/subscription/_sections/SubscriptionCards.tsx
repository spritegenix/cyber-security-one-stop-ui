import TextWithLineBreak from "@/utils/TextWithLineBreak";
import React from "react";
import PaymentComponent from "./PaymentComponent";

export default function SubscriptionCards({ plans }: any) {
  return (
    <>
      {plans.map((item: any, index: number) => (
        <Card
          key={index}
          id={item?.id}
          title={item?.name}
          description={item?.description}
          monthlyPrice={item?.priceDescription}
          totalPrice={item?.price}
          index={index}
        />
      ))}
    </>
  );
}

function Card({ id, title, description, monthlyPrice, totalPrice, index }: any) {
  return (
    <div
      className={`${index === 1 ? "md:scale-110" : ""} relative flex flex-col items-center justify-center gap-3 rounded-md border border-gray-300 bg-bg1 p-5 text-center text-white`}
    >
      {index === 1 && <Ribbon />}
      <h1 className="font-bold">
        <span className="text-4xl capitalize">{title}</span>
        <br />
        <span className="">Subscription</span>
      </h1>
      <h1 className="font-bold">
        <span className="text-3xl">₹ {monthlyPrice}</span> <span className="mt-auto">/month</span>
      </h1>
      <p>
        <TextWithLineBreak text={description} />
      </p>
      <PaymentComponent subscriptionId={id} totalPrice={totalPrice} />
    </div>
  );
}

function Ribbon() {
  return (
    <div className="ribbon ribbon-top-right">
      <span>Popular</span>
    </div>
  );
}
