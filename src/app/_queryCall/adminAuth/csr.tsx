import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

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
      if (data && data?.businessLogin) {
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
