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
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched subscriptions successfully:", data);
    // },
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
  const token = useAuthStore((state: any) => state?.adminToken);
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
    }
  }
`;

export function useAdminGetAllTestimonials() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch testimonials
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_TESTIMONIALS, {
    // onCompleted: (data: any) => {
    //   // Log or handle successful response
    //   console.log("Fetched testimonials successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageTestimonials() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook for managing testimonials
  const [manageTestimonials, { data, loading, error }] = useMutation(ADMIN_MANAGE_TESTIMONIALS, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed testimonials:", data);
    // },
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
      categoryImage
      order
      groupName {
        id
        name
      }
    }
  }
`;

export function useAdminGetAllCategories() {
  const { setTokenType } = useAuthStore();
  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch categories
  const { data, loading, error, refetch } = useQuery(ADMIN_GET_ALL_CATEGORIES, {
    // onCompleted: (data: any) => {
    //   console.log("Fetched categories successfully:", data?.adminGetAllCategories);
    // },
    onError: (err: any) => {
      // Handle error response
      console.error("Error fetching categories:", err);
    },
  });

  return { data: data?.adminGetAllCategories, loading, error, refetch };
}

export const ADMIN_MANAGE_CATEGORIES = gql`
  mutation AdminManageCategories($categories: [CategoryInput]) {
    adminManageCategories(categories: $categories) {
      id
      name
      slug
      description
      order
      categoryImage
      message
    }
  }
`;

export function useAdminManageCategories() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook for managing categories
  const [manageCategories, { data, loading, error }] = useMutation(ADMIN_MANAGE_CATEGORIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed categories:", data);
    // },
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
      return { response: response?.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { adminManageCategories, data: data?.adminManageCategories, loading, error };
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
    }
  }
`;

export function useAdminGetAllLanguages() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch languages
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_LANGUAGES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched languages successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageLanguages() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage languages
  const [manageLanguages, { data, loading, error }] = useMutation(ADMIN_MANAGE_LANGUAGES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed languages:", data);
    // },
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
    }
  }
`;

export function useAdminGetAllCourts() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch courts
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_COURTS, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched courts successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageCourts() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage courts
  const [manageCourts, { data, loading, error }] = useMutation(ADMIN_MANAGE_COURTS, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed courts:", data);
    // },
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
    }
  }
`;

export function useAdminGetAllProficiencies() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch proficiencies
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_PROFICIENCIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched proficiencies successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageProficiencies() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage proficiencies
  const [manageProficiencies, { data, loading, error }] = useMutation(ADMIN_MANAGE_PROFICIENCIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed proficiencies:", data);
    // },
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

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch countries
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_COUNTRIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched countries successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageCountries() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage countries
  const [manageCountries, { data, loading, error }] = useMutation(ADMIN_MANAGE_COUNTRIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed countries:", data);
    // },
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
    }
  }
`;

export function useAdminGetAllStates() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch states
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_STATES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched states successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageStates() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage states
  const [manageStates, { data, loading, error }] = useMutation(ADMIN_MANAGE_STATES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed states:", data);
    // },
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
    }
  }
`;

export function useAdminGetAllCities() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch cities
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_CITIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched cities successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManageCities() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage cities
  const [manageCities, { data, loading, error }] = useMutation(ADMIN_MANAGE_CITIES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed cities:", data);
    // },
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
    }
  }
`;

export function useAdminGetAllPincodes() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useQuery hook to fetch pincodes
  const { data, loading, error } = useQuery(ADMIN_GET_ALL_PINCODES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Fetched pincodes successfully:", data);
    // },
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
    }
  }
`;

export function useAdminManagePincodes() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state: any) => state?.adminToken);

  useEffect(() => {
    setTokenType("admin");
  }, [setTokenType]);

  // Use Apollo's useMutation hook to manage pincodes
  const [managePincodes, { data, loading, error }] = useMutation(ADMIN_MANAGE_PINCODES, {
    // onCompleted: (data: any) => {
    //   // Handle successful response
    //   console.log("Successfully managed pincodes:", data);
    // },
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
