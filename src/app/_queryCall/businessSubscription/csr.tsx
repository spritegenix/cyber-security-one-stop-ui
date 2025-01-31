import useAuthStore from "@/zustandStore/authStore";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mutation to create a subscription order
export const BUSINESS_SUBSCRIPTION = gql`
  mutation BusinessSubscription($subscriptionId: ID!) {
    businessSubscription(subscriptionId: $subscriptionId) {
      id
      amount
      currency
      status
      receipt
      created_at
      message
    }
  }
`;

export const useCreateSubscription = () => {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType("firm");
  }, []);
  const [createSubscription, { data, loading, error }] = useMutation(BUSINESS_SUBSCRIPTION);

  return {
    createSubscription,
    data,
    loading,
    error,
  };
};

// Mutation to verify the payment
export const BUSINESS_VERIFY_PAYMENT = gql`
  mutation BusinessVerifyPayment(
    $razorpayOrderId: String!
    $razorpayPaymentId: String!
    $razorpaySignature: String!
  ) {
    businessVerifyPayment(
      razorpay_order_id: $razorpayOrderId
      razorpay_payment_id: $razorpayPaymentId
      razorpay_signature: $razorpaySignature
    ) {
      id
      name
      slug
      subscriptionId
      subscriptionExpire
      subscription {
        id
        name
        priceDescription
        description
        type
        price
        duration
        features
        order
        priority
        tierLevel
      }
      message
    }
  }
`;

export const useVerifyPayment = () => {
  const [verifyPayment, { data, loading, error }] = useMutation(BUSINESS_VERIFY_PAYMENT);

  return {
    verifyPayment,
    data,
    loading,
    error,
  };
};

export const GET_BUSINESS_DETAILS = gql`
  query Query {
    businessMe {
      id
      name
      primaryContacts {
        type
        value
        isVerified
        isPrimary
        order
      }
      type
      subscriptionId
      subscriptionExpire
      subscription {
        id
        name
        description
        type
        price
        duration
        features
        tierLevel
        message
      }
      paymentVerification
      razorpay_order_id
      businessDetails {
        logo
      }
    }
  }
`;

export const useGetBusinessDetails = () => {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType("firm");
  }, []);
  const token = useAuthStore((state) => state?.firmToken);
  const { data, loading, error, refetch } = useQuery(GET_BUSINESS_DETAILS, {
    fetchPolicy: "cache-and-network", // Fetch fresh data but use cache when available
    skip: !token,
  });
  if (error) {
    console.error(error?.message);
  }
  const userData = data?.businessMe;
  return { userData, loading, error, refetch };
};
