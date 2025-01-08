"use client";
import React, { useEffect, useState } from "react";
import { service1 } from "@/assets";
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

type Props = {
  params: {
    service: String;
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
    order: "desc",
    page: 1,
  });
  const [filteredBusinesses, setFilteredBusinesses] = useState<{
    CategoryName: string;
    businesses: any[];
  }>({
    CategoryName: "",
    businesses: [],
  });
  // Queries
  const {
    getAllRelatedBusinesses,
    data: businessData,
    loading,
    error,
    refetch,
  } = useFilterBusiness();
  useEffect(() => {
    const fetchInitialData = async () => {
      const { searchResults } = await getAllRelatedBusinesses({
        categorySlug: serviceSlug,
        verified: filtersApplied?.verify || false,
        minRating: filtersApplied?.rating,
        sortBy: filtersApplied?.sortBy,
        order: filtersApplied?.order,
        page: filtersApplied?.page,
      });
      if (searchResults) {
        console.log(searchResults?.businesses);
        // setFilteredBusinesses(searchResults?.businesses);
        setFilteredBusinesses({
          CategoryName: searchResults?.categories > 0 && searchResults?.categories[0]?.name,
          businesses: searchResults?.businesses,
        });
      }
      console.log(error);
    };
    fetchInitialData();
  }, [filtersApplied]);

  // useEffect(() => {
  //   if (error) {
  //     refetch();
  //   }
  // }, [error]);

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

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper isTop={true} className="swiperStyle2 relative">
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
        {filteredBusinesses?.CategoryName && (
          <h2 className="col-span-12 text-2xl font-semibold">
            <span>Category: </span>
            <span className="text-bg1">{`"${filteredBusinesses?.CategoryName}"`}</span>
          </h2>
        )}
        {/* Service Cards  */}
        <ul className="col-span-12 space-y-5 md:col-span-8">
          {filteredBusinesses?.businesses?.map((item: any, i: number) => (
            <ServiceCard
              key={item?.id}
              name={item?.name}
              isVerified={item?.isBusinessVerified || ""}
              city={
                (item?.businessDetails?.addresses > 0 &&
                  item?.businessDetails?.addresses[0].city) ||
                ""
              }
              state={
                (item?.businessDetails?.addresses > 0 &&
                  item?.businessDetails?.addresses[0].state) ||
                ""
              }
              country={
                (item?.businessDetails?.addresses > 0 &&
                  item?.businessDetails?.addresses[0].country) ||
                ""
              }
              rating={item?.averageRating || ""}
              review={item?.reviewCount || ""}
              yearsOfExperience={item?.businessDetails?.experience || ""}
              sliderImages={item?.businessDetails?.coverImages?.map((item: any) => item?.url) || []}
              slug={item?.slug || ""}
              tags={
                (item?.businessDetails?.categories?.length > 0 &&
                  item?.businessDetails?.categories?.map((item: any) => item?.name)) ||
                []
              }
              phoneNumber={
                (item?.primaryContacts.length > 0 &&
                  item?.primaryContacts?.map(
                    (item: any) => item?.type === "PHONE" && item?.value,
                  )) ||
                []
              }
              whatsAppNumber={
                (item?.primaryContacts.length > 0 &&
                  item?.primaryContacts?.map(
                    (item: any) => item?.type === "PHONE" && item?.value,
                  )) ||
                ""
              }
            />
          ))}
        </ul>
        {/* Ad Cards  */}
        <div className="space-y-5 max-md:hidden md:col-span-4">
          <div className="sticky top-48">
            {/* AdBannerSlider  */}
            <div className="swiperStyle2 relative">
              <AdBannerSlider mobileHeight="h-52" onlyMobile={true} />
            </div>
          </div>
          {/* <ChatBox /> */}
        </div>
      </Wrapper>
    </Layout>
  );
}
