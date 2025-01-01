// ./ApolloClient
import { HttpLink } from "@apollo/client";
import { registerApolloClient, ApolloClient, InMemoryCache, } from "@apollo/experimental-nextjs-app-support";
import Env from "./env";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new HttpLink({
      uri: Env.BASE_GQL_URL,
    }),
  });
});