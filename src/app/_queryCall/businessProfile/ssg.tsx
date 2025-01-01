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
        token
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
        token
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
          token
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
