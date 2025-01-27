"use client";
import {
  useCreateSubscription,
  useGetBusinessDetails,
  useVerifyPayment,
} from "@/app/_queryCall/businessSubscription/csr";
import { logoDark } from "@/assets";
import Button from "@/components/elements/Button";
import Env from "@/lib/env";
import React from "react";

const PaymentComponent = ({
  subscriptionId,
  totalPrice,
}: {
  subscriptionId: string;
  totalPrice: number;
}) => {
  const { userData, loading, error, refetch } = useGetBusinessDetails();

  const {
    createSubscription,
    data: subscriptionData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useCreateSubscription();
  const {
    verifyPayment,
    data: verifyData,
    loading: verifyLoading,
    error: verifyError,
  } = useVerifyPayment();

  const handlePayment = async () => {
    try {
      // Step 1: Create a subscription order
      const response = await createSubscription({ variables: { subscriptionId } });
      const { id, amount, currency } = response.data.businessSubscription;

      // Step 2: Razorpay payment configuration
      const options = {
        key: Env.RAZORPAY_API_KEY, // Razorpay Public Key
        amount: amount, // Amount in the smallest currency unit
        currency: currency,
        name: "Cyber Security | One stop Solution",
        description: "Take Subscription to Rank on search",
        image:
          "https://cyber-bucket-2.blr1.cdn.digitaloceanspaces.com/favicon/Cyber%20Security%20One%20Stop%20Logo.jpg",
        order_id: id,
        handler: async function (response: any) {
          //     alert(response.razorpay_payment_id);
          //     alert(response.razorpay_order_id);
          //   alert(response.razorpay_signature);
          try {
            await verifyPayment({
              variables: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            });
            alert("Payment Verified Successfully!");
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: userData?.name, //your customer's name
          email:
            userData?.primaryContacts?.find((contact: any) => contact?.type === "EMAIL")?.value ||
            "",
          contact:
            userData?.primaryContacts?.find((contact: any) => contact?.type === "PHONE")?.value ||
            "",
        },
        notes: {
          address: "India",
        },
        theme: {
          color: "#e03944",
        },
      };

      // Step 4: Open Razorpay Checkout
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (createError) {
      console.error("Error creating subscription:", createError);
      alert("Failed to create subscription. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="w-full">
        <Button
          variant="orange-gradient"
          onClick={handlePayment}
          className="w-full border !border-white"
        >
          ₹ {totalPrice}
        </Button>
        {subscriptionLoading && (
          <p className="text-center text-sm text-white">Creating subscription...</p>
        )}
        {subscriptionError && (
          <p className="text-center text-sm text-white">Error: {subscriptionError.message}</p>
        )}
        {verifyLoading && <p className="text-center text-sm text-white">Verifying payment...</p>}
        {verifyError && (
          <p className="text-center text-sm text-white">Error: {verifyError.message}</p>
        )}
      </div>
      {userData?.subscription?.id === subscriptionId && (
        <p className="mt-3 text-center text-sm font-semibold text-white">
          will be expire at {new Date(userData?.subscriptionExpire).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default PaymentComponent;
