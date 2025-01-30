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

    hasReviews: undefined,
    hasFeedbacks: undefined,
    hasBusinessAdBanners: undefined,
    hasBusinessMobileAdBanners: undefined,
    hasAdminNotice: undefined,
    hasAdminBusinessAdBanners: undefined,
    hasAdminBusinessMobileAdBanners: undefined,
    hasTestimonials: undefined,
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
            {/* phone  */}
            <div className="col-span-4">
              <Input
                label="Phone"
                placeholder=" "
                onChange={(e: any) =>
                  setFiltersApplied({ ...filtersApplied, phone: e.target.value })
                }
              />
            </div>
            {/* isBusinessVerified  */}
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
            {/* hasSubscription  */}
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
            {/* hasReviews  */}
            <Button
              variant="white"
              className="col-span-4 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasReviews,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasReviews: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasReviews === undefined
                ? "All have / not have Reviews"
                : filtersApplied?.hasReviews
                  ? "have Reviews"
                  : "Not have Reviews"}
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
            {/* hasBusinessAdBanners  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasBusinessAdBanners,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasBusinessAdBanners: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasBusinessAdBanners === undefined
                ? "All have / not have Desktop Ad Banners"
                : filtersApplied?.hasBusinessAdBanners
                  ? "have Desktop Ad Banners"
                  : "Not have Desktop Ad Banners"}
            </Button>
            {/* hasBusinessMobileAdBanners  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasBusinessMobileAdBanners,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasBusinessMobileAdBanners: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasBusinessMobileAdBanners === undefined
                ? "All have / not have Mobile Ad Banners"
                : filtersApplied?.hasBusinessMobileAdBanners
                  ? "have Mobile Ad Banners"
                  : "Not have Mobile Ad Banners"}
            </Button>
            {/* hasAdminNotice  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasAdminNotice,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasAdminNotice: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasAdminNotice === undefined
                ? "All have / not have Admin Notice"
                : filtersApplied?.hasAdminNotice
                  ? "have Admin Notice"
                  : "Not have Admin Notice"}
            </Button>
            {/* hasAdminBusinessAdBanners  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasAdminBusinessAdBanners,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasAdminBusinessAdBanners: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasAdminBusinessAdBanners === undefined
                ? "All have / not have Admin Business Ad Banners"
                : filtersApplied?.hasAdminBusinessAdBanners
                  ? "have Admin Business Ad Banners"
                  : "Not have Admin Business Ad Banners"}
            </Button>
            {/* hasAdminBusinessMobileAdBanners  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasAdminBusinessMobileAdBanners,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasAdminBusinessMobileAdBanners: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasAdminBusinessMobileAdBanners === undefined
                ? "All have / not have Admin Business Mobile Ad Banners"
                : filtersApplied?.hasAdminBusinessMobileAdBanners
                  ? "have Admin Business Mobile Ad Banners"
                  : "Not have Admin Business Mobile Ad Banners"}
            </Button>
            {/* isBusinessVerified  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
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
                ? "All have / not have Business Verified"
                : filtersApplied?.isBusinessVerified
                  ? "have Business Verified"
                  : "Not have Business Verified"}
            </Button>
            {/* hasTestimonials  */}
            <Button
              variant="white"
              className="col-span-12 h-min"
              onClick={() => {
                const sortOptions = [undefined, true, false];
                const currentIndex = sortOptions.findIndex(
                  (option) => option === filtersApplied?.hasTestimonials,
                );
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                setFiltersApplied({
                  ...filtersApplied,
                  hasTestimonials: sortOptions[nextIndex],
                  page: 1,
                });
              }}
            >
              {filtersApplied?.hasTestimonials === undefined
                ? "All admin selected / not selected Testimonials"
                : filtersApplied?.hasTestimonials
                  ? "admin selected Testimonials"
                  : "admin Not selected Testimonials"}
            </Button>
          </div>
          {/* ------------------------------------------------------  */}
          <p className="col-span-4">Total Result: {data?.total || "not found"}</p>
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
                      adminNotice={user?.adminNotice}
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
