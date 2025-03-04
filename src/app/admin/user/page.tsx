"use client";
import { useAdminAllUsers, useAdminGetUserById } from "@/app/_queryCall/adminAuth/user";
import Wrapper from "@/components/elements/Wrappers";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import UserCard from "./_sections/UserCard";
import { useDebounce } from "@/utils/debounce";
import PageTabs from "../_sections/PageTabs";
import UserIndividualData from "./_sections/UserIndividualData";

export default function UserListPage() {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<any>({
    name: undefined,
    email: undefined,
    phone: undefined,
    page: 1,
    limit: 5,
    isVerified: false,
    sortBy: "createdAt",
    sortOrder: "asc",
    hasFeedbacks: undefined,
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filtersApplied);
  const { adminAllUsers, data, loading, error, refetch: adminAllUsersRefetch } = useAdminAllUsers();

  // Debounced function using custom hook
  const debouncedUpdateFilters = useDebounce((newFilters: any) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Effect to debounce filter updates
  useEffect(() => {
    debouncedUpdateFilters(filtersApplied);
  }, [filtersApplied]);

  // Fetch users whenever debounced filters change
  useEffect(() => {
    adminAllUsers(debouncedFilters);
  }, [debouncedFilters]);

  useEffect(() => {
    if (debouncedFilters.page === 1) {
      setUsersList(data?.users || []);
    } else if (data?.users?.length > 0) {
      setUsersList((prev: any[]) => [...prev, ...data?.users]);
    }
  }, [data]);

  function handleLordMore() {
    setFiltersApplied({ ...filtersApplied, page: filtersApplied.page + 1 });
  }

  // ------------------------------------------------------------------ //
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [selectedUserData, setSelectedUserData] = useState<any>(undefined);
  const {
    adminGetUserById,
    data: adminGetUserByIdData,
    loading: adminGetUserByIdLoading,
    error: adminGetUserByIdError,
    refetch: adminGetUserByIdRefetch,
  } = useAdminGetUserById();
  useEffect(() => {
    async function fetchData() {
      if (selectedUserId) {
        const response = await adminGetUserById({ userId: selectedUserId });
        // console.log(response?.response?.adminGetUserById);
        setSelectedUserData(response?.response?.adminGetUserById);
      }
    }
    fetchData();
  }, [selectedUserId]);
  // ------------------------------------------------------------------- //

  return (
    <>
      <Wrapper className="py-5">
        <PageTabs />
      </Wrapper>
      <Wrapper className="grid grid-cols-1 gap-5 py-10 lg:grid-cols-12">
        {/* Left Side  */}
        <div className="col-span-7">
          <h2 className="mb-5 text-2xl font-bold">Users On Platform</h2>
          {/* User Search Bar */}
          <div className="grid grid-cols-12 items-center gap-1 rounded bg-white px-2 pb-4 shadow">
            {/* Name  */}
            <div className="col-span-4">
              <Input
                label="Name"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, name: e.target.value })
                }
              />
            </div>
            {/* Email  */}
            <div className="col-span-4">
              <Input
                label="Email"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, email: e.target.value })
                }
              />
            </div>
            {/* Phone  */}
            <div className="col-span-4">
              <Input
                label="Phone"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, phone: e.target.value })
                }
              />
            </div>
            {/* isVerified  */}
            <Button
              variant="white"
              className="col-span-4 h-min"
              onClick={() =>
                setFiltersApplied({
                  ...filtersApplied,
                  isVerified: !filtersApplied?.isVerified,
                  page: 1,
                })
              }
            >
              {filtersApplied?.isVerified ? "Verified Users" : "All Users"}
            </Button>
            {/* sortOrder  */}
            <Button
              variant="white"
              className="col-span-4 h-min text-xl"
              onClick={() =>
                setFiltersApplied({
                  ...filtersApplied,
                  sortOrder: filtersApplied?.sortOrder === "asc" ? "desc" : "asc",
                  page: 1,
                })
              }
            >
              {filtersApplied?.sortOrder === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
            </Button>
            {/* sortBy  */}
            <Button
              variant="white"
              className="col-span-4 h-min"
              onClick={() => {
                const sortOptions = ["alphabetical", "createdAt", "updatedAt"];
                const currentIndex = sortOptions.indexOf(filtersApplied?.sortBy || "alphabetical");
                const nextIndex = (currentIndex + 1) % sortOptions.length;

                setFiltersApplied({
                  ...filtersApplied,
                  sortBy: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.sortBy || "alphabetical"}
            </Button>
            {/* hasFeedbacks  */}
            <Button
              variant="white"
              className="col-span-4 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasFeedbacks,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasFeedbacks: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasFeedbacks === undefined
                ? "All have / not have Feedbacks"
                : filtersApplied?.hasFeedbacks
                  ? "have Feedbacks"
                  : "Not have Feedbacks"}
            </Button>
          </div>
          <p className="col-span-4">Total Result: {data?.total || "not found"}</p>
          {/* Filtered Users List */}
          {loading ? (
            "Loading..."
          ) : (
            <ul className="mt-2 space-y-2">
              {usersList?.length > 0
                ? usersList?.map((user: any) => (
                    <UserCard
                      key={user?.id}
                      id={user?.id}
                      slug={user?.slug}
                      name={user?.name}
                      email={user?.contacts?.find((c: any) => c?.type === "EMAIL")?.value}
                      phone={user?.contacts?.find((c: any) => c?.type === "PHONE")?.value}
                      isBlock={user?.isBlocked}
                      isVerified={user?.isVerified}
                      selectedUserId={selectedUserId}
                      setSelectedUserId={setSelectedUserId}
                      refetchData={adminAllUsersRefetch}
                    />
                  ))
                : "No Result Found"}
            </ul>
          )}
          {data?.total > usersList?.length && (
            <Button
              variant="orange-gradient"
              className="mt-5 w-full"
              disabled={loading}
              onClick={() => handleLordMore()}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </div>
        {/* Right Side  */}
        <div className="col-span-5 mt-12">
          <UserIndividualData user={selectedUserData} refetchData={adminGetUserByIdRefetch} />
        </div>
      </Wrapper>
    </>
  );
}
