// src/hooks/useAuthRedirect.ts
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useAuthStore from "@/zustandStore/authStore";
import { useHeaderUser as firmData } from "../_queryCall/businessAuth/csr";
import { useHeaderUser as userData } from "@/app/_queryCall/userAuth/csr";

export function useAuthRedirect() {
  const { userToken, firmToken, adminToken, tokenType } = useAuthStore.getState();
  const token = tokenType === "user" ? userToken : tokenType === "firm" ? firmToken : adminToken;

  // Fetch user or firm data
  const { userData: UserData, loading: userLoading } = userData();
  const { userData: FirmData, loading: firmLoading } = firmData();

  // State to track loading for redirection logic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && UserData?.slug) {
      redirect(`/user-profile/${UserData.slug}`);
    } else if (token && FirmData?.slug) {
      redirect(`/listing-profile/${FirmData.slug}`);
    }

    // Set loading to false when data is fetched
    setLoading(false);
  }, [userLoading, firmLoading, token, UserData, FirmData]);

  return { loading };
}
