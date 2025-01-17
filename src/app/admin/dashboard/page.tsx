"use client";
import Wrapper from "@/components/elements/Wrappers";
import React, { useEffect } from "react";
import CategoryForm from "../_sections/CategoryForm";
import { useAdminGetAllCategories } from "@/app/_queryCall/adminAuth/csr";
import PageTabs from "../_sections/PageTabs";
import { group } from "console";

export default function AdminDashboardPage() {
  const { data: allCategories, refetch: allCategoriesFetch } = useAdminGetAllCategories();

  return (
    <>
      <Wrapper className="py-5">
        <PageTabs />
      </Wrapper>
      <Wrapper className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div>
          <p className="mb-5 text-xs text-red-500">
            <strong>Note: </strong>
            As per Web Dropdown Navbar UI, no. of category Group name should not be more and less
            than 6.
          </p>
          <CategoryForm
            data={
              allCategories &&
              allCategories.length > 0 &&
              allCategories
                ?.map((category: any) => ({
                  id: category?.id,
                  name: category?.name,
                  groupName: category?.groupName,
                  slug: category?.slug,
                  shortDescription: category?.description,
                  icon: category?.categoryImage,
                  priority: category?.order,
                }))
                .sort((a: any, b: any) => a.priority - b.priority)
            }
            refetchData={allCategoriesFetch}
          />
        </div>
      </Wrapper>
    </>
  );
}
