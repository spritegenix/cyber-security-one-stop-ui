"use client";
import React, { useEffect, useState } from "react";
import Filters from "@/components/elements/Filters";
import Layout from "@/components/layout/Layout";
import ServiceCard from "@/app/services/[service]/_sections/ServiceCard";
// import ChatBox from "@/components/elements/chatbox/ChatBox";
import Wrapper from "@/components/elements/Wrappers";
import { FilterProps } from "./types";
import Button from "@/components/elements/Button";
import FilterSidebar from "./_sections/FilterSidebar";
import { IoFilter } from "react-icons/io5";
import Portal from "@/components/elements/Portal";
import { useFilterBusiness } from "@/app/_queryCall/csr";
import { AdBannerSlider } from "@/app/_sections/AdBannerSlider";
import { banner } from "@/assets";
import { useDebounce } from "@/utils/debounce";

type Props = {
  params: {
    service: string;
  };
};

export default function IndividualService({ params }: Props) {
  const serviceSlug = params?.service;
  const [isFilterSidebar, setIsFilterSidebar] = useState<boolean>(false);
  const [show, setShow] = useState<Boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isFilterFixed, setIsFilterFixed] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<FilterProps>({
    verify: false,
    rating: 0,
    sortBy: "alphabetical",
    order: "asc",
    page: 1,
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filtersApplied);

  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  const [filteredBusinessesCategory, setFilteredBusinessesCategory] = useState("");
  // Queries
  const {
    getAllRelatedBusinesses,
    data: businessData,
    loading,
    error,
    refetch,
  } = useFilterBusiness();

  // Debounced function using custom hook
  const debouncedUpdateFilters = useDebounce((newFilters: any) => {
    setDebouncedFilters(newFilters);
  }, 300);

  // Effect to debounce filter updates
  useEffect(() => {
    debouncedUpdateFilters(filtersApplied);
  }, [filtersApplied]);

  useEffect(() => {
    getAllRelatedBusinesses({
      categorySlug: serviceSlug,
      verified: debouncedFilters.verify,
      minRating: debouncedFilters.rating,
      sortBy: debouncedFilters.sortBy,
      order: debouncedFilters.order,
      page: debouncedFilters.page,
    });
  }, [debouncedFilters]);

  useEffect(() => {
    console.log(businessData, "businessData");
    setFilteredBusinessesCategory(businessData?.search?.categories[0]?.name);
    if (debouncedFilters.page === 1) {
      setFilteredBusinesses(businessData?.search?.businesses || []);
    } else if (businessData?.search?.businesses?.length > 0) {
      setFilteredBusinesses((prev: any[]) => [...prev, ...businessData?.search?.businesses]);
    }
  }, [businessData]);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY) {
          setShow(true);
        } else {
          setShow(false);
        }
      } else {
        setShow(false);
      }
      setLastScrollY(window.scrollY);

      // Check if the scroll is past 75px and fix the filters
      if (window.scrollY > 75) {
        setIsFilterFixed(true);
      } else {
        setIsFilterFixed(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  function handleLordMore() {
    setFiltersApplied({ ...filtersApplied, page: (filtersApplied.page as number) + 1 });
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true}>
        <AdBannerSlider />
      </Wrapper>
      {/* Sorting and Filters */}
      <Wrapper
        containerClassName={`my-5 hidden md:block flex w-full flex-col pt-0 transition-all duration-300 ${
          isFilterFixed
            ? `fixed left-0 right-0 z-50 bg-zinc-100 ${show ? "top-[2.1rem]" : "top-[6.8rem]"}`
            : ""
        }`}
      >
        {/* Desktop Filter  */}
        <Filters filtersApplied={filtersApplied} setFiltersApplied={setFiltersApplied} />
        {/* Mobile Filter  */}
        {isFilterSidebar && (
          <FilterSidebar
            handleSidebar={() => setIsFilterSidebar(false)}
            filtersApplied={filtersApplied}
            setFiltersApplied={setFiltersApplied}
          />
        )}
        <Portal>
          <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-bg1 bg-white px-3 py-1 md:hidden">
            <Button
              className="w-full"
              leftIcon={<IoFilter className="text-lg text-white" />}
              variant="orange"
              onClick={() => setIsFilterSidebar((pre) => !pre)}
            >
              Filters
            </Button>
          </div>
        </Portal>
      </Wrapper>

      <Wrapper className="mb-16 grid grid-cols-12 gap-5">
        {filteredBusinessesCategory && (
          <div className="col-span-12">
            <h2 className="text-2xl font-semibold">
              <span>Category: </span>
              <span className="text-bg1">{`"${filteredBusinessesCategory}"`}</span>
            </h2>
            <p className="text-sm text-zinc-600">Showing {businessData?.search?.total} results</p>
          </div>
        )}
        {/* Service Cards  */}
        <ul className="col-span-12 space-y-5 md:col-span-8">
          {filteredBusinesses?.length > 0 ? (
            filteredBusinesses?.map((item: any, i: number) => (
              <ServiceCard
                key={item?.id}
                name={item?.name}
                isVerified={item?.isBusinessVerified || ""}
                city={
                  item?.businessDetails?.addresses.length > 0 &&
                  item?.businessDetails?.addresses[0]?.city
                }
                state={
                  item?.businessDetails?.addresses?.length > 0 &&
                  item?.businessDetails?.addresses[0]?.state
                }
                country={
                  item?.businessDetails?.addresses?.length > 0 &&
                  item?.businessDetails?.addresses[0]?.country
                }
                rating={item?.averageRating || ""}
                review={item?.reviewCount || ""}
                yearsOfExperience={item?.businessDetails?.experience || ""}
                sliderImages={
                  (item?.businessDetails?.coverImages?.length > 0 &&
                    item?.businessDetails?.coverImages?.map((item: any) => item?.url)) || [
                    banner,
                    banner,
                  ]
                }
                slug={item?.slug || ""}
                tags={
                  item?.businessDetails?.categories?.length > 0
                    ? [
                        ...item.businessDetails.categories
                          .slice(0, 4)
                          .map((category: any) => category?.name),
                        "Many More",
                      ]
                    : []
                }
                phoneNumber={
                  item?.primaryContacts?.find((contact: any) => contact?.type === "PHONE")?.value ||
                  null
                }
                whatsAppNumber={
                  item?.primaryContacts?.find((contact: any) => contact?.type === "PHONE")?.value ||
                  null
                }
              />
            ))
          ) : (
            <p className="text-xl font-medium text-zinc-700">No Result Found</p>
          )}
          {businessData?.search?.total > filteredBusinesses?.length && (
            <Button
              variant="orange-gradient"
              className="mt-5 w-full"
              disabled={loading}
              onClick={() => handleLordMore()}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          )}
        </ul>
        {/* Ad Cards  */}
        <div className="space-y-5 max-md:hidden md:col-span-4">
          <div className="sticky top-48">
            {/* AdBannerSlider  */}
            <div className="swiperStyle2 relative">
              <AdBannerSlider onlyMobile={true} />
            </div>
          </div>
          {/* <ChatBox /> */}
        </div>
      </Wrapper>
    </Layout>
  );
}
