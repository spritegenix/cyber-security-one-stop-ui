import { gql, ApolloError } from "@apollo/client";
import { query } from "@/lib/client";

// Define the query
const GET_ALL_BUSINESS_SUBSCRIPTIONS = gql`
  query Query {
    getAllBusinessSubscriptions {
      id
      name
      description
      type
      price
      duration
      features
      tierLevel
      message
      order
      priceDescription
      priority
    }
  }
`;

// Function to fetch subscriptions
export const fetchBusinessSubscriptionsSSR = async () => {
  try {
    const { data } = await query({
      query: GET_ALL_BUSINESS_SUBSCRIPTIONS,
    });

    if (!data || !data.getAllBusinessSubscriptions) {
      console.warn("No subscriptions found.");
      return null;
    }

    return data.getAllBusinessSubscriptions;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("ApolloError while fetching subscriptions:", error.message);
      return null;
    }
    throw error;
  }
};
