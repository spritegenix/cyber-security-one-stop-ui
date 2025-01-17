"use client";
import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

export const REVIEW_BUSINESS_MUTATION = gql`
  mutation ReviewBusiness(
    $reviewBusinessId: ID
    $rating: Float
    $comment: String
    $businessId: ID
    $businessSlug: ID
    $toDelete: Boolean
  ) {
    reviewBusiness(
      id: $reviewBusinessId
      rating: $rating
      comment: $comment
      businessId: $businessId
      businessSlug: $businessSlug
      toDelete: $toDelete
    ) {
      id
      name
      slug
      message
    }
  }
`;

export function useReviewBusinessMutation() {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType("user");
  }, []);
  const [reviewBusinessMutation, { data, loading, error }] = useMutation(REVIEW_BUSINESS_MUTATION, {
    // onCompleted: (data) => {
    //   console.log("Business review completed:", data);
    // },
  });

  const reviewBusiness = async ({
    reviewBusinessId = undefined,
    rating = undefined,
    comment = undefined,
    businessId = undefined,
    businessSlug = undefined,
    toDelete = undefined,
  }: {
    reviewBusinessId?: string | undefined;
    rating?: number | undefined;
    comment?: string | undefined;
    businessId?: string | undefined;
    businessSlug?: string | undefined;
    toDelete?: boolean | undefined;
  }) => {
    try {
      const response = await reviewBusinessMutation({
        variables: {
          reviewBusinessId: reviewBusinessId,
          rating: rating,
          comment: comment,
          businessId: businessId,
          businessSlug: businessSlug,
          toDelete: toDelete,
        },
      });
      return { response: response?.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { reviewBusiness, data: data?.reviewBusiness, loading, error };
}

export const GET_REVIEW_WITH_ID = gql`
  query Query($businessId: ID, $businessSlug: ID) {
    getReviewWithId(businessId: $businessId, businessSlug: $businessSlug) {
      id
      rating
      comment
      message
      user {
        id
        name
        slug
        avatar
      }
    }
  }
`;

export const useGetReviewWithId = ({
  businessSlug,
  businessId,
}: {
  businessSlug: string;
  businessId?: string;
}) => {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("user");
  }, []);

  const [getReviewWithIdQuery, { data, loading, error, refetch }] =
    useLazyQuery(GET_REVIEW_WITH_ID);

  const fetchReview = async () => {
    try {
      const response = await getReviewWithIdQuery({
        variables: {
          businessSlug,
          businessId,
        },
      });
      // console.log("Review fetched successfully:", response?.data?.getReviewWithId);
      return { response: response?.data?.getReviewWithId, error: null };
    } catch (err) {
      console.error("Error fetching review:", err);
      return { response: null, error: err };
    }
  };

  return {
    data: data?.getReviewWithId,
    loading,
    error,
    refetch,
    fetchReview,
  };
};
