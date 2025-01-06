"use client";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import useAuthStore from "@/zustandStore/authStore";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UpdateBusinessDetailsResult, UpdateBusinessDetailsVariables } from "./types";

export const BUSINESS_SIGNUP = gql`
  mutation Mutation($email: String, $phone: String) {
    businessSignup(email: $email, phone: $phone) {
      value
      message
    }
  }
`;

// Firm/ Individual Signup by Email or Phone
export function useBusinessSignup() {
  const [signupMutation, { data, loading, error }] = useMutation(BUSINESS_SIGNUP, {
    onCompleted: (data: any) => {
      // console.log("Business signup completed:", data);
    },
  });
  const businessSignup = async (email: string | undefined, phone: string | undefined) => {
    try {
      const response = await signupMutation({
        variables: { email: email || undefined, phone: phone || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { businessSignup, data: data?.businessSignup, loading, error };
}

export const ADD_BUSINESS_PRIMARY_CONTACT = gql`
  mutation Mutation($email: String, $phone: String) {
    addBusinessPrimaryContact(email: $email, phone: $phone) {
      message
    }
  }
`;
// After SignIn, verify Primary contact
export function useAddBusinessPrimaryContact() {
  const [addBusinessPrimaryContactMutation, { data, loading, error }] = useMutation(
    ADD_BUSINESS_PRIMARY_CONTACT,
    {
      // onCompleted: (data: any) => {
      //   console.log("Business signup completed:", data);
      // },
    },
  );
  const addBusinessPrimaryContact = async (
    email: string | undefined,
    phone: string | undefined,
  ) => {
    try {
      const response = await addBusinessPrimaryContactMutation({
        variables: { email: email || undefined, phone: phone || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { addBusinessPrimaryContact, data: data?.addBusinessPrimaryContact, loading, error };
}

export const RESEND_BUSINESS_OTP = gql`
  mutation ResendBusinessOtp($email: String, $phone: String) {
    resendBusinessOtp(email: $email, phone: $phone) {
      message
    }
  }
`;

export function useResendBusinessOtp() {
  const route = useRouter();
  const { setUserToken, setFirmToken, setTokenType } = useAuthStore();
  const [resendBusinessOtpMutation, { data, loading, error }] = useMutation(
    RESEND_BUSINESS_OTP, // Define this GraphQL mutation in your query file
    {
      onCompleted: (data: any) => {
        console.log("OTP resend completed:", data);
        if (data && data?.resendBusinessOtp) {
          // Handle any side effects after OTP resend, like showing a success message
        }
      },
    },
  );

  const resendOtp = async (
    email: string | undefined = undefined,
    phone: string | undefined = undefined,
  ) => {
    try {
      const { data } = await resendBusinessOtpMutation({
        variables: { email, phone },
      });

      return { response: data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { resendOtp, data: data?.resendBusinessOtp, loading, error };
}

export const VERIFY_BUSINESS_PRIMARY_CONTACT = gql`
  mutation Mutation($otp: String!, $email: String, $password: String, $phone: String) {
    verifyBusinessPrimaryContact(otp: $otp, email: $email, password: $password, phone: $phone) {
      business {
        slug
      }
      message
      token
    }
  }
`;

// After signup, verify contact and get token
export function useVerifyBusinessContact() {
  const route = useRouter();
  const { setUserToken, setFirmToken, setTokenType } = useAuthStore();
  const [verifyContactMutation, { data, loading, error }] = useMutation(
    VERIFY_BUSINESS_PRIMARY_CONTACT,
    {
      onCompleted: (data: any) => {
        console.log("Business signup completed:", data);
        if (data && data?.verifyBusinessPrimaryContact) {
          const token = data?.verifyBusinessPrimaryContact?.token;
          setFirmToken(token);
          setTokenType("firm");
        }
        // Redirect to profile page
        route.push(`/listing-profile/${data?.verifyBusinessPrimaryContact?.business?.slug}`);
      },
    },
  );

  const verifyContact = async (
    otp: string,
    email: string | undefined = undefined,
    phone: string | undefined = undefined,
    password: string | undefined = undefined,
  ) => {
    try {
      const { data } = await verifyContactMutation({
        variables: { otp, email, phone, password },
      });

      return { response: data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { verifyContact, data: data?.verifyBusinessPrimaryContact, loading, error };
}

export const BUSINESS_LOGIN = gql`
  query Query($password: String!, $email: String, $phone: String) {
    businessLogin(password: $password, email: $email, phone: $phone) {
      token
      id
      slug
      name
      message
    }
  }
`;

// Firm/ Individual Login
export const useBusinessLogin = () => {
  const router = useRouter();
  const { setUserToken, setFirmToken, setTokenType } = useAuthStore();
  const [fetchBusinessLogin, { data, loading, error }] = useLazyQuery(BUSINESS_LOGIN, {
    fetchPolicy: "network-only",
    onCompleted: (data: any) => {
      if (data && data?.businessLogin) {
        const token = data?.businessLogin?.token;
        setFirmToken(token);
        setTokenType("firm");
      }
      // Redirect to profile page
      router.push(`/listing-profile/${data?.businessLogin?.slug}`);
    },
  });
  const businessLogin = async ({
    password,
    email = undefined,
    phone = undefined,
  }: {
    password: string;
    email?: string | undefined;
    phone?: string | undefined;
  }) => {
    try {
      // Trigger the login query
      const response = await fetchBusinessLogin({
        variables: { password, email, phone },
      });

      return { loginData: response?.data?.businessLogin, error: null, loading: false };
    } catch (err) {
      console.error("Error during business login:", err);
      return { loginData: null, error: err, loading: false };
    }
  };

  return { businessLogin, data, loading, error };
};

export const UPDATE_BUSINESS_DETAILS = gql`
  mutation UpdateBusinessDetails(
    $addresses: [BusinessAddressInput]
    $name: String
    $slug: ID
    $isListed: Boolean
    $registrationNumber: String
    $license: String
    $experience: Int
    $teamSize: Int
    $description: String
    $degrees: [String!]
    $gstNumber: String
    $categoryIds: [ID]
    $languages: [String!]
    $proficiencies: [String!]
    $courts: [String!]
    $tags: [String!]
    $latitude: Float
    $longitude: Float
    $additionalContacts: [String!]
    $logo: Upload
    $websites: [BusinessWebsiteInput]
    $primaryWebsite: String
    $operatingHours: [BusinessOperatingHourInput]
  ) {
    manageBusinessAddress(addresses: $addresses) {
      message
    }
    updateBusinessDetails(
      name: $name
      slug: $slug
      isListed: $isListed
      registrationNumber: $registrationNumber
      license: $license
      experience: $experience
      teamSize: $teamSize
      description: $description
      degrees: $degrees
      gstNumber: $gstNumber
      categoryIds: $categoryIds
      languages: $languages
      proficiencies: $proficiencies
      courts: $courts
      tags: $tags
      latitude: $latitude
      longitude: $longitude
      additionalContacts: $additionalContacts
      logo: $logo
      primaryWebsite: $primaryWebsite
    ) {
      message
    }
    manageBusinessWebsite(websites: $websites) {
      id
      message
      token
    }
    manageBusinessOperatingHours(operatingHours: $operatingHours) {
      id
      message
    }
  }
`;
export function useMutationBusinessDetails() {
  const [mutate, { data, loading, error }] = useMutation<
    UpdateBusinessDetailsResult,
    UpdateBusinessDetailsVariables
  >(UPDATE_BUSINESS_DETAILS);

  const handleUpdate = async (variables: UpdateBusinessDetailsVariables): Promise<void> => {
    try {
      await mutate({ variables });
    } catch (e) {
      console.error("Error updating business details", e);
    }
  };

  return { handleUpdate, data, loading, error };
}

export const BUSINESS_FILE_UPLOAD = gql`
  mutation UpdateBusinessDetails(
    $logo: Upload
    $adBannerImages: [BusinessAdBannerImageInput]
    $coverImages: [BusinessCoverImageInput]
    $mobileAdBannerImages: [BusinessMobileAdBannerImageInput]
    $documents: [BusinessSupportingDocumentInput]
  ) {
    updateBusinessDetails(logo: $logo) {
      businessDetails {
        logo
        message
      }
    }
    manageBusinessAdBannerImage(adBannerImages: $adBannerImages) {
      message
    }
    manageBusinessCoverImage(coverImages: $coverImages) {
      message
    }
    manageBusinessMobileAdBannerImage(mobileAdBannerImages: $mobileAdBannerImages) {
      message
    }
    manageBusinessSupportingDocuments(documents: $documents) {
      message
    }
  }
`;

export function useMutationBusinessFile() {
  const [mutate, { data, loading, error }] = useMutation(BUSINESS_FILE_UPLOAD);

  const handleUpdate = async (variables: any): Promise<void> => {
    try {
      await mutate({ variables });
    } catch (e) {
      console.error("Error updating business files", e);
    }
  };

  return { handleUpdate, data, loading, error };
}

export const GET_BUSINESS_DETAILS = gql`
  query Query {
    businessMe {
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
      subscriptionId
      subscriptionExpire
      subscription {
        id
        name
        description
        type
        price
        duration
        features
        tierLevel
        createdAt
        updatedAt
        deletedAt
        message
        token
      }
      averageRating
      reviewCount
      isListed
      isBlocked
      createdAt
      updatedAt
      deletedAt
      paymentVerification
      razorpay_order_id
      bookings {
        id
        date
        businessId
        userId
        createdAt
        deletedAt
        updatedAt
        message
        token
      }
      reviews {
        id
        rating
        comment
        businessId
        userId
        createdAt
        deletedAt
        updatedAt
        message
        token
      }
      feedbacks {
        id
        rating
        comment
        businessId
        userId
        createdAt
        deletedAt
        updatedAt
        message
        token
      }
      businessSupportingDocuments {
        id
        businessId
        type
        url
        createdAt
        updatedAt
        deletedAt
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

export const useGetBusinessDetails = () => {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state) => state?.firmToken);
  useEffect(() => {
    setTokenType("firm");
  }, []);
  const { data, loading, error, refetch } = useQuery(GET_BUSINESS_DETAILS, {
    fetchPolicy: "cache-and-network", // Fetch fresh data but use cache when available
    skip: !token,
  });
  if (error) {
    console.log(error?.message);
  }
  const userData = data?.businessMe;
  return { userData, loading, error, refetch };
};

export const GET_HEADER_USER = gql`
  query Query {
    businessMe {
      id
      name
      slug
      businessDetails {
        logo
      }
    }
  }
`;
// Header User Query
export const useHeaderUser = () => {
  const { setTokenType } = useAuthStore();
  const token = useAuthStore((state) => state?.firmToken);
  useEffect(() => {
    setTokenType("firm");
  }, []);
  const { data, loading, error, refetch } = useQuery(GET_HEADER_USER, {
    fetchPolicy: "cache-and-network", // Fetch fresh data but use cache when available
    skip: !token,
    // onCompleted: (data: any) => {
    //   if (data && data?.businessMe) {
    //     console.log("Header user data:", data?.businessMe);
    //   }
    // },
  });
  if (error) {
    console.log(error?.message);
  }
  const userData = data?.businessMe;
  return { userData, loading, error, refetch };
};

export const FORGET_BUSINESS_PASSWORD = gql`
  mutation ForgetBusinessPassword($email: String, $phone: String) {
    forgetBusinessPassword(email: $email, phone: $phone) {
      message
    }
  }
`;

// Custom Hook for Forgetting Business Password
export function useForgetBusinessPassword() {
  const [forgetPasswordMutation, { data, loading, error }] = useMutation(FORGET_BUSINESS_PASSWORD, {
    onCompleted: (data: any) => {
      // Optional: Add logic here for what to do when the mutation is successful
      console.log("Forget business password completed:", data);
    },
  });

  const forgetBusinessPassword = async ({
    email,
    phone,
  }: {
    email: string | undefined;
    phone: string | undefined;
  }) => {
    try {
      const response = await forgetPasswordMutation({
        variables: { email: email || undefined, phone: phone || undefined },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    forgetBusinessPassword,
    data: data?.forgetBusinessPassword,
    loading,
    error,
  };
}

// GraphQL Mutation for ChangeBusinessPassword
export const CHANGE_BUSINESS_PASSWORD = gql`
  mutation ChangeBusinessPassword(
    $password: String!
    $otp: String!
    $email: String
    $phone: String
  ) {
    changeBusinessPassword(password: $password, otp: $otp, email: $email, phone: $phone) {
      token
      slug
      id
      name
    }
  }
`;

// Custom Hook for Changing Business Password
export function useChangeBusinessPassword() {
  const [changePasswordMutation, { data, loading, error }] = useMutation(CHANGE_BUSINESS_PASSWORD, {
    onCompleted: (data: any) => {
      // Optional: Add logic here for what to do when the mutation is successful
      // console.log("Change business password completed:", data);
    },
  });

  const changeBusinessPassword = async ({
    password,
    otp,
    email,
    phone,
  }: {
    password: string;
    otp: string;
    email?: string;
    phone?: string;
  }) => {
    try {
      const response = await changePasswordMutation({
        variables: {
          password,
          otp,
          email: email || undefined,
          phone: phone || undefined,
        },
      });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    changeBusinessPassword,
    data: data?.changeBusinessPassword,
    loading,
    error,
  };
}
