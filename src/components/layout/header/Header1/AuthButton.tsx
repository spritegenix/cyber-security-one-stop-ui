import Button from "@/components/elements/Button";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useHeaderUser } from "@/app/_queryCall/userAuth/csr";
import useAuthStore from "@/zustandStore/authStore";

export default function AuthButton({ handleSidebar }: any) {
  const isLogin = useAuthStore((state) => state?.userToken);
  return (
    <>
      {!isLogin ? (
        <Button as={Link} href="/login" prefetch={true} variant="orange-gradient">
          Log In / Sign Up
        </Button>
      ) : (
        <LoggedUser handleSidebar={handleSidebar} />
      )}
    </>
  );
}

function LoggedUser({ handleSidebar }: any) {
  const { userData: loggedUser, loading, error, refetch } = useHeaderUser();
  return (
    <div
      className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-bg1 shadow-lg"
      onClick={handleSidebar}
    >
      {loggedUser?.avatar !== null && !loading ? (
        <Image
          src={loggedUser?.avatar || ""}
          alt="avatar"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      ) : (
        <p className="cursor-pointer text-xl font-bold capitalize text-white">
          {loggedUser?.name && loggedUser?.name > 0 ? loggedUser?.name[0] : "C"}
        </p>
      )}
    </div>
  );
}
