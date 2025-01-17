"use client";
import Wrapper from "@/components/elements/Wrappers";
import React, { use, useEffect, useState } from "react";
import { Input } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { useDebounce } from "@/utils/debounce";
import {
  useAdminAllBusinesses,
  useAdminGetBusinessById,
} from "@/app/_queryCall/adminAuth/business";
import BusinessCard from "./_sections/BusinessCard";
import PageTabs from "../_sections/PageTabs";
import IndividualBusinessData from "./_sections/IndividualBusinessData";

export default function UserListPage() {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [filtersApplied, setFiltersApplied] = useState<any>({
    name: undefined,
    email: undefined,
    phone: undefined,
    page: 1,
    limit: 5,
    isBusinessVerified: undefined,
    hasSubscription: undefined,
    sortBy: "createdAt",
    sortOrder: "asc",
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filtersApplied);
  const {
    adminAllBusinesses,
    data,
    loading,
    error,
    refetch: adminAllBusinessRefetch,
  } = useAdminAllBusinesses();

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
    adminAllBusinesses(debouncedFilters);
  }, [debouncedFilters]);

  useEffect(() => {
    // console.log("data", data);
    if (debouncedFilters.page === 1) {
      setUsersList(data?.businesses || []);
    } else if (data?.businesses?.length > 0) {
      setUsersList((prev: any[]) => [...prev, ...data?.businesses]);
    }
  }, [data]);

  function handleLordMore() {
    setFiltersApplied({ ...filtersApplied, page: filtersApplied.page + 1 });
  }

  // ------------------------------------------------------------------ //
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const [selectedUserData, setSelectedUserData] = useState<any>(undefined);
  const { adminGetBusinessById, refetch: adminGetBusinessByIdRefetch } = useAdminGetBusinessById();
  useEffect(() => {
    async function fetchData() {
      if (selectedUserId) {
        const response = await adminGetBusinessById({ businessId: selectedUserId });
        // console.log(response?.response?.adminGetBusinessById);
        setSelectedUserData(response?.response?.adminGetBusinessById);
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
      <Wrapper className="grid grid-cols-1 gap-5 py-10 lg:grid-cols-2">
        {/* Left Side  */}
        <div>
          <h2 className="mb-5 text-2xl font-bold">Experts/ Firms On Platform</h2>
          {/* Firm Search Bar */}
          <div className="grid grid-cols-12 items-center gap-1 rounded bg-white px-2 shadow">
            <div className="col-span-4">
              <Input
                label="Name"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, name: e.target.value })
                }
              />
            </div>
            <div className="col-span-4">
              <Input
                label="Email"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, email: e.target.value })
                }
              />
            </div>
            <div className="col-span-4">
              <Input
                label="Phone"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, phone: e.target.value })
                }
              />
            </div>

            <Button
              variant="white"
              className="col-span-4 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.isBusinessVerified,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  isBusinessVerified: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.isBusinessVerified === undefined
                ? "All Verified/ Non Verified Users"
                : filtersApplied?.isBusinessVerified
                  ? "Verified Users"
                  : "Non Verified Users"}
            </Button>
            <Button
              variant="white"
              className="col-span-4 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasSubscription,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasSubscription: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasSubscription === undefined
                ? "All Paid/ Free Users"
                : filtersApplied?.hasSubscription
                  ? "Paid Users"
                  : "Free Users"}
            </Button>
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
            <p className="col-span-4">Total Result: {data?.total || "not found"}</p>
          </div>
          {/* Filtered Firm List */}
          {loading ? (
            "Loading..."
          ) : (
            <ul className="mt-2 space-y-2">
              {usersList?.length > 0
                ? usersList?.map((user: any) => (
                    <BusinessCard
                      key={user?.id}
                      id={user?.id}
                      slug={user?.slug}
                      name={user?.name}
                      email={user?.primaryContacts?.find((c: any) => c?.type === "EMAIL")?.value}
                      phone={user?.primaryContacts?.find((c: any) => c?.type === "PHONE")?.value}
                      isBlock={user?.isBlocked}
                      isVerified={user?.isBusinessVerified}
                      selectedUserId={selectedUserId}
                      setSelectedUserId={setSelectedUserId}
                      refetchData={adminAllBusinessRefetch}
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
        <div className="mt-12">
          <IndividualBusinessData
            business={selectedUserData}
            refetchData={adminGetBusinessByIdRefetch}
          />
        </div>
      </Wrapper>
    </>
  );
}

// "sortBy":"alphabetical" not working
// How to Block user
// Admin Note
