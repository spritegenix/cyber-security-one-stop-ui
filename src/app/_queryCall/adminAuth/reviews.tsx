import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
        token
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
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAllFeedbacks, { data, loading, error }] = useLazyQuery(ADMIN_SEARCH_ALL_FEEDBACKS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched feedbacks successfully:", data);
    },
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
        token
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
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAllReviews, { data, loading, error }] = useLazyQuery(ADMIN_SEARCH_ALL_REVIEWS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched reviews successfully:", data);
    },
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
  query AdminGetAllTestimonials {
    adminGetAllTestimonials {
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
      token
    }
  }
`;

export function useAdminGetAllTestimonials() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch testimonials
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_TESTIMONIALS, {
    onCompleted: (data: any) => {
      // Log or handle successful response
      console.log("Fetched testimonials successfully:", data);
    },
    onError: (err: any) => {
      // Log or handle error response
      console.error("Error fetching testimonials:", err);
    },
  });

  return {
    data: data?.adminGetAllTestimonials, // Return the fetched testimonials
    loading, // Loading state
    error, // Error state
  };
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
      token
    }
  }
`;

export function useAdminManageTestimonials() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook for managing testimonials
  const [manageTestimonials, { data, loading, error }] = useMutation(ADMIN_MANAGE_TESTIMONIALS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed testimonials:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing testimonials:", err);
    },
  });

  const adminManageTestimonials = async (testimonials: Array<any>) => {
    try {
      const response = await manageTestimonials({
        variables: { testimonials },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageTestimonials,
    data: data?.adminManageTestimonials,
    loading,
    error,
  };
}
