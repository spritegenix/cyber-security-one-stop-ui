"use client";
import Button from "@/components/elements/Button";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { VscLaw } from "react-icons/vsc";
import { useHeaderUser } from "@/app/_queryCall/businessAuth/csr";
import useAuthStore from "@/zustandStore/authStore";

export default function AuthButton() {
  const isLogin = useAuthStore((state) => state?.firmToken);
  return (
    <>
      {!isLogin ? (
        <Button
          as={Link}
          href="/listing-login"
          variant="orange-gradient"
          leftIcon={<VscLaw className="text-xl" />}
        >
          LogIn
        </Button>
      ) : (
        <LoggedUser />
      )}
    </>
  );
}

function LoggedUser() {
  const { userData: loggedUser, loading, error, refetch } = useHeaderUser();
  return (
    <Link
      className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-bg1 shadow-lg"
      href={loggedUser?.slug ? `/listing-profile/${loggedUser?.slug}` : "#"}
    >
      {loggedUser?.businessDetails?.logo !== null && !loading ? (
        <Image
          src={loggedUser?.businessDetails?.logo || ""}
          alt="avatar"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      ) : (
        <p className="cursor-pointer text-xl font-bold capitalize text-white">
          {loggedUser?.name ? loggedUser?.name[0] : "C"}
        </p>
      )}
    </Link>
  );
}
