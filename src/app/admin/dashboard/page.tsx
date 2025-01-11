"use client";
import Wrapper from "@/components/elements/Wrappers";
import React, { useEffect } from "react";
import CategoryForm from "../_sections/CategoryForm";
import { useAdminGetAllCategories } from "@/app/_queryCall/adminAuth/csr";

export default function AdminDashboardPage() {
  const { data: allCategories, refetch: allCategoriesFetch } = useAdminGetAllCategories();

  return (
    <>
      <Wrapper className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <CategoryForm
          data={
            allCategories &&
            allCategories.length > 0 &&
            allCategories
              ?.map((category: any) => ({
                id: category?.id,
                name: category?.name,
                slug: category?.slug,
                shortDescription: category?.description,
                icon: category?.categoryImage,
                priority: category?.order,
              }))
              .sort((a: any, b: any) => a.priority - b.priority)
          }
          refetchData={allCategoriesFetch}
        />
      </Wrapper>
    </>
  );
}
