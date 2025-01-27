"use client";
import {
  useAdminGetAllBusinessAdBannerImages,
  useAdminManageBusinessAdBannerImage,
} from "@/app/_queryCall/adminAuth/adBanner";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function DesktopAdCards() {
  const { adminGetAllBusinessAdBannerImages, data, loading, error, refetch } =
    useAdminGetAllBusinessAdBannerImages();
  useEffect(() => {
    adminGetAllBusinessAdBannerImages({});
    // console.log(data, "adminGetAllBusinessAdBannerImagesData");
  }, [data]);

  const {
    manageBusinessAdBannerImage,
    data: manageBusinessAdBannerImageData,
    loading: manageBusinessAdBannerImageLoading,
    error: manageBusinessAdBannerImageError,
  } = useAdminManageBusinessAdBannerImage();
  async function handleOrder(id: string, orderSelected: number) {
    // console.log(id, orderSelected);
    await manageBusinessAdBannerImage([{ id, order: orderSelected }]);
    refetch();
  }
  async function handleDelete(id: string) {
    await manageBusinessAdBannerImage([{ id, toDelete: true }]);
    refetch();
  }

  if (loading) return <p>Loading banners...</p>;
  if (error) return <p>Error loading banners. Please try again later.</p>;

  return (
    <section>
      <ul className="space-y-4">
        <p>Total : {data?.total}</p>
        {data?.images?.length === 0 && <p>No banner found</p>}
        {manageBusinessAdBannerImageData && (
          <p className="text-sm text-green-500">{manageBusinessAdBannerImageData?.[0]?.message}</p>
        )}
        {manageBusinessAdBannerImageError && (
          <p className="text-sm text-red-500">{manageBusinessAdBannerImageError?.message}</p>
        )}
        {data?.images?.map((item: any, index: number) => (
          <Card
            key={item?.id}
            id={item?.id}
            firmName={item?.businessDetails?.business?.name}
            order={item?.adminBusinessAdBannerImage?.order}
            image={item?.url}
            handleOrder={handleOrder}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

function Card({ id, firmName, order, image, handleOrder, handleDelete }: any) {
  const [orderSelected, setOrderSelected] = useState<number | undefined>(order);
  const handleBlur = () => {
    if (orderSelected !== undefined) {
      handleOrder(id, orderSelected);
    }
  };
  return (
    <>
      <li>
        <div className="relative">
          <div className="flex justify-between">
            <p>
              <strong>{firmName}</strong>
            </p>
            <MdDeleteForever
              className="float-right cursor-pointer text-2xl text-red-500 duration-300 hover:scale-105"
              onClick={() => handleDelete(id)}
            />
          </div>
          <Image src={image} alt="image" width={900} height={300} className="rounded-lg shadow" />
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
        </div>
      </li>
    </>
  );
}
