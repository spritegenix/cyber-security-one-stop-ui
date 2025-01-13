import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

// User Login Query
export function useUserLogin() {
  const router = useRouter();
  const { setUserToken, setTokenType } = useAuthStore();
  const [fetchLogin, { data, loading, error }] = useLazyQuery(USER_LOGIN, {
    fetchPolicy: "network-only",
    onCompleted: (data: any) => {
      // console.log("User login successful:", data);
      if (data && data?.userLogin) {
        setTokenType("user");
        const token = data?.userLogin?.token;
        // console.log(token);
        setUserToken(token);
        // Redirect to profile page
        router.prefetch(`/`);
      }
    },
    onError: (error: any) => {
      console.error("Error during user login:", error);
    },
  });

  const userLogin = async ({
    password,
    email = undefined,
    phone = undefined,
  }: {
    password: string;
    email?: string | undefined;
    phone?: string | undefined;
  }) => {
    try {
      const response = await fetchLogin({
        variables: { password, email: email || undefined, phone: phone || undefined },
      });
      return { response: response?.data?.userLogin, error: null, loading: false };
    } catch (err) {
      console.error("Error during user login:", err);
      return { loginData: null, error: err, loading: false };
    }
  };

  return { userLogin, data: data?.userLogin, loading, error };
}

export const USER_SIGNUP = gql`
  mutation Mutation($name: String!, $password: String!, $email: String, $phone: String) {
    userSignup(name: $name, password: $password, email: $email, phone: $phone) {
      message
    }
  }
`;

