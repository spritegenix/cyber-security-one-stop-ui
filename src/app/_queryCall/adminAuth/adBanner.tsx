import { gql, useMutation } from "@apollo/client";

export const ADMIN_MANAGE_BUSINESS_AD_BANNER_IMAGE = gql`
  mutation AdminManageBusinessAdBannerImage(
    $businessAdBannerImages: [AdminBusinessAdBannerImageInput]
  ) {
    adminManageBusinessAdBannerImage(businessAdBannerImages: $businessAdBannerImages) {
      id
      order
      createdAt
      updatedAt
      deletedAt
      message
    }
  }
`;

interface AdminManageBusinessAdBannerImageInput {
  id: string | undefined;
  order?: number | undefined;
  toDelete?: boolean | undefined;
}

export function useAdminManageBusinessAdBannerImage() {
  const [adminManageBusinessAdBannerImage, { data, loading, error }] = useMutation(
    ADMIN_MANAGE_BUSINESS_AD_BANNER_IMAGE,
  );

  const manageBusinessAdBannerImage = async (
    businessAdBannerImages: AdminManageBusinessAdBannerImageInput[],
  ) => {
    if (!businessAdBannerImages || businessAdBannerImages.length === 0) {
      return { response: null, error: new Error("No input provided") };
    }

    try {
      const response = await adminManageBusinessAdBannerImage({
        variables: { businessAdBannerImages },
      });
      return { response: response?.data, error: null };
    } catch (err) {
      console.error("Error managing ad banner image:", err);
      return { response: null, error: err };
    }
  };

  return { manageBusinessAdBannerImage, data, loading, error };
}

export const ADMIN_MANAGE_BUSINESS_MOBILE_AD_BANNER_IMAGE = gql`
  mutation AdminManageBusinessMobileAdBannerImage(
    $businessMobileAdBannerImages: [AdminBusinessMobileAdBannerImageInput]
  ) {
    adminManageBusinessMobileAdBannerImage(
      businessMobileAdBannerImages: $businessMobileAdBannerImages
    ) {
      id
      order
      createdAt
      updatedAt
      deletedAt
      message
    }
  }
`;

export function useAdminManageBusinessMobileAdBannerImage() {
  const [adminManageBusinessMobileAdBannerImage, { data, loading, error }] = useMutation(
    ADMIN_MANAGE_BUSINESS_MOBILE_AD_BANNER_IMAGE,
  );

  const manageBusinessMobileAdBannerImage = async (
    businessAdBannerImages: AdminManageBusinessAdBannerImageInput[],
  ) => {
    try {
      const response = await adminManageBusinessMobileAdBannerImage({
        variables: {
          businessAdBannerImages,
        },
      });
      return { response: response?.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    manageBusinessMobileAdBannerImage,
    data,
    loading,
    error,
  };
}
