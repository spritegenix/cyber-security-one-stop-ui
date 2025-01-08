import React from "react";
import useAuthStore from "@/zustandStore/authStore";
import Link from "next/link";
import { LoggedUser } from "../Header2/AuthButton";
import { FaUserSecret } from "react-icons/fa";

export default function FirmButton() {
  const isLogin = useAuthStore((state) => state?.firmToken);
  return (
    <>
      {isLogin && (
        <Link href="/listing-profile/firm-user" className="relative cursor-pointer">
          <span className="absolute left-1/2 top-[70%] -translate-x-1/2 cursor-pointer rounded-sm border-2 border-bg1 bg-white px-1 text-xs font-medium">
            Firm
          </span>
          <div className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-bg1 shadow-lg">
            <p className="cursor-pointer text-xl font-bold capitalize text-white">
              <FaUserSecret />
            </p>
          </div>
        </Link>
      )}
    </>
  );
}