// User Signup with Name, Password, Email, and Phone
export function useUserSignup() {
  const [signupMutation, { data, loading, error }] = useMutation(USER_SIGNUP, {
    onCompleted: (data: any) => {
      // console.log("User signup completed:", data);
    },
  });

  const userSignup = async ({
    name,
    password,
    email,
    phone,
  }: {
    name: string;
    password: string;
    email: string | undefined;
    phone: string | undefined;
  }) => {
    try {
      const response = await signupMutation({
        variables: { name, password, email: email || undefined, phone: phone || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { userSignup, data: data?.userSignup, loading, error };
}

export const RESEND_USER_OTP = gql`
  mutation ResendUserOtp($email: String, $phone: String) {
    resendUserOtp(email: $email, phone: $phone) {
      message
    }
  }
`;

export function useResendUserOtp() {
  const route = useRouter();
  const { setUserToken, setFirmToken, setTokenType } = useAuthStore();
  const [resendOtpMutation, { data, loading, error }] = useMutation(RESEND_USER_OTP, {
    onCompleted: (data: any) => {
      // console.log("Resend OTP completed:", data);
      if (data?.resendUserOtp) {
        // Handle the message response or show a success message
        alert(data.resendUserOtp.message);
      }
    },
  });

  const resendOtp = async (
    email: string | undefined = undefined,
    phone: string | undefined = undefined,
  ) => {
    try {
      const { data } = await resendOtpMutation({
        variables: { email, phone },
      });
      return { response: data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { resendOtp, data: data?.resendUserOtp, loading, error };
}

export const VERIFY_USER_CONTACT = gql`
  mutation Mutation($email: String, $phone: String, $otp: String!) {
    verifyUserContact(email: $email, phone: $phone, otp: $otp) {
      user {
        id
        name
        slug
      }
      token
      message
    }
  }
`;

// Verify User Contact with Email/Phone and OTP
export function useVerifyUserContact() {
  const route = useRouter();
  const { setUserToken, setTokenType } = useAuthStore();
  const [verifyMutation, { data, loading, error }] = useMutation(VERIFY_USER_CONTACT, {
    onCompleted: (data: any) => {
      // console.log("User signup completed:", data);
      if (data && data?.verifyUserContact) {
        const token = data?.verifyUserContact?.token;
        setUserToken(token);
        setTokenType("user");
      }
      // Redirect to profile page
      route.push(`/`);
    },
  });

  const verifyUserContact = async ({
    email,
    phone,
    otp,
  }: {
    email: string | undefined;
    phone: string | undefined;
    otp: string;
  }) => {
    try {
      const { data } = await verifyMutation({
        variables: { email: email || undefined, phone: phone || undefined, otp },
      });
      return { response: data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { verifyUserContact, data: data?.verifyUserContact, loading, error };
}

export const ADD_USER_CONTACT = gql`
  mutation Mutation($email: String, $phone: String) {
    addUserContact(email: $email, phone: $phone) {
      message
    }
  }
`;

// Add User Contact with Email or Phone
export function useAddUserContact() {
  const [addContactMutation, { data, loading, error }] = useMutation(ADD_USER_CONTACT, {
    onCompleted: (data: any) => {
      // console.log("User contact added:", data);
    },
  });

  const addUserContact = async (email: string | undefined, phone: string | undefined) => {
    try {
      const response = await addContactMutation({
        variables: { email: email || undefined, phone: phone || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { addUserContact, data: data?.addUserContact, loading, error };
}

export const FORGET_USER_PASSWORD = gql`
  mutation ForgetUserPassword($email: String, $phone: String) {
    forgetUserPassword(email: $email, phone: $phone) {
      message
    }
  }
`;

export function useForgetUserPassword() {
  const [forgetPasswordMutation, { data, loading, error }] = useMutation(FORGET_USER_PASSWORD, {
    onCompleted: (data: any) => {
      // console.log("Forgot password completed:", data);
    },
  });

  const forgetUserPassword = async ({ email, phone }: { email?: string; phone?: string }) => {
    try {
      const response = await forgetPasswordMutation({
        variables: { email: email || undefined, phone: phone || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { forgetUserPassword, data: data?.forgetUserPassword, loading, error };
}

export const CHANGE_USER_PASSWORD = gql`
  mutation ChangeUserPassword($password: String!, $otp: String!, $phone: String, $email: String) {
    changeUserPassword(password: $password, otp: $otp, phone: $phone, email: $email) {
      token
      slug
      id
      name
    }
  }
`;

export function useChangeUserPassword() {
  const [changePasswordMutation, { data, loading, error }] = useMutation(CHANGE_USER_PASSWORD, {
    onCompleted: (data: any) => {
      // console.log("Password changed successfully:", data);
    },
  });

  const changeUserPassword = async ({
    password,
    otp,
    phone,
    email,
  }: {
    password: string;
    otp: string;
    phone?: string;
    email?: string;
  }) => {
    try {
      const response = await changePasswordMutation({
        variables: { password, otp, phone: phone || undefined, email: email || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { changeUserPassword, data: data?.changeUserPassword, loading, error };
}

export const DELETE_USER_ACCOUNT = gql`
  mutation Mutation {
    deleteUserAccount {
      message
    }
  }
`;

// Delete User Account
export function useDeleteUserAccount() {
  const [deleteAccountMutation, { data, loading, error }] = useMutation(DELETE_USER_ACCOUNT, {
    onCompleted: (data: any) => {
      // console.log("User account deletion completed:", data);
    },
  });

  const deleteUserAccount = async () => {
    try {
      const response = await deleteAccountMutation();
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { deleteUserAccount, data: data?.deleteUserAccount, loading, error };
}

export const UPDATE_USER_DETAILS = gql`
  mutation Mutation(
    $name: String
    $slug: ID
    $hideDetails: Boolean
    $avatar: Upload
    $addresses: [UserAddressInput!]! #   "addresses": [
    #     "toDelete": null,
  ) #     {
  #     "street": null,
  #     "state": null,
  #     "pincode": null,
  #     "country": null,
  #     "city": null,
  #     "addressId": null
  #   }
  # ]

  {
    updateUserDetails(name: $name, slug: $slug, hideDetails: $hideDetails, avatar: $avatar) {
      id
      name
      slug
      hideDetails
      isBlocked
      avatar
      message
    }
    manageUserAddress(addresses: $addresses) {
      id
      userId
      order
      street
      city
      country
      pincode
      state
      message
    }
  }
`;

// Update User Details
export function useUpdateUserDetails() {
  const [updateDetailsMutation, { data, loading, error }] = useMutation(UPDATE_USER_DETAILS, {
    onCompleted: (data: any) => {
      // console.log("User details updated:", data);
    },
  });

  const updateUserDetails = async ({
    name,
    slug,
    hideDetails,
    avatar,
    addresses,
  }: {
    name?: string;
    slug?: string;
    hideDetails?: boolean;
    avatar?: File;
    addresses?: any[];
  }) => {
    try {
      const response = await updateDetailsMutation({
        variables: { name, slug, hideDetails, avatar, addresses },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { updateUserDetails, queryResponse: data, loading, error };
}

export const GET_USER_ME = gql`
  query UserMe {
    userMe {
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
        message
        user {
          id
          slug
          name
        }
      }
      hideDetails
      isBlocked
      avatar
      subscriptionId
      subscriptionExpire
      paymentVerification
      razorpay_order_id
      createdAt
      updatedAt
      deletedAt
      addresses {
        id
        userId
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
        user {
          slug
          id
          name
        }
      }
      bookings {
        id
        date
        businessId
        business {
          id
          slug
          name
        }
        userId
        createdAt
        deletedAt
        updatedAt
        message
        user {
          id
          slug
          name
        }
      }
      reviews {
        id
        rating
        comment
        businessId
        business {
          slug
          name
          id
        }
        userId
        user {
          name
          id
          slug
        }
        createdAt
        deletedAt
        updatedAt
        message
      }
      feedbacks {
        id
        rating
        comment
        businessId
        userId
        user {
          slug
          id
          name
        }
        business {
          slug
          id
          name
        }
      }
      message
    }
  }
`;

export function useUserMe() {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state) => state?.userToken);
  useEffect(() => {
    setTokenType("user");
  }, []);
  const { data, loading, error, refetch } = useQuery(GET_USER_ME, {
    fetchPolicy: "cache-and-network", // Fetch fresh data but use cache when available
    skip: !token,
    // onCompleted: () => {
    //   console.log("user data for profile page", data?.userMe);
    // },
  });
  if (error) {
    console.log(error?.message);
  }

  const userData = data?.userMe;
  return { userData, loading, error, refetch };
}

export const GET_HEADER_USER = gql`
  query Query {
    userMe {
      name
      slug
      avatar
      contacts {
        id
        type
        value
        isVerified
      }
      addresses {
        street
        city
        country
        pincode
        state
      }
    }
  }
`;
// Header User Query
export const useHeaderUser = () => {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state) => state?.userToken);
  useEffect(() => {
    setTokenType("user");
  }, []);
  const { data, loading, error, refetch } = useQuery(GET_HEADER_USER, {
    fetchPolicy: "cache-and-network", // Fetch fresh data but use cache when available
    skip: !token,
    // onCompleted: (data: any) => {
    //   if (data && data?.userMe) {
    //     console.log("Header user data:", data?.userMe, loading);
    //   }
    // },
  });
  if (error) {
    console.log(error?.message);
  }
  const userData = data?.userMe;
  return { userData, loading, error, refetch };
};
