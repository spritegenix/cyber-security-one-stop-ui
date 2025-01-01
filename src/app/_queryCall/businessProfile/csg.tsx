import { gql, useMutation } from "@apollo/client";

export const REVIEW_BUSINESS = gql`
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

// Custom hook for the ReviewBusiness mutation
export function useReviewBusiness() {
  const [reviewBusinessMutation, { data, loading, error }] = useMutation(REVIEW_BUSINESS, {
    onCompleted: (data) => {
      // Log or handle completion
      console.log("Business review completed:", data);
    },
  });

  const reviewBusiness = async ({
    reviewBusinessId,
    rating,
    comment,
    businessId,
    businessSlug,
    toDelete,
  }: {
    reviewBusinessId?: string;
    rating?: number;
    comment?: string;
    businessId?: string;
    businessSlug?: string;
    toDelete?: boolean;
  }) => {
    try {
      const response = await reviewBusinessMutation({
        variables: { reviewBusinessId, rating, comment, businessId, businessSlug, toDelete },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { reviewBusiness, queryResponse: data, loading, error };
}
