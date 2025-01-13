import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

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
        }
        proficiencies {
          id
          name
          slug
          createdAt
          deletedAt
          updatedAt
          message
        }
        courts {
          id
          name
          slug
          createdAt
          deletedAt
          updatedAt
          message
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
        }
        tags {
          id
          name
          createdAt
          deletedAt
          updatedAt
          message
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
        }
        logo
        createdAt
        updatedAt
        deletedAt
        message
      }
      price
      message
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