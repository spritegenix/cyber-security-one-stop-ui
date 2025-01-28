import React from "react";
import LayoutClient from "./LayoutClient";
import { header, header2, footer } from "@/data/layout";
import { fetchCategoriesSSR } from "@/app/_queryCall/ssr";
import { ArrayConvertor } from "@/utils/Convertor";

export default async function Layout({ headerStyle = 1, footerStyle = 1, children }: any) {
  const categories = await fetchCategoriesSSR();
  const headerLowerNav = ArrayConvertor(categories?.allCategories);
  const headerData = {
    upperNav: header?.upperNav,
    lowerNav: headerLowerNav,
  };
  const footerData = {
    ...footer,
    // list2: { ...footer.list2, links: categories?.allCategories },
  };

  return (
    <LayoutClient
      headerStyle={headerStyle}
      footerStyle={footerStyle}
      header1Data={headerData}
      header2Data={header2}
      footerData={footerData}
    >
      {children}
    </LayoutClient>
  );
}
