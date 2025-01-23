"use client";
import { banner } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function DesktopAdCards() {
  async function handleOrder(id: string, orderSelected: number) {}
  async function handleDelete(id: string) {}
  return (
    <div className="">
      <ul className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <Card
            key={index}
            id={index.toString()}
            order={index + 1}
            image={banner}
            handleOrder={handleOrder}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function Card({ id, order, image, handleOrder, handleDelete }: any) {
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
          <MdDeleteForever
            className="float-right cursor-pointer text-2xl text-red-500 duration-300 hover:scale-105"
            onClick={() => handleDelete(id)}
          />
          <Image src={image} alt="image" width={900} height={500} className="rounded-lg shadow" />
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
