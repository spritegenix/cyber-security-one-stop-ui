"use client";
import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ADMIN_LOGIN = gql`
  query AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      message
      token
    }
  }
`;
// Admin Login Query
export function useAdminLogin() {
  const router = useRouter();
  const { setAdminToken, setTokenType } = useAuthStore();
  const [fetchAdminLogin, { data, loading, error }] = useLazyQuery(ADMIN_LOGIN, {
    onCompleted: (data: any) => {
      if (data && data?.adminLogin) {
        const token = data?.adminLogin?.token;
        setAdminToken(token);
        setTokenType("admin");
      }
      // Redirect to profile page
      router.push("/admin/dashboard");
    },
  });

  const adminLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetchAdminLogin({
        variables: { email, password },
      });
      return { response: response?.data?.adminLogin, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { adminLogin, data, loading, error };
}

export const ADMIN_ALL_BUSINESSES = gql`
  query AdminAllBusinesses(
    $name: String
    $email: String
    $phone: String
    $isBusinessVerified: Boolean
    $subscriptionId: ID
    $hasSubscription: Boolean
    $categoryId: ID
    $averageRatingMin: Float
    $averageRatingMax: Float
    $isListed: Boolean
    $createdAtStart: String
    $createdAtEnd: String
    $page: Int
    $limit: Int
    $sortBy: AllBusinessesSortBy
    $sortOrder: SortOrder
  ) {
    adminAllBusinesses(
      name: $name
      email: $email
      phone: $phone
      isBusinessVerified: $isBusinessVerified
      subscriptionId: $subscriptionId
      hasSubscription: $hasSubscription
      categoryId: $categoryId
      averageRatingMin: $averageRatingMin
      averageRatingMax: $averageRatingMax
      isListed: $isListed
      createdAtStart: $createdAtStart
      createdAtEnd: $createdAtEnd
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      businesses {
        id
        name
        slug
        primaryContacts {
          type
          value
        }
        subscriptionId
        subscriptionExpire
        subscription {
          id
          name
          description
        }
        averageRating
        reviewCount
        isListed
        isBlocked
        paymentVerification
        businessDetails {
          coverImages {
            url
          }
          categories {
            id
            name
            slug
            description
          }
          logo
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminAllBusinesses() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAdminAllBusinesses, { data, loading, error }] = useLazyQuery(ADMIN_ALL_BUSINESSES, {
    onCompleted: (data: any) => {
      // console.log("Businesses fetched successfully:", data);
    },
  });

  const adminAllBusinesses = async (variables: {
    name?: string;
    email?: string;
    phone?: string;
    isBusinessVerified?: boolean;
    subscriptionId?: string;
    hasSubscription?: boolean;
    categoryId?: string;
    averageRatingMin?: number;
    averageRatingMax?: number;
    isListed?: boolean;
    createdAtStart?: string;
    createdAtEnd?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await fetchAdminAllBusinesses({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminAllBusinesses,
    data: data?.adminAllBusinesses,
    loading,
    error,
  };
}

export const ADMIN_GET_BUSINESS_BY_ID = gql`
  query AdminGetBusinessById($businessSlug: ID) {
    adminGetBusinessById(businessSlug: $businessSlug) {
      id
      name
      slug
      primaryContacts {
        id
        businessId
        type
        value
        isVerified
        isPrimary
        order
        verifiedAt
        createdAt
        updatedAt
        deletedAt
        message
        token
      }
      additionalContacts
      isBusinessVerified
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
        createdAt
        updatedAt
        deletedAt
        message
        token
      }
      averageRating
      reviewCount
      isListed
      isBlocked
      createdAt
      updatedAt
      deletedAt
      paymentVerification
      razorpay_order_id
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
      feedbacks {
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
      businessSupportingDocuments {
        id
        businessId
        type
        url
        createdAt
        updatedAt
        deletedAt
        message
        token
      }
      businessDetails {
        id
        registrationNumber
        license
        experience
        teamSize
        description
        websites {
          id
          type
          url
          createdAt
          deletedAt
          updatedAt
          businessDetailsId
          message
          token
        }
        primaryWebsite
        coverImages {
          id
          url
          order
          createdAt
          deletedAt
          updatedAt
          businessDetailsId
          message
          token
        }
        adBannerImages {
          id
          url
          order
          createdAt
          deletedAt
          updatedAt
          businessDetailsId
          message
          token
        }
        mobileAdBannerImages {
          id
          url
          order
          createdAt
          deletedAt
          updatedAt
          businessDetailsId
          message
          token
        }
        operatingHours {
          id
          createdAt
          deletedAt
          updatedAt
          dayOfWeek
          openingTime
          closingTime
          businessDetailsId
          message
          token
        }
        latitude
        longitude
        degrees
        languages {
          id
          name
          slug
          createdAt
          deletedAt
          updatedAt
          message
          token
        }
        proficiencies {
          id
          name
          slug
          createdAt
          deletedAt
          updatedAt
          message
          token
        }
        courts {
          id
          name
          slug
          createdAt
          deletedAt
          updatedAt
          message
          token
        }
        gstNumber
        categories {
          id
          name
          slug
          description
          createdAt
          deletedAt
          categoryImage
          updatedAt
          message
          token
        }
        tags {
          id
          name
          createdAt
          deletedAt
          updatedAt
          message
          token
        }
        addresses {
          id
          businessDetailsId
          createdAt
          deletedAt
          updatedAt
          order
          street
          city
          country
          pincode
          state
          message
          token
        }
        logo
        createdAt
        updatedAt
        deletedAt
        message
        token
      }
      price
      message
      token
      bookings {
        id
        date
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
    }
  }
`;

export function useAdminGetBusinessById() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAdminGetBusinessById, { data, loading, error }] = useLazyQuery(
    ADMIN_GET_BUSINESS_BY_ID,
    {
      onCompleted: (data: any) => {
        // console.log("Business details fetched successfully:", data);
      },
    },
  );

  const adminGetBusinessById = async (businessSlug: string) => {
    try {
      const response = await fetchAdminGetBusinessById({ variables: { businessSlug } });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminGetBusinessById,
    data: data?.adminGetBusinessById,
    loading,
    error,
  };
}

export const ADMIN_BLOCK_BUSINESSES = gql`
  mutation AdminBlockBusinesses($businesses: [BusinessesBlock]) {
    adminBlockBusinesses(businesses: $businesses) {
      id
      name
      slug
      isBlocked
      message
    }
  }
`;

export function useAdminBlockBusinesses() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [blockBusinessesMutation, { data, loading, error }] = useMutation(ADMIN_BLOCK_BUSINESSES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Businesses blocked successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error blocking businesses:", err);
    },
  });

  const adminBlockBusinesses = async (businesses: Array<{ id: string; isBlocked: boolean }>) => {
    try {
      const response = await blockBusinessesMutation({
        variables: { businesses },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminBlockBusinesses,
    data: data?.adminBlockBusinesses,
    loading,
    error,
  };
}

export const ADMIN_VERIFY_BUSINESSES = gql`
  mutation AdminVerifyBusinesses($businesses: [BusinessesVerify]) {
    adminVerifyBusinesses(businesses: $businesses) {
      id
      name
      slug
      isBusinessVerified
      message
    }
  }
`;

export function useAdminVerifyBusinesses() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [verifyBusinessesMutation, { data, loading, error }] = useMutation(
    ADMIN_VERIFY_BUSINESSES,
    {
      onCompleted: (data: any) => {
        // Handle successful response
        console.log("Businesses verified successfully:", data);
      },
      onError: (err: any) => {
        // Handle error response
        console.error("Error verifying businesses:", err);
      },
    },
  );

  const adminVerifyBusinesses = async (
    businesses: Array<{ id: string; isBusinessVerified: boolean }>,
  ) => {
    try {
      const response = await verifyBusinessesMutation({
        variables: { businesses },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminVerifyBusinesses,
    data: data?.adminVerifyBusinesses,
    loading,
    error,
  };
}

export const ADMIN_ALL_USERS = gql`
  query AdminAllUsers(
    $name: String
    $email: String
    $phone: String
    $subscriptionId: ID
    $hasSubscription: Boolean
    $isVerified: Boolean
    $createdAtStart: String
    $createdAtEnd: String
    $page: Int
    $limit: Int
    $sortBy: AllUsersSortBy
    $sortOrder: SortOrder
  ) {
    adminAllUsers(
      name: $name
      email: $email
      phone: $phone
      subscriptionId: $subscriptionId
      hasSubscription: $hasSubscription
      isVerified: $isVerified
      createdAtStart: $createdAtStart
      createdAtEnd: $createdAtEnd
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      users {
        id
        name
        slug
        contacts {
          type
          value
        }
        hideDetails
        isBlocked
        avatar
        subscriptionId
        subscriptionExpire
        subscription {
          id
          name
          description
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminAllUsers() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchAllUsers, { data, loading, error }] = useLazyQuery(ADMIN_ALL_USERS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched users successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching users:", err);
    },
  });

  const adminAllUsers = async (variables: {
    name?: string;
    email?: string;
    phone?: string;
    subscriptionId?: string;
    hasSubscription?: boolean;
    isVerified?: boolean;
    createdAtStart?: string;
    createdAtEnd?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await fetchAllUsers({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminAllUsers,
    data: data?.adminAllUsers,
    loading,
    error,
  };
}

export const ADMIN_GET_USER_BY_ID = gql`
  query AdminGetUserById($userId: ID, $userSlug: ID) {
    adminGetUserById(userId: $userId, userSlug: $userSlug) {
      id
      name
      slug
      contacts {
        id
        userId
        type
        value
        isVerified
        isPrimary
        order
        verifiedAt
        createdAt
        updatedAt
        deletedAt
        message
        token
      }
      hideDetails
      isBlocked
      avatar
      subscriptionId
      subscriptionExpire
      paymentVerification
      razorpay_order_id
      createdAt
      updatedAt
      deletedAt
      addresses {
        id
        userId
        createdAt
        deletedAt
        updatedAt
        order
        street
        city
        country
        pincode
        state
        message
        token
      }
      bookings {
        id
        date
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
      feedbacks {
        id
        rating
        comment
        userId
        createdAt
        deletedAt
        updatedAt
        message
        token
      }
      subscription {
        id
        name
        description
        price
        duration
        features
        createdAt
        updatedAt
        deletedAt
        message
      }
      message
      token
    }
  }
`;

export function useAdminGetUserById() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchUserById, { data, loading, error }] = useLazyQuery(ADMIN_GET_USER_BY_ID, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched user successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching user:", err);
    },
  });

  const adminGetUserById = async (variables: { userId?: string; userSlug?: string }) => {
    try {
      const response = await fetchUserById({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminGetUserById,
    data: data?.adminGetUserById,
    loading,
    error,
  };
}

export const ADMIN_BLOCK_USERS = gql`
  mutation AdminBlockUsers($users: [UsersBlock]) {
    adminBlockUsers(users: $users) {
      id
      name
      slug
      isBlocked
      avatar
    }
  }
`;

export function useAdminBlockUsers() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [blockUsers, { data, loading, error }] = useMutation(ADMIN_BLOCK_USERS, {
    onCompleted: (data: any) => {
      // Handle successful mutation
      console.log("Users blocked successfully:", data);
    },
    onError: (err: any) => {
      // Handle mutation error
      console.error("Error blocking users:", err);
    },
  });

  const adminBlockUsers = async (variables: { users: { id: string }[] }) => {
    try {
      const response = await blockUsers({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminBlockUsers,
    data: data?.adminBlockUsers,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_BUSINESS_SUBSCRIPTIONS = gql`
  query AdminGetAllBusinessSubscriptions {
    adminGetAllBusinessSubscriptions {
      id
      name
      description
      type
      price
      duration
      features
      tierLevel
      createdAt
      updatedAt
      deletedAt
      message
      token
    }
  }
`;

export function useAdminGetAllBusinessSubscriptions() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [fetchSubscriptions, { data, loading, error }] = useLazyQuery(
    ADMIN_GET_ALL_BUSINESS_SUBSCRIPTIONS,
    {
      onCompleted: (data: any) => {
        // Handle successful response
        console.log("Fetched subscriptions successfully:", data);
      },
      onError: (err: any) => {
        // Handle error response
        console.error("Error fetching subscriptions:", err);
      },
    },
  );

  const getAllBusinessSubscriptions = async () => {
    try {
      const response = await fetchSubscriptions();
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    getAllBusinessSubscriptions,
    data: data?.adminGetAllBusinessSubscriptions,
    loading,
    error,
  };
}

export const ADMIN_MANAGE_BUSINESS_SUBSCRIPTIONS = gql`
  mutation Mutation(
    $name: String!
    $price: Float!
    $duration: Int!
    $features: [String!]!
    $adminManageBusinessSubscriptionsId: ID
    $description: String
    $tierLevel: Int
    $toDelete: Boolean
  ) {
    adminManageBusinessSubscriptions(
      name: $name
      price: $price
      duration: $duration
      features: $features
      id: $adminManageBusinessSubscriptionsId
      description: $description
      tierLevel: $tierLevel
      toDelete: $toDelete
    ) {
      id
      name
      description
      type
      price
      duration
      features
      tierLevel
      createdAt
      updatedAt
      deletedAt
      message
      token
    }
  }
`;

export function useAdminManageBusinessSubscriptions() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [manageSubscription, { data, loading, error }] = useMutation(
    ADMIN_MANAGE_BUSINESS_SUBSCRIPTIONS,
    {
      onCompleted: (data: any) => {
        // Handle successful mutation
        console.log("Subscription managed successfully:", data);
      },
      onError: (err: any) => {
        // Handle mutation error
        console.error("Error managing subscription:", err);
      },
    },
  );

  const adminManageBusinessSubscriptions = async (variables: {
    name: string;
    price: number;
    duration: number;
    features: string[];
    adminManageBusinessSubscriptionsId?: string;
    description?: string;
    tierLevel?: number;
    toDelete?: boolean;
  }) => {
    try {
      const response = await manageSubscription({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageBusinessSubscriptions,
    data: data?.adminManageBusinessSubscriptions,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_USER_SUBSCRIPTIONS = gql`
  query Query {
    adminGetAllUserSubscriptions {
      id
      name
      description
      price
      duration
      features
      createdAt
      updatedAt
      deletedAt
      message
    }
  }
`;

export function useAdminGetAllUserSubscriptions() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_USER_SUBSCRIPTIONS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched subscriptions successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching subscriptions:", err);
    },
  });

  return {
    data: data?.adminGetAllUserSubscriptions,
    loading,
    error,
  };
}

export const ADMIN_MANAGE_USER_SUBSCRIPTIONS = gql`
  mutation Mutation(
    $name: String!
    $price: Float!
    $duration: Int!
    $features: [String!]!
    $adminManageUserSubscriptionsId: ID
    $description: String
    $toDelete: Boolean
  ) {
    adminManageUserSubscriptions(
      name: $name
      price: $price
      duration: $duration
      features: $features
      id: $adminManageUserSubscriptionsId
      description: $description
      toDelete: $toDelete
    ) {
      id
      name
      description
      price
      duration
      features
      createdAt
      updatedAt
      deletedAt
      message
    }
  }
`;

export function useAdminManageUserSubscriptions() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);
  useEffect(() => {
    setTokenType("admin");
  }, []);
  const [adminManageUserSubscriptions, { data, loading, error }] = useMutation(
    ADMIN_MANAGE_USER_SUBSCRIPTIONS,
  );

  const manageUserSubscription = async ({
    name,
    price,
    duration,
    features,
    adminManageUserSubscriptionsId,
    description,
    toDelete,
  }: {
    name: string;
    price: number;
    duration: number;
    features: string[];
    adminManageUserSubscriptionsId?: string;
    description?: string;
    toDelete?: boolean;
  }) => {
    try {
      const response = await adminManageUserSubscriptions({
        variables: {
          name,
          price,
          duration,
          features,
          adminManageUserSubscriptionsId,
          description,
          toDelete,
        },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { manageUserSubscription, data, loading, error };
}

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

export const ADMIN_GET_ALL_CATEGORIES = gql`
  query AdminGetAllCategories {
    adminGetAllCategories {
      id
      name
      slug
      description
      createdAt
      deletedAt
      categoryImage
      updatedAt
      businessesDetails {
        business {
          id
          slug
          name
        }
      }
      message
      token
    }
  }
`;

export function useAdminGetAllCategories() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch categories
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_CATEGORIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched categories successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching categories:", err);
    },
  });

  return {
    data: data?.adminGetAllCategories, // Return the fetched categories
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_CATEGORIES = gql`
  mutation AdminManageCategories($categories: [CategoryInput]) {
    adminManageCategories(categories: $categories) {
      id
      name
      slug
      description
      createdAt
      deletedAt
      categoryImage
      updatedAt
      businessesDetails {
        business {
          id
          name
          slug
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageCategories() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook for managing categories
  const [manageCategories, { data, loading, error }] = useMutation(ADMIN_MANAGE_CATEGORIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed categories:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing categories:", err);
    },
  });

  const adminManageCategories = async (categories: Array<any>) => {
    try {
      const response = await manageCategories({
        variables: { categories },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageCategories,
    data: data?.adminManageCategories,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_LANGUAGES = gql`
  query AdminGetAllLanguages {
    adminGetAllLanguages {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          name
          slug
        }
      }
      message
      token
    }
  }
`;

export function useAdminGetAllLanguages() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch languages
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_LANGUAGES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched languages successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching languages:", err);
    },
  });

  return {
    data: data?.adminGetAllLanguages, // Return the fetched languages
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_LANGUAGES = gql`
  mutation AdminManageLanguages($languages: [LanguageInput]) {
    adminManageLanguages(languages: $languages) {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          slug
          name
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageLanguages() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage languages
  const [manageLanguages, { data, loading, error }] = useMutation(ADMIN_MANAGE_LANGUAGES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed languages:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing languages:", err);
    },
  });

  const adminManageLanguages = async (languages: Array<any>) => {
    try {
      const response = await manageLanguages({
        variables: { languages },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageLanguages,
    data: data?.adminManageLanguages,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_COURTS = gql`
  query AdminGetAllCourts {
    adminGetAllCourts {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          slug
          name
        }
      }
      message
      token
    }
  }
`;

export function useAdminGetAllCourts() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch courts
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_COURTS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched courts successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching courts:", err);
    },
  });

  return {
    data: data?.adminGetAllCourts, // Return the fetched courts
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_COURTS = gql`
  mutation AdminManageCourts($courts: [CourtInput]) {
    adminManageCourts(courts: $courts) {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          slug
          name
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageCourts() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage courts
  const [manageCourts, { data, loading, error }] = useMutation(ADMIN_MANAGE_COURTS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed courts:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing courts:", err);
    },
  });

  const adminManageCourts = async (courts: Array<any>) => {
    try {
      const response = await manageCourts({
        variables: { courts },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageCourts,
    data: data?.adminManageCourts,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_PROFICIENCIES = gql`
  query AdminGetAllProficiencies {
    adminGetAllProficiencies {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          name
          slug
        }
      }
      message
      token
    }
  }
`;

export function useAdminGetAllProficiencies() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch proficiencies
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_PROFICIENCIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched proficiencies successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching proficiencies:", err);
    },
  });

  return {
    data: data?.adminGetAllProficiencies, // Return the fetched proficiencies
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_PROFICIENCIES = gql`
  mutation AdminManageProficiencies($proficiencies: [ProficiencyInput]) {
    adminManageProficiencies(proficiencies: $proficiencies) {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          name
          slug
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageProficiencies() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage proficiencies
  const [manageProficiencies, { data, loading, error }] = useMutation(ADMIN_MANAGE_PROFICIENCIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed proficiencies:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing proficiencies:", err);
    },
  });

  const adminManageProficiencies = async (proficiencies: Array<any>) => {
    try {
      const response = await manageProficiencies({
        variables: { proficiencies },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageProficiencies,
    data: data?.adminManageProficiencies,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_TAGS = gql`
  query AdminGetAllTags {
    adminGetAllTags {
      id
      name
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          name
          slug
        }
      }
      message
      token
    }
  }
`;

export function useAdminGetAllTags() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch tags
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_TAGS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched tags successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching tags:", err);
    },
  });

  return {
    data: data?.adminGetAllTags, // Return the fetched tags
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_TAGS = gql`
  mutation AdminManageTags($tags: [TagInput]) {
    adminManageTags(tags: $tags) {
      id
      name
      createdAt
      deletedAt
      updatedAt
      businessDetails {
        business {
          id
          name
          slug
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageTags() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage tags
  const [manageTags, { data, loading, error }] = useMutation(ADMIN_MANAGE_TAGS, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed tags:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing tags:", err);
    },
  });

  const adminManageTags = async (tags: Array<any>) => {
    try {
      const response = await manageTags({
        variables: { tags },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageTags,
    data: data?.adminManageTags,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_COUNTRIES = gql`
  query AdminGetAllCountries {
    adminGetAllCountries {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      message
      token
      states {
        id
        name
        cities {
          id
          name
          pincodes {
            id
            code
          }
        }
      }
    }
  }
`;

export function useAdminGetAllCountries() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch countries
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_COUNTRIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched countries successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching countries:", err);
    },
  });

  return {
    data: data?.adminGetAllCountries, // Return the fetched countries
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_COUNTRIES = gql`
  mutation AdminManageCountries($countries: [CountryInput]) {
    adminManageCountries(countries: $countries) {
      id
      name
      slug
      createdAt
      deletedAt
      updatedAt
      states {
        id
        name
        cities {
          id
          name
          pincodes {
            id
            code
          }
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageCountries() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage countries
  const [manageCountries, { data, loading, error }] = useMutation(ADMIN_MANAGE_COUNTRIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed countries:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing countries:", err);
    },
  });

  const adminManageCountries = async (countries: Array<any>) => {
    try {
      const response = await manageCountries({
        variables: { countries },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageCountries,
    data: data?.adminManageCountries,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_STATES = gql`
  query AdminGetAllStates {
    adminGetAllStates {
      id
      name
      slug
      countryId
      country {
        id
        name
      }
      createdAt
      deletedAt
      updatedAt
      cities {
        id
        name
        pincodes {
          id
          code
        }
      }
      message
      token
    }
  }
`;

export function useAdminGetAllStates() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch states
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_STATES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched states successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching states:", err);
    },
  });

  return {
    data: data?.adminGetAllStates, // Return the fetched states
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_STATES = gql`
  mutation AdminManageStates($states: [StateInput]) {
    adminManageStates(states: $states) {
      id
      name
      slug
      countryId
      country {
        id
        name
      }
      createdAt
      deletedAt
      updatedAt
      cities {
        id
        name
        pincodes {
          id
          code
        }
      }
      message
      token
    }
  }
`;

export function useAdminManageStates() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage states
  const [manageStates, { data, loading, error }] = useMutation(ADMIN_MANAGE_STATES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed states:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing states:", err);
    },
  });

  const adminManageStates = async (states: Array<any>) => {
    try {
      const response = await manageStates({
        variables: { states },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageStates,
    data: data?.adminManageStates,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_CITIES = gql`
  query AdminGetAllCities {
    adminGetAllCities {
      id
      name
      slug
      stateId
      state {
        id
        name
        country {
          id
          name
        }
      }
      createdAt
      deletedAt
      updatedAt
      pincodes {
        id
        code
      }
      message
      token
    }
  }
`;

export function useAdminGetAllCities() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch cities
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_CITIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched cities successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching cities:", err);
    },
  });

  return {
    data: data?.adminGetAllCities, // Return the fetched cities
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_CITIES = gql`
  mutation AdminManageCities($cities: [CityInput]) {
    adminManageCities(cities: $cities) {
      id
      name
      slug
      stateId
      state {
        id
        name
        country {
          id
          name
        }
      }
      createdAt
      deletedAt
      updatedAt
      pincodes {
        id
        code
      }
      message
      token
    }
  }
`;

export function useAdminManageCities() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage cities
  const [manageCities, { data, loading, error }] = useMutation(ADMIN_MANAGE_CITIES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed cities:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing cities:", err);
    },
  });

  const adminManageCities = async (cities: Array<any>) => {
    try {
      const response = await manageCities({
        variables: { cities },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManageCities,
    data: data?.adminManageCities,
    loading,
    error,
  };
}

export const ADMIN_GET_ALL_PINCODES = gql`
  query AdminGetAllPincodes {
    adminGetAllPincodes {
      id
      code
      slug
      cityId
      city {
        id
        name
        state {
          id
          name
          country {
            id
            name
          }
        }
      }
      createdAt
      deletedAt
      updatedAt
      message
      token
    }
  }
`;

export function useAdminGetAllPincodes() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch pincodes
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_PINCODES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Fetched pincodes successfully:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching pincodes:", err);
    },
  });

  return {
    data: data?.adminGetAllPincodes, // Return the fetched pincodes
    loading, // Loading state
    error, // Error state
  };
}

export const ADMIN_MANAGE_PINCODES = gql`
  mutation AdminManagePincodes($pincodes: [PincodeInput]) {
    adminManagePincodes(pincodes: $pincodes) {
      id
      code
      slug
      cityId
      city {
        id
        name
        state {
          id
          name
          country {
            id
            name
          }
        }
      }
      createdAt
      deletedAt
      updatedAt
      message
      token
    }
  }
`;

export function useAdminManagePincodes() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  // Set the token type to 'admin' on mount
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage pincodes
  const [managePincodes, { data, loading, error }] = useMutation(ADMIN_MANAGE_PINCODES, {
    onCompleted: (data: any) => {
      // Handle successful response
      console.log("Successfully managed pincodes:", data);
    },
    onError: (err: any) => {
      // Handle error response
      console.error("Error managing pincodes:", err);
    },
  });

  const adminManagePincodes = async (pincodes: Array<any>) => {
    try {
      const response = await managePincodes({
        variables: { pincodes },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminManagePincodes,
    data: data?.adminManagePincodes,
    loading,
    error,
  };
}
