"use client";
import { useLocationStore } from "@/zustandStore/location";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      name
      slug
      description
      categoryImage
    }
  }
`;

// Hook for fetching all categories
export const useFetchAllCategories = () => {
  const { data, loading, error, refetch } = useQuery<{ allCategories: any[] }>(GET_ALL_CATEGORIES);

  return {
    allCategoriesList: data?.allCategories || [], // Default to an empty array if data is undefined
    loading,
    error,
    refetch,
  };
};

export const SEARCH_AUTOSUGGESTION = gql`
  query Search(
    $verified: Boolean
    $minPrice: Float
    $maxPrice: Float
    $minRating: Float
    $sortBy: SortByEnum
    $order: OrderEnum
    $categoryId: ID
    $categorySlug: ID
    $languages: [String!]
    $courts: [String!]
    $proficiencies: [String!]
    $pincode: String
    $city: String
    $state: String
    $country: String
    $search: String
    $page: Int
    $limit: Int
  ) {
    search(
      verified: $verified
      minPrice: $minPrice
      maxPrice: $maxPrice
      minRating: $minRating
      sortBy: $sortBy
      order: $order
      categoryId: $categoryId
      categorySlug: $categorySlug
      languages: $languages
      courts: $courts
      proficiencies: $proficiencies
      pincode: $pincode
      city: $city
      state: $state
      country: $country
      search: $search
      page: $page
      limit: $limit
    ) {
      businesses {
        businessDetails {
          addresses {
            id
            city
            country
            state
          }
          logo
        }
        id
        name
        slug
      }
      categories {
        id
        name
        slug
        description
        categoryImage
      }
      total
      page
      limit
      totalPages
    }
  }
`;

// Hook for SeachBar suggestions
export const useSearchAutoSuggestion = () => {
  const { location } = useLocationStore();

  // Using useLazyQuery for imperative fetching
  const [fetchSuggestions, { data, loading, error, refetch }] = useLazyQuery(
    SEARCH_AUTOSUGGESTION,
    { fetchPolicy: "network-only" },
  );

  const getSuggestions = async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      await fetchSuggestions({
        variables: {
          search,
          page,
          limit,
          city: location?.city,
          state: location?.state,
          country: location?.country,
          pincode: location?.pincode,
        },
      });

      // Check if data is undefined and refetch if needed
      if (!data) {
        console.warn("Data is undefined. Attempting refetch...");
        const refetchedData = await refetch();
        return { searchResults: refetchedData?.data?.search, loading, error: null, refetch };
      }

      return { searchResults: data?.search, loading, error, refetch };
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      return { searchResults: null, error: err, loading: false };
    }
  };

  return { getSuggestions, loading, error, refetch };
};

const GET_LOCATION = gql`
  query Location($search: String) {
    location(search: $search) {
      pincodes {
        code
        city {
          name
          state {
            name
            country {
              name
            }
          }
        }
      }
      cities {
        name
        state {
          name
          country {
            name
          }
        }
      }
      states {
        name
        country {
          name
        }
      }
      countries {
        name
      }
    }
  }
`;

// Hook for SeachBar Location
export const useGetLocation = () => {
  const [fetchSuggestions, { data, loading, error, refetch }] = useLazyQuery(GET_LOCATION, {
    fetchPolicy: "network-only",
  });

  const getLocation = async ({ search }: { search?: string | null | undefined }) => {
    try {
      // Execute the query with variables
      await fetchSuggestions({
        variables: { search },
      });

      // Return the fetched data or handle refetch if `data` is undefined
      if (!data) {
        console.warn("Data is undefined. Attempting refetch...");
        const refetchedData = await refetch();
        return {
          searchResults: refetchedData?.data?.location || null,
          loading,
          error: null,
          refetch,
        };
      }

      return {
        searchResults: data?.location || null,
        loading,
        error,
        refetch,
      };
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      return {
        searchResults: null,
        error: err,
        loading: false,
      };
    }
  };

  return { getLocation, loading, error, refetch };
};

const FILTER_BUSINESS = gql`
  query Search(
    $minPrice: Float
    $maxPrice: Float
    $minRating: Float
    $sortBy: SortByEnum
    $order: OrderEnum
    $categoryId: ID
    $categorySlug: ID
    $languages: [String!]
    $courts: [String!]
    $proficiencies: [String!]
    $pincode: String
    $city: String
    $state: String
    $country: String
    $search: String
    $page: Int
    $limit: Int
    $verified: Boolean
  ) {
    search(
      minPrice: $minPrice
      maxPrice: $maxPrice
      minRating: $minRating
      sortBy: $sortBy
      order: $order
      categoryId: $categoryId
      categorySlug: $categorySlug
      languages: $languages
      courts: $courts
      proficiencies: $proficiencies
      pincode: $pincode
      city: $city
      state: $state
      country: $country
      search: $search
      page: $page
      limit: $limit
      verified: $verified
    ) {
      businesses {
        id
        name
        slug
        primaryContacts {
          type
          value
          __typename
        }
        isBusinessVerified
        averageRating
        reviewCount
        businessDetails {
          categories {
            description
            slug
            name
            id
            __typename
          }
          experience
          __typename
          coverImages {
            id
            url
            order
          }
          addresses {
            id
            order
            street
            pincode
            city
            state
            country
          }
        }
        __typename
      }
      categories {
        id
        name
        slug
        description
        categoryImage
        __typename
      }
      total
      page
      limit
      totalPages
      __typename
    }
  }
