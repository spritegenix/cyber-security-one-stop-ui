import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

export const ADMIN_SEARCH_ALL_FEEDBACKS = gql`
  query AdminSearchAllFeedbacks(
    $search: String
    $page: Int
    $limit: Int
    $sortBy: SortByEnum
    $sortOrder: OrderEnum
  ) {
    adminSearchAllFeedbacks(
      search: $search
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      reviews {
        id
        rating
        comment
        businessId
        business {
          id
          name
          slug
        }
        userId
        user {
          id
          name
          slug
        }
        createdAt
        deletedAt
        updatedAt
        message
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminSearchAllFeedbacks() {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAllFeedbacks, { data, loading, error }] = useLazyQuery(ADMIN_SEARCH_ALL_FEEDBACKS, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched feedbacks successfully:", data);
    // },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching feedbacks:", err);
    },
  });

  const adminSearchAllFeedbacks = async (variables: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await fetchAllFeedbacks({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminSearchAllFeedbacks,
    data: data?.adminSearchAllFeedbacks,
    loading,
    error,
  };
}

export const ADMIN_SEARCH_ALL_REVIEWS = gql`
  query AdminSearchAllReviews(
    $search: String
    $page: Int
    $limit: Int
    $sortBy: SortByEnum
    $sortOrder: OrderEnum
  ) {
    adminSearchAllReviews(
      search: $search
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      reviews {
        id
        rating
        comment
        businessId
        business {
          id
          slug
          name
        }
        userId
        user {
          id
          slug
          name
        }
        createdAt
        deletedAt
        updatedAt
        message
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminSearchAllReviews() {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAllReviews, { data, loading, error }] = useLazyQuery(ADMIN_SEARCH_ALL_REVIEWS, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched reviews successfully:", data);
    // },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching reviews:", err);
    },
  });

  const adminSearchAllReviews = async (variables: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await fetchAllReviews({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminSearchAllReviews,
    data: data?.adminSearchAllReviews,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_TESTIMONIALS = gql`
  query AdminGetAllTestimonials(
    $type: AllTestimonialType
    $page: Int
    $limit: Int
    $sortBy: SortByEnum
    $sortOrder: OrderEnum
    $filter: AllTestimonialFilter
  ) {
    adminGetAllTestimonials(
      type: $type
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
      filter: $filter
    ) {
      testimonials {
        id
        reviewId
        feedbackId
        order
        type
        rating
        comment
        businessId
        business {
          id
          name
          slug
        }
        userId
        user {
          id
          name
          slug
        }
        createdAt
        deletedAt
        updatedAt
        message
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminGetAllTestimonials() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin"); // Ensure the token type is set to 'admin'
  }, []);

  const [fetchTestimonials, { data, loading, error, refetch }] = useLazyQuery(
    ADMIN_GET_ALL_TESTIMONIALS,
    {
      // onCompleted: (data: any) => {
      //   console.log("Fetched testimonials successfully:", data);
      // },
      onError: (err) => {
        console.error("Error fetching testimonials:", err);
      },
    },
  );

  const getTestimonials = ({
    type = "FEEDBACK",
    page = 1,
    limit = 100,
    sortBy,
    sortOrder,
    filter,
  }: {
    type?: "REVIEW" | "FEEDBACK" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
    filter?: "USER" | "BUSINESS" | undefined;
  }) => {
    fetchTestimonials({
      variables: { type, page, limit, sortBy, sortOrder, filter },
    });
  };

  return { getTestimonials, data, loading, error, refetch };
}

export const ADMIN_MANAGE_TESTIMONIALS = gql`
  mutation AdminManageTestimonials($testimonials: [TestimonialInput]) {
    adminManageTestimonials(testimonials: $testimonials) {
      id
      order
      type
      rating
      comment
      businessId
      business {
        id
        slug
        name
      }
      userId
      user {
        id
        slug
        name
      }
      createdAt
      deletedAt
      updatedAt
      message
    }
  }
`;

interface TestimonialInput {
  feedbackId?: string | undefined;
  id?: string | undefined;
  order?: number | undefined;
  reviewId?: string | undefined;
  toDelete?: boolean | undefined;
}

export function useAdminManageTestimonials() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  const [manageTestimonials, { data, loading, error }] = useMutation(ADMIN_MANAGE_TESTIMONIALS, {
    // onCompleted: (data: any) => {
    //   console.log("Successfully managed testimonials:", data);
    // },
    onError: (err: any) => {
      console.error("Error managing testimonials:", err);
    },
  });

  const adminManageTestimonials = async (testimonials: TestimonialInput[]) => {
    try {
      const response = await manageTestimonials({
        variables: { testimonials },
      });
      return { response: response?.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { adminManageTestimonials, data: data?.adminManageTestimonials, loading, error };
}
