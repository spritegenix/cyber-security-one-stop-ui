import { gql, useMutation } from "@apollo/client";

export const ADMIN_MANAGE_BUSINESS_AD_BANNER_IMAGE = gql`
  mutation AdminManageBusinessAdBannerImage($businessMobileAdBannerImages: [AdminBusinessAdBannerImageInput]) {
    adminManageBusinessAdBannerImage(businessMobileAdBannerImages: $businessMobileAdBannerImages) {
      id
      order
      createdAt
      updatedAt
      deletedAt
      message
    }
  }
`;

export function useAdminManageBusinessAdBannerImage() {
    const [adminManageBusinessAdBannerImage, { data, loading, error }] = useMutation(
      ADMIN_MANAGE_BUSINESS_AD_BANNER_IMAGE
    );
  
    const manageBusinessAdBannerImage = async ({
      businessMobileAdBannerImages
    }: {
      businessMobileAdBannerImages: Array<{
        id: string | null;
        order: number | null;
        toDelete: boolean | null;
      }>;
    }) => {
      try {
        const response = await adminManageBusinessAdBannerImage({
          variables: {
            businessMobileAdBannerImages
          },
        });
        return { response: response?.data, error: null };
      } catch (err) {
        return { response: null, error: err };
      }
    };
  
    return {
      manageBusinessAdBannerImage,
      data,
      loading,
      error,
    };
  }


  export const ADMIN_MANAGE_BUSINESS_MOBILE_AD_BANNER_IMAGE = gql`
  mutation AdminManageBusinessMobileAdBannerImage($businessMobileAdBannerImages: [AdminBusinessMobileAdBannerImageInput]) {
    adminManageBusinessMobileAdBannerImage(businessMobileAdBannerImages: $businessMobileAdBannerImages) {
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
      ADMIN_MANAGE_BUSINESS_MOBILE_AD_BANNER_IMAGE
    );
  
    const manageBusinessMobileAdBannerImage = async ({
      businessMobileAdBannerImages
    }: {
      businessMobileAdBannerImages: Array<{
        id: string | null;
        order: number | null;
        toDelete: boolean | null;
      }>;
    }) => {
      try {
        const response = await adminManageBusinessMobileAdBannerImage({
          variables: {
            businessMobileAdBannerImages
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