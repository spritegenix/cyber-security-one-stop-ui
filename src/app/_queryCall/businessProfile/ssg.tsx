import { query } from "@/lib/client";
import { ApolloError, gql } from "@apollo/client";

const GET_BUSINESS_BY_ID = gql`
  query Query($businessId: String, $businessSlug: String) {
    getBusinessById(businessId: $businessId, businessSlug: $businessSlug) {
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
        userId
        user {
          id
          name
          slug
          avatar
        }
        createdAt
        deletedAt
        updatedAt
        message
      }
      businessDetails {
        id
        registrationNumber
        license
        experience
        teamSize
        description
        primaryWebsite
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
    }
  }
`;

export const fetchBusinessById = async ({
  businessId,
  businessSlug,
}: {
  businessId?: string;
  businessSlug?: string;
}): Promise<any | null> => {
  try {
    const { data } = await query({
      query: GET_BUSINESS_BY_ID,
      variables: { businessId, businessSlug },
    });

    if (!data || !data.getBusinessById) {
      console.warn("Business not found for provided ID or slug:", { businessId, businessSlug });
      return null; // Return null if no business is found
    }

    return data;
  } catch (error) {
    // Handle ApolloError gracefully
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching business:", error.message);
      return null; // Return null on GraphQL or network error
    }
    throw error;
  }
};
