import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

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
export function useUserGoogleOAuthVerify() {
  const router = useRouter();
  const { setUserToken, setTokenType } = useAuthStore();

  const [verifyGoogleOAuth, { data, loading, error }] = useMutation(USER_GOOGLE_OAUTH_VERIFY, {
    onCompleted: (data) => {
      if (data?.userGoogleOAuthVerify) {
        const { token } = data.userGoogleOAuthVerify;
        setTokenType("user");
        setUserToken(token);
        router.replace("/"); // Redirect to the homepage after successful login
      }
    },
    onError: (error) => {
      console.error("Error during Google OAuth verification:", error.message || error);
    },
  });

  const userGoogleOAuthVerify = async (code: string) => {
    try {
      const response = await verifyGoogleOAuth({
        variables: { code },
      });
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
}