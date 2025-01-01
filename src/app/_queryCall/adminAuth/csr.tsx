import { gql, useLazyQuery } from "@apollo/client";

export const ADMIN_LOGIN = gql`
  query AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      id
      name
      email
      createdAt
      updatedAt
      deletedAt
      message
      token
    }
  }
`;

// Admin Login Query
export function useAdminLogin() {
  const [fetchAdminLogin, { data, loading, error }] = useLazyQuery(ADMIN_LOGIN, {
    onCompleted: (data: any) => {
      // console.log("Admin login successful:", data);
    },
  });

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await fetchAdminLogin({
        variables: { email, password },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { adminLogin, data: data?.adminLogin, loading, error };
}
