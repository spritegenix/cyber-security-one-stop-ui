import useAuthStore from "@/zustandStore/authStore";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";

export const ADMIN_GET_ALL_BUSINESS_AD_BANNER_IMAGES = gql`
  query Query($page: Int, $limit: Int, $sortBy: SortByEnum, $sortOrder: OrderEnum) {
    adminGetAllBusinessAdBannerImages(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      images {
        id
        url
        createdAt
        businessDetailsId
        message
        adminBusinessAdBannerImage {
          id
          order
        }
        businessDetails {
          business {
            id
            name
            slug
          }
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminGetAllBusinessAdBannerImages() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, []);

  const [fetchAllBusinessAdBannerImages, { data, loading, error, refetch }] = useLazyQuery(
    ADMIN_GET_ALL_BUSINESS_AD_BANNER_IMAGES,
    {
      // onCompleted: (data) => {
      //   console.log("Fetched business ad banner images successfully:", data);
      // },
      onError: (err) => {
        console.error("Error fetching business ad banner images:", err);
      },
    },
  );
  const adminGetAllBusinessAdBannerImages = ({
    page = 1,
    limit = 100,
    sortBy,
    sortOrder,
  }: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    fetchAllBusinessAdBannerImages({
      variables: { page, limit, sortBy, sortOrder },
    });
  };

  return {
    adminGetAllBusinessAdBannerImages,
    data: data?.adminGetAllBusinessAdBannerImages,
    loading,
    error,
    refetch,
  };
}

export const ADMIN_GET_ALL_BUSINESS_MOBILE_AD_BANNER_IMAGES = gql`
  query AdminGetAllBusinessMobileAdBannerImages(
    $page: Int
    $limit: Int
    $sortBy: SortByEnum
    $sortOrder: OrderEnum
  ) {
    adminGetAllBusinessMobileAdBannerImages(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      images {
        id
        url
        order
        createdAt
        adminBusinessMobileAdBannerImage {
          id
          order
        }
        businessDetails {
          business {
            id
            name
            slug
          }
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export function useAdminGetAllBusinessMobileAdBannerImages() {
  const { setTokenType } = useAuthStore();

  useEffect(() => {
    setTokenType("admin");
  }, []);

  const [fetchAllBusinessMobileAdBannerImages, { data, loading, error, refetch }] = useLazyQuery(
    ADMIN_GET_ALL_BUSINESS_MOBILE_AD_BANNER_IMAGES,
    {
      // onCompleted: (data) => {
      //   console.log("Fetched business mobile ad banner images successfully:", data);
      // },
      onError: (err) => {
        console.error("Error fetching business mobile ad banner images:", err);
      },
    },
  );

  const adminGetAllBusinessMobileAdBannerImages = async (variables: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await fetchAllBusinessMobileAdBannerImages({ variables });
      return { response: response.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    adminGetAllBusinessMobileAdBannerImages,
    data: data?.adminGetAllBusinessMobileAdBannerImages,
    loading,
    error,
    refetch,
  };
}

export const ADMIN_MANAGE_BUSINESS_AD_BANNER_IMAGE = gql`
  mutation AdminManageBusinessAdBannerImage(
    $businessAdBannerImages: [AdminBusinessAdBannerImageInput]
  ) {
    adminManageBusinessAdBannerImage(businessAdBannerImages: $businessAdBannerImages) {
      id
      order
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

  return {
    manageBusinessAdBannerImage,
    data: data?.adminManageBusinessAdBannerImage,
    loading,
    error,
  };
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
        variables: { businessMobileAdBannerImages: businessAdBannerImages },
      });
      return { response: response?.data, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return {
    manageBusinessMobileAdBannerImage,
    data: data?.adminManageBusinessMobileAdBannerImage,
    loading,
    error,
  };
}