`;

// Hook for Filter Business
export const useFilterBusiness = () => {
  const { location } = useLocationStore();

  const [fetchSuggestions, { data, loading, error, refetch }] = useLazyQuery(FILTER_BUSINESS, {
    // onCompleted: (data) => {
    //   console.log(data, "Businesses fetched successfully:");
    // },
  });

  const getAllRelatedBusinesses = async ({
    categorySlug = undefined,
    verified = false,
    minRating = undefined,
    sortBy = "alphabetical",
    order = "desc",
    page = 1,
    limit = 10,
  }: {
    categorySlug?: string;
    verified?: boolean;
    minRating?: number;
    sortBy?: string;
    order?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      await fetchSuggestions({
        variables: {
          categorySlug,
          page,
          limit,
          city: location?.city,
          state: location?.state,
          country: location?.country,
          pincode: location?.pincode,
          verified,
          minRating,
          sortBy,
          order,
        },
      });
      return { searchResults: data?.search, loading, error, refetch };
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      return { searchResults: null, error: err, loading: false };
    }
  };

  return { getAllRelatedBusinesses, data, loading, error, refetch };
};

const GET_ALL_AD_BANNER = gql`
  query Query {
    getAllAddBanners {
      id
      order
      businessAdBannerImage {
        id
        url
        order
        businessDetails {
          business {
            id
            slug
            name
          }
        }
        message
      }
      message
    }
    getAllMobileAddBanners {
      id
      order
      businessMobileAdBannerImage {
        id
        url
        order
        businessDetails {
          business {
            id
            slug
            name
          }
        }
        message
      }
      message
    }
  }
`;

export const useFetchAllAdBanners = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_AD_BANNER);

  return { data, loading, error, refetch };
};

const ADMIN_CHANGE_PASSWORD = gql`
  mutation AdminChangePassword($password: String!) {
    adminChangePassword(password: $password) {
      id
      name
      email
      message
    }
  }
`;

export const useAdminChangePassword = () => {
  const [adminChangePasswordMutation, { data, loading, error }] = useMutation<{
    adminChangePassword: {
      id: string;
      name: string;
      email: string;
      message: string;
    };
  }>(ADMIN_CHANGE_PASSWORD);

  const adminChangePassword = async (password: string) => {
    try {
      const response = await adminChangePasswordMutation({
        variables: { password },
      });
      return response.data?.adminChangePassword;
    } catch (err) {
      console.error("Error changing admin password:", err);
      throw err;
    }
  };

  return {
    adminChangePassword,
    data: data?.adminChangePassword,
    loading,
    error,
  };
};

// Define the RaiseQuery mutation
const RAISE_QUERY = gql`
  mutation RaiseQuery(
    $name: String
    $email: String!
    $phone: String
    $subject: String
    $message: String
  ) {
    raiseQuery(name: $name, email: $email, phone: $phone, subject: $subject, message: $message) {
      message
    }
  }
`;

// Custom hook for the RaiseQuery mutation
export const useRaiseQuery = () => {
  const [raiseQueryMutation, { data, loading, error }] = useMutation<{
    raiseQuery: { message: string };
  }>(RAISE_QUERY);

  const raiseQuery = async ({
    name,
    email,
    phone,
    subject,
    message,
  }: {
    name?: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
  }) => {
    try {
      const response = await raiseQueryMutation({
        variables: { name, email, phone, subject, message },
      });
      return response.data?.raiseQuery.message;
    } catch (err) {
      console.error("Error raising query:", err);
      throw err;
    }
  };

  return { raiseQuery, data: data?.raiseQuery, loading, error };
};
