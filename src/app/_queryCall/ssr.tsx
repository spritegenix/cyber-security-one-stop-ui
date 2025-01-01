import { query } from "@/lib/client";
import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      name
      slug
      categoryImage
    }
  }
`;

export const fetchCategoriesSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_CATEGORIES,
    });

    return {
      props: {
        categories: data.allCategories || [],
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
};

export const GET_ALL_TESTIMONIALS = gql`
  query AllTestimonials($type: AllTestimonialType, $page: Int, $limit: Int) {
    allTestimonials(type: $type, page: $page, limit: $limit) {
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

export const fetchTestimonialsSSR = async (type: ["REVIEW", "FEEDBACK"], page = 1, limit = 10) => {
  try {
    const { data } = await query({
      query: GET_ALL_TESTIMONIALS,
      variables: { type, page, limit },
    });

    return {
      props: {
        testimonials: data.allTestimonials || [],
      },
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return {
      props: {
        testimonials: [],
      },
    };
  }
};
