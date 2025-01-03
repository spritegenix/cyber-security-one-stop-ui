"use client";
import { useLocationStore } from "@/zustandStore/location";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      name
      slug
      categoryImage
    }
  }
`;

// Hook for fetching all categories
export const useFetchAllCategories = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_CATEGORIES);
  return { allCategoriesList: data?.allCategories, loading, error, refetch };
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
      // Execute the query with variables
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
    fetchPolicy: "network-only",
  });

  const getAllRelatedBusinesses = async ({
    categorySlug,
    verified,
    minRating,
    sortBy = "alphabetical",
    order = "desc",
    page = 1,
    limit = 10,
  }: any) => {
    try {
      await fetchSuggestions({
        variables: {
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
          categorySlug,
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

  return { getAllRelatedBusinesses, data, loading, error, refetch };
};

const GET_ALL_AD_BANNER = gql`
  query Query {
    getAllAddBanners {
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
    }
    getAllMobileAddBanners {
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
    }
  }
`;

export const useFetchAllAdBanners = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_AD_BANNER);
  return { data, loading, error, refetch };
};

// ----------------------------------------------------------- //

// Testimonails

const ALL_TESTIMONIALS_QUERY = gql`
  query AllTestimonials {
    allTestimonials {
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
        businessDetails {
          logo
        }
      }
      userId
      user {
        id
        slug
        name
        avatar
      }
      createdAt
      deletedAt
      updatedAt
      message
      token
    }
  }
`;

export function useAllTestimonials() {
  const { data, loading, error, refetch } = useQuery(ALL_TESTIMONIALS_QUERY, {
    onCompleted: (data: any) => {
      console.log("All testimonials fetched:", data);
    },
  });

  const fetchTestimonials = async () => {
    try {
      const response = await refetch();
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    testimonials: data?.allTestimonials || [],
    loading,
    error,
    refetch: fetchTestimonials,
  };
}

// ----------------------------------------------------------- //
