import { query } from "@/lib/client";
import { ApolloError, gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      name
      slug
      description
      categoryImage
      groupName {
        id
        name
      }
    }
  }
`;

export const fetchCategoriesSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_CATEGORIES,
    });

    if (!data || !data.allCategories) {
      console.warn("No categories found.");
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("Error while fetching categories:", error.message);
      return null;
    }
    throw error;
  }
};

export const GET_ALL_TESTIMONIALS = gql`
  query AllTestimonials(
    $type: AllTestimonialType
    $filter: AllTestimonialFilter
    $page: Int
    $limit: Int
  ) {
    allTestimonials(type: $type, filter: $filter, page: $page, limit: $limit) {
      id
      order
      type
      rating
      comment
      businessId
      userId
      business {
        id
        name
        slug
        businessDetails {
          logo
        }
      }
      user {
        id
        name
        slug
        avatar
      }
    }
  }
`;

export const fetchTestimonialsSSR = async ({
  type = "FEEDBACK",
  filter = "USER",
  page = 1,
  limit = 10,
}: {
  type?: "REVIEW" | "FEEDBACK";
  filter?: "USER" | "BUSINESS";
  page?: number;
  limit?: number;
}) => {
  try {
    const { data } = await query({
      query: GET_ALL_TESTIMONIALS,
      variables: { type, page, limit, filter },
    });

    if (!data || !data.allTestimonials) {
      console.warn("No testimonials found.", { type, page, limit, filter });
      return null;
    }
    // console.log({ data, type, page, limit, filter });
    return data?.allTestimonials;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching testimonials:", error.message);
      return null;
    }

    console.error("Unexpected error while fetching testimonials:", error);
    throw error;
  }
};

export const GET_ALL_BUSINESSES = gql`
  query GetAllBusinesses {
    getAllBusinesses {
      id
      name
      slug
      primaryContacts {
        id
        type
        value
      }
      additionalContacts
      isBusinessVerified
      averageRating
      reviewCount
      reviews {
        id
        rating
        comment
        user {
          id
          slug
          name
        }
      }
      feedbacks {
        id
        rating
        comment
        user {
          id
          slug
          name
        }
      }
      businessSupportingDocuments {
        id
        type
        url
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
        }
        primaryWebsite
        coverImages {
          id
          url
          order
        }
        adBannerImages {
          id
          url
          order
        }
        mobileAdBannerImages {
          id
          url
          order
        }
        operatingHours {
          id
          dayOfWeek
          openingTime
          closingTime
        }
        latitude
        longitude
        degrees
        languages {
          id
          name
          slug
        }
        proficiencies {
          id
          name
          slug
        }
        courts {
          id
          name
          slug
        }
        gstNumber
        categories {
          id
          name
          slug
          description
        }
        tags {
          id
          name
        }
        addresses {
          id
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
    }
  }
`;
// Get All Businesses with all Data
export const fetchBusinessesSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_BUSINESSES,
    });

    if (!data || !data.getAllBusinesses) {
      console.warn("No businesses found.");
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching businesses:", error.message);
      return null;
    }
    throw error;
  }
};

// Get All Businesses Slug
const GET_ALL_BUSINESSES_SLUGS = gql`
  query GetAllBusinesses {
    getAllBusinesses {
      slug
    }
  }
`;

export const fetchBusinessesSlugSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_BUSINESSES_SLUGS,
    });

    if (!data || !data.getAllBusinesses) {
      console.warn("No businesses found.");
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching businesses:", error.message);
      return null;
    }
    throw error;
  }
};

export const GET_ALL_BUSINESS_SLUGS = gql`
  query GetAllBusinesses {
    getAllBusinesses {
      slug
    }
  }
`;

export const fetchBusinessSlugsSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_BUSINESS_SLUGS,
    });

    if (!data || !data.getAllBusinesses) {
      console.warn("No business slugs found.");
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching business slugs:", error.message);
      return null;
    }
    return error;
  }
};

export const GET_ALL_AD_BANNERS = gql`
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

export const fetchAdBannersSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_AD_BANNERS,
    });

    if (!data || !data.getAllAddBanners || !data.getAllMobileAddBanners) {
      console.warn("No ad banners found.");
      return null;
    }

    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching add banners:", error.message);
      return null; // Return null on GraphQL or network error
    }

    console.error("Error while fetching add banners:", error);
    return null;
  }
};

export const FILTER_BUSINESS = gql`
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
          }
          experience
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

// Define the SSG function
export const fetchBusinessesSSG = async ({
  minPrice,
  maxPrice,
  minRating,
  sortBy,
  order,
  categorySlug,
  city,
  state,
  country,
  pincode,
  search,
  page,
  limit,
  verified,
}: {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: "alphabetical" | "rating" | "price" | "popularity" | "experience";
  order?: "asc" | "desc";
  categorySlug?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  search?: string;
  page?: number;
  limit?: number;
  verified?: boolean;
}) => {
  try {
    const { data } = await query({
      query: FILTER_BUSINESS,
      variables: {
        minPrice,
        maxPrice,
        minRating,
        sortBy,
        order,
        categorySlug,
        city,
        state,
        country,
        pincode,
        search,
        page,
        limit,
        verified,
      },
    });

    return {
      props: {
        searchResults: data?.search || {},
      },
      revalidate: 60, // Optional: Set a revalidation time for incremental static regeneration
    };
  } catch (error) {
    console.error("Error fetching business suggestions for SSG:", error);
    return {
      props: {
        searchResults: {},
      },
    };
  }
};
