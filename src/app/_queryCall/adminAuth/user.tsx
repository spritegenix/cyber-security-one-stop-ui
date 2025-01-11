"use client";
import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

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

  // Set the token type to "admin" when the hook is used
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Apollo lazy query hook
  const [fetchAllUsers, { data, loading, error, refetch }] = useLazyQuery(ADMIN_ALL_USERS, {
    // onCompleted: (data) => {
    //   console.log("Fetched users successfully:", data);
    // },
    onError: (err) => {
      console.error("Error fetching users:", err);
    },
  });

  // API function to call the query
  const adminAllUsers = async ({
    name = undefined,
    email = undefined,
    phone = undefined,
    subscriptionId = undefined,
    hasSubscription = undefined,
    isVerified = undefined,
    createdAtStart = undefined,
    createdAtEnd = undefined,
    page = 1,
    limit = 5,
    sortBy = undefined,
    sortOrder = undefined,
  }: {
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
    sortBy?: "alphabetical" | "createdAt" | "updatedAt";
    sortOrder?: "asc" | "desc";
  }) => {
    try {
      const response = await fetchAllUsers({
        variables: {
          name,
          email,
          phone,
          subscriptionId,
          hasSubscription,
          isVerified,
          createdAtStart,
          createdAtEnd,
          page,
          limit,
          sortBy,
          sortOrder,
        },
      });
      return { response: response?.data?.adminAllUsers, error: null, refetch };
    } catch (err) {
      return { response: null, error: err, loading: false };
    }
  };

  return { adminAllUsers, data: data?.adminAllUsers || null, loading, error, refetch };
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
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching user:", err);
    },
  });

  const adminGetUserById = async ({
    userId = undefined,
    userSlug = undefined,
  }: {
    userId?: string;
    userSlug?: string;
  }) => {
    try {
      const response = await fetchUserById({ variables: { userId: userId, userSlug: userSlug } });
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
  const setTokenType = useAuthStore((state: any) => state.setTokenType);
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Apollo Client's useMutation
  const [blockUsers, { data, loading, error }] = useMutation(ADMIN_BLOCK_USERS, {
    onError: (err: any) => {
      console.error("Error blocking users:", err);
    },
  });

  // Mutation function
  const adminBlockUsers = async (userIds: string[]) => {
    try {
      const response = await blockUsers({ variables: { users: userIds } });
      return { response: response.data?.adminBlockUsers, error: null };
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
