"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import useAuthStore from "@/zustandStore/authStore";
import { useEffect } from "react";

const FEEDBACK_MUTATION = gql`
  mutation Mutation($feedbackId: ID, $rating: Float, $comment: String, $toDelete: Boolean) {
    feedback(id: $feedbackId, rating: $rating, comment: $comment, toDelete: $toDelete) {
      id
      rating
      comment
      message
    }
  }
`;

export function useFeedbackMutation({ userType }: { userType: "firm" | "user" }) {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType(userType);
  }, [userType]);

  const [feedbackMutation, { data, loading, error }] = useMutation(FEEDBACK_MUTATION, {
    // onCompleted: (data: any) => {
    //   console.log("Feedback mutation completed:", data);
    // },
  });

  const submitFeedback = async ({
    feedbackId,
    rating,
    comment,
    toDelete,
  }: {
    feedbackId?: string | undefined;
    rating?: number | undefined;
    comment?: string | undefined;
    toDelete?: boolean | undefined;
  }) => {
    try {
      const response = await feedbackMutation({
        variables: {
          feedbackId: feedbackId || undefined,
          rating: rating || undefined,
          comment: comment || undefined,
          toDelete: toDelete || undefined,
        },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { submitFeedback, data: data?.feedback, loading, error };
}

const GET_USER_FEEDBACK = gql`
  query UserMeFeedback {
    userMe {
      feedbacks {
        id
        rating
        comment
      }
      id
      slug
      name
      avatar
    }
  }
`;

const GET_FIRM_FEEDBACK = gql`
  query BusinessMe {
    businessMe {
      feedbacks {
        id
        rating
        comment
      }
      id
      slug
      name
      businessDetails {
        logo
      }
    }
  }
`;

export function useGetUserFirmFeedback({ userType }: { userType: "firm" | "user" }) {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType(userType);
  }, [userType]);

  const token = useAuthStore((state) => (userType === "firm" ? state.firmToken : state.userToken));
  const { data, loading, error, refetch } = useQuery(
    userType === "firm" ? GET_FIRM_FEEDBACK : GET_USER_FEEDBACK,
    {
      fetchPolicy: "cache-and-network", // Fetch fresh data but use cache when available
      skip: !token,
      onCompleted: () => {
        console.log("user data for profile page", data);
      },
    },
  );
  if (error) {
    console.log(error?.message);
  }

  const feedbackData = userType === "firm" ? data?.businessMe : data?.userMe;
  return { feedbackData, loading, error, refetch };
}
