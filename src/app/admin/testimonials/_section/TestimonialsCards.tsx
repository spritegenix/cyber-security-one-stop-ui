"use client";
import {
  useAdminGetAllTestimonials,
  useAdminManageTestimonials,
} from "@/app/_queryCall/adminAuth/reviews";
import { Input } from "postcss";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function TestimonialsCards({ filterType = "BUSINESS" }: any) {
  // ------------------------------
  const { getTestimonials, data, loading, error, refetch } = useAdminGetAllTestimonials();

  // -------------------------------------
  const {
    adminManageTestimonials,
    data: adminManageTestimonialsData,
    loading: adminManageTestimonialsLoading,
    error: adminManageTestimonialsError,
  } = useAdminManageTestimonials();

  useEffect(() => {
    getTestimonials({ filter: filterType });
    // console.log(data);
  }, [data]);

  async function handleTestimonialOrder(id: string, orderSelected: number) {
    await adminManageTestimonials([{ id, order: orderSelected }]);
    refetch();
  }

  function handleTestimonialDelete(id: string) {
    adminManageTestimonials([{ id, toDelete: true }]);
    refetch();
  }

  if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p>Error loading testimonials. Please try again later.</p>;

  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">
        {filterType === "BUSINESS" ? "Business" : "User"} Testimonials
      </h2>
      <p>Total : {data?.adminGetAllTestimonials?.total}</p>
      {adminManageTestimonialsError && (
        <p className="text-sm text-red-500">{adminManageTestimonialsError?.message}</p>
      )}
      {adminManageTestimonialsData && (
        <p className="text-sm text-green-500">{adminManageTestimonialsData?.[0].message}</p>
      )}
      <ul>
        {data?.adminGetAllTestimonials?.testimonials?.map((testimonial: any) => (
          <Cards
            key={testimonial?.id}
            name={filterType === "BUSINESS" ? testimonial?.business?.name : testimonial?.user?.name}
            testimonial={testimonial?.comment}
            rating={testimonial?.rating}
            order={testimonial?.order}
            handleTestimonialOrder={handleTestimonialOrder}
            handleTestimonialDelete={handleTestimonialDelete}
            id={testimonial?.id}
            createdAt={testimonial?.createdAt}
            refetchData={refetch}
          />
        ))}
      </ul>
    </section>
  );
}

function Cards({
  id,
  name,
  testimonial,
  rating,
  order,
  createdAt,
  handleTestimonialOrder,
  handleTestimonialDelete,
}: any) {
  const [orderSelected, setOrderSelected] = useState<number | undefined>(order);

  const handleBlur = () => {
    if (orderSelected !== undefined) {
      handleTestimonialOrder(id, orderSelected);
    }
  };

  return (
    <li className="mb-4">
      <p className="font-semibold">Name: {name}</p>
      <div className="relative rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <MdDeleteForever
          className="absolute right-2 top-2 cursor-pointer text-2xl text-red-500 duration-300 hover:scale-105"
          onClick={() => handleTestimonialDelete(id)}
        />
        <p className="text-sm text-gray-700">Rating: {rating}/5</p>
        <p className="my-2 text-base text-gray-800">{testimonial}</p>
        <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <div className="mt-2 flex gap-2">
        <h2 className="text-lg font-semibold">Order On UI: </h2>
        <input
          type="number"
          className="w-1/4 rounded border border-gray-300 text-sm"
          value={orderSelected || ""}
          onChange={(e) => setOrderSelected(Number(e.target.value))}
          onBlur={handleBlur}
          placeholder="Set order"
        />
      </div>
    </li>
  );
}
