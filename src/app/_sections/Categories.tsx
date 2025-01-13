import { search } from "@/assets";
import Wrapper from "@/components/elements/Wrappers";
// import { categoryArray } from "@/data/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Categories({ categories }: any) {
  return (
    <Wrapper className="my-16">
      <h2 className="mb-5 text-3xl font-bold text-bg1">Categories</h2>
      <ul className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 lg:gap-10 xl:grid-cols-8">
        {categories?.map((category: any, index: number) => (
          <CategoryCard
            key={category?.id || index}
            id={category?.id || index}
            label={category?.name || "Category Name"}
            href={category?.slug ? `/services/${category?.slug}` : "#"}
            icon={category?.categoryImage || search}
            desc={category?.description || "Category Description"}
          />
        ))}
        <Link href={"#"} className="group w-full cursor-pointer transition-all duration-300">
          <div className="mb-4 flex w-full justify-center rounded-md border border-zinc-400 p-8 duration-300 group-hover:border-bg1 group-hover:shadow-lg">
            <Image
              src={search}
              alt={"search"}
              width={100}
              height={100}
              className="h-full w-full object-contain"
            />
          </div>
          <h4 className="text-center transition-all duration-300 group-hover:text-bg1">More</h4>
        </Link>
      </ul>
    </Wrapper>
  );
}

export function CategoryCard({ id, label, href, icon, desc }: any) {
  return (
    <Link
      href={href || "#"}
      className="group relative w-full cursor-pointer transition-all duration-300"
    >
      <div className="mb-4 flex w-full justify-center rounded-md border border-zinc-400 p-4 group-hover:border-bg1 group-hover:shadow-lg">
        <Image
          src={icon}
          alt={label}
          width={100}
          height={100}
          className="h-full w-full object-contain"
        />
      </div>
      <h4 className="cursor-pointer text-center transition-all duration-300 group-hover:text-bg1">
        {label}
      </h4>
      {/* Hover Effect to show Description */}
      <div className="absolute left-1/2 top-0 z-[2] w-[130%] -translate-x-1/2 cursor-pointer rounded-lg border border-zinc-400 bg-white p-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="mb-4 flex w-full justify-center rounded-md border border-zinc-400 p-4 group-hover:border-bg1 group-hover:shadow-lg">
          <Image
            src={icon}
            alt={label}
            width={100}
            height={100}
            className="h-full w-full object-contain"
          />
        </div>
        <h4 className="cursor-pointer text-center transition-all duration-300 group-hover:text-bg1">
          {label}
        </h4>
        <p className="text-center text-sm text-zinc-600">{desc}</p>
      </div>
    </Link>
  );
}
