"use client";
import Button from "@/components/elements/Button";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { VscLaw } from "react-icons/vsc";
import { useHeaderUser } from "@/app/_queryCall/businessAuth/csr";
import useAuthStore from "@/zustandStore/authStore";
import { IoShieldHalfOutline } from "react-icons/io5";

export default function AuthButton() {
  const isLogin = useAuthStore((state) => state?.firmToken);
  return (
    <>
      {!isLogin ? (
        <Button
          as={Link}
          href="/listing-login"
          variant="orange-gradient"
          leftIcon={<IoShieldHalfOutline className="text-xl" />}
        >
          LogIn
        </Button>
      ) : (
        <LoggedUser />
      )}
    </>
  );
}

export function LoggedUser() {
  const { userData: loggedUser, loading, error, refetch } = useHeaderUser();
  return (
    <Link
      className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-bg1 shadow-lg"
      href={loggedUser?.slug ? `/listing-profile/${loggedUser?.slug}` : "#"}
    >
      {(loggedUser?.businessDetails === null || loggedUser?.businessDetails?.logo === null) &&
      !loading ? (
        <p className="cursor-pointer text-xl font-bold capitalize text-white">
          {loggedUser?.name ? loggedUser?.name[0] : "F"}
        </p>
      ) : (
        loggedUser?.businessDetails?.logo && (
          <Image
            src={loggedUser?.businessDetails?.logo || ""}
            alt="avatar"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        )
      )}
    </Link>
  );
}
