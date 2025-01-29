import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export const USER_LOGIN = gql`
  query UserLogin($password: String!, $email: String, $phone: String) {
    userLogin(password: $password, email: $email, phone: $phone) {
      id
      slug
      token
      name
      message
    }
  }
`;

// User Login Hook
export function useUserLogin() {
  const router = useRouter();
  const { setUserToken, setTokenType } = useAuthStore();

  const [fetchLogin, { data, loading, error }] = useLazyQuery(USER_LOGIN, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data?.userLogin) {
        const { token } = data.userLogin;
        setTokenType("user");
        setUserToken(token);
        router.prefetch(`/`); // Prefetch the homepage
      }
    },
    onError: (error) => {
      console.error("Error during user login:", error.message || error);
    },
  });

  const userLogin = async ({
    password,
    email,
    phone,
  }: {
    password: string;
    email?: string;
    phone?: string;
  }) => {
    try {
      const response = await fetchLogin({
        variables: { password, email: email || null, phone: phone || null },
      });
      return {
        response: response?.data?.userLogin || null,
        error: null,
        loading: false,
      };
    } catch (err) {
      console.error("Login failed:", err);
      return {
        response: null,
        error: err,
        loading: false,
      };
    }
  };

  return { userLogin, data: data?.userLogin, loading, error };
}

// 1st google OAuth query
const USER_GOOGLE_OAUTH = gql`
  query UserGoogleOAuth($redirectUri: String!) {
    userGoogleOAuth(redirectURI: $redirectUri) {
      link
      requestId
    }
  }
`;

export const useGoogleOAuth = () => {
  const [getGoogleOAuth, { data, loading, error }] = useLazyQuery(USER_GOOGLE_OAUTH, {
    fetchPolicy: "network-only",
  });

  const initiateGoogleOAuth = (redirectUri: string) => {
    getGoogleOAuth({ variables: { redirectUri } });
  };

  return {
    initiateGoogleOAuth,
    data: data?.userGoogleOAuth,
    loading,
    error,
  };
};

// 2nd  Google OAuth query
export const USER_GOOGLE_OAUTH_VERIFY = gql`
  mutation UserGoogleOAuthVerify($code: String!) {
    userGoogleOAuthVerify(code: $code) {
      id
      name
      slug
      contacts {
        id
        userId
        type
        value
        isVerified
        isPrimary
        order
        verifiedAt
        createdAt
        updatedAt
        deletedAt
      }
      hideDetails
      isBlocked
      avatar
      message
      token
      requestId
    }
  }
`;

// User Google OAuth Verification Hook
export const useUserGoogleOAuthVerify = () => {
  const router = useRouter();
  const { setUserToken, setTokenType } = useAuthStore();

  const [verifyGoogleOAuth, { data, loading, error }] = useMutation(USER_GOOGLE_OAUTH_VERIFY, {
    onCompleted: (data) => {
      if (data?.userGoogleOAuthVerify) {
        const { token } = data.userGoogleOAuthVerify;
        if (token) {
          setTokenType("user");
          setUserToken(token);
          router.replace("/");
        }
      }
    },
    onError: (error) => {
      console.error("Google OAuth verification error:", error.message || error);
    },
  });

  const userGoogleOAuthVerify = async (code: string) => {
    try {
      const response = await verifyGoogleOAuth({ variables: { code } });
      return {
        response: response?.data?.userGoogleOAuthVerify || null,
        error: null,
        loading: false,
      };
    } catch (err) {
      console.error("Google OAuth verification failed:", err);
      return {
        response: null,
        error: err,
        loading: false,
      };
    }
  };

  return { userGoogleOAuthVerify, data: data?.userGoogleOAuthVerify, loading, error };
};
