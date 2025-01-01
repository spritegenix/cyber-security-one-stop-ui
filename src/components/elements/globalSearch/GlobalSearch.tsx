"use client";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import LocationTypeHead from "./LocationTypeHead";
import Button from "../Button";
import GlobalTypeHead from "./GlobalTypeHead";
import { useState } from "react";

export default function GlobalSearch() {
  return (
    <div className="grid w-full max-w-2xl items-center gap-2 rounded-lg bg-white p-3 shadow-md max-md:flex-col md:grid-cols-12">
      <div className="flex w-full items-center space-x-1 md:col-span-3">
        <IoLocationOutline className="w-7 text-lg" />
        <LocationTypeHead />
      </div>
      <div className="flex w-full items-center space-x-1 md:col-span-7">
        <IoIosSearch className="w-7 text-lg" />
        <GlobalTypeHead />
      </div>
      <Button className="md:col-span-2" variant="orange-gradient">Search</Button>
    </div>
  );
}
