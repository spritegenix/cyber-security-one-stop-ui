"use client";
import { useHeaderUser } from "@/app/_queryCall/businessAuth/csr";
import Logo from "@/components/elements/Logo";
import useAuthStore from "@/zustandStore/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TbFileBroken } from "react-icons/tb";

export default function ListingProfile() {
  const router = useRouter();
  const token = useAuthStore((state) => state?.firmToken);
  const { userData: loggedUser } = useHeaderUser();

  useEffect(() => {
    router.push(loggedUser?.slug ? `/listing-profile/${loggedUser?.slug}` : "user");
  }, [token, loggedUser]);

  return null;
}
