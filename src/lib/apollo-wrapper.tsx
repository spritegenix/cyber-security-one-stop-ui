"use client";

import { HttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";
import useAuthStore from "@/zustandStore/authStore";

function makeClient() {
  // HTTP Link for GraphQL requests
  // const httpLink = new HttpLink({
  //   // uri: process.env.NEXT_PUBLIC_BASE_GQL_URL,
  //   uri: "/api/graphql",
  //   fetchOptions: {
  //     cache: "no-store",
  //     //  mode: "cors"
  //   },
  //   // credentials: "include",
  // });

  const uploadLink = createUploadLink({
    uri: "/api/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
    },
    fetchOptions: {
      cache: "no-store",
    },
  });

  // Authorization Link with JWT from Zustand
  const authLink = setContext((_, { headers }) => {
    // Fetch tokens dynamically
    const { userToken, firmToken, adminToken, tokenType } = useAuthStore.getState();
    const token = tokenType === "user" ? userToken : tokenType === "firm" ? firmToken : adminToken;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // Chain the auth link with the HTTP link
  const link = from([authLink as any, uploadLink as any]);

  // Create the Apollo Client
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
