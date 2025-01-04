import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery } from "@apollo/client";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import { useEffect } from "react";
>>>>>>> 1a1aa5c (Category / Testimonial)

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
      if (data && data?.businessLogin) {
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
    setTokenType("firm");
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
    setTokenType("firm");
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
