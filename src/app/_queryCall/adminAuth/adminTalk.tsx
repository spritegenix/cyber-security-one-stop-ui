import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";

// Admin Side
export const ADMIN_GET_ALL_NOTICES = gql`
  query AdminGetAllAdminNotices(
    $type: AdminNoticeType
    $page: Int
    $limit: Int
    $sortBy: SortByEnum
    $sortOrder: OrderEnum
  ) {
    adminGetAllAdminNotices(
      type: $type
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      notices {
        id
        businessId
        business {
          id
          name
          slug
        }
        userId
        user {
          id
          name
          slug
        }
        type
        note
        createdAt
        updatedAt
        deletedAt
        message
      }
      total
      page
      limit
      totalPages
    }
  }
`;

// Admin Notices Query
export function useAdminNotices() {
  const [fetchAdminNotices, { data, loading, error }] = useLazyQuery(ADMIN_GET_ALL_NOTICES, {
    onCompleted: (data: any) => {
      if (data && data?.adminGetAllAdminNotices) {
        // console.log("Notices fetched successfully:", data?.adminGetAllAdminNotices);
      }
    },
  });

  const adminGetAllNotices = async ({
    type,
    page,
    limit,
    sortBy,
    sortOrder,
  }: {
    type?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await fetchAdminNotices({
        variables: { type, page, limit, sortBy, sortOrder },
      });
      return { response: response?.data?.adminGetAllAdminNotices, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { adminGetAllNotices, data, loading, error };
}

export const ADMIN_MANAGE_ADMIN_NOTICES = gql`
  mutation AdminManageAdminNotices($adminNotices: [AdminNoticeInput]) {
    adminManageAdminNotices(adminNotices: $adminNotices) {
      id
      businessId
      business {
        id
        name
        slug
      }
      userId
      user {
        id
        name
        slug
      }
      type
      note
      createdAt
      updatedAt
      deletedAt
      message
    }
  }
`;

export interface AdminNoticeInput {
  userId?: string | undefined;
  userSlug?: string | undefined;
  businessId?: string | undefined;
  businessSlug?: string | undefined;
  id?: string | undefined;
  note?: string | undefined;
  type?:
    | "GLOBAL"
    | "ALL_USER"
    | "INDIVIDUAL_USER"
    | "ALL_BUSINESS"
    | "INDIVIDUAL_BUSINESS"
    | undefined;
  toDelete?: boolean | undefined;
}

// Admin Manage Notices Mutation
export function useAdminManageNotices() {
  const [manageAdminNotices, { data, loading, error }] = useMutation(ADMIN_MANAGE_ADMIN_NOTICES, {
    // onCompleted: (data: any) => {
    //   if (data && data?.adminManageAdminNotices) {
    //     console.log("Notices managed successfully:", data?.adminManageAdminNotices);
    //   }
    // },
  });

  const adminManageNotices = async (adminNotices: AdminNoticeInput[]) => {
    try {
      const response = await manageAdminNotices({
        variables: { adminNotices },
      });
      return { response: response?.data?.adminManageAdminNotices, error: null };
    } catch (err) {
      return { response: null, error: err };
    }
  };

  return { adminManageNotices, data: data?.adminManageAdminNotices, loading, error };
}

// User Side

// Firm Side
