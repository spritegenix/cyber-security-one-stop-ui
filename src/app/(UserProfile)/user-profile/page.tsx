// // "use client";
// // import React, { useEffect } from "react";
// // import useAuthStore from "@/zustandStore/authStore";
// // import { redirect } from "next/navigation";
// // import { useHeaderUser } from "@/app/_queryCall/userAuth/csr";

// export default function ProfilePage() {
//   // const { userToken, firmToken, adminToken, tokenType } = useAuthStore.getState();

//   // Determine token based on tokenType
//   // const token = tokenType === "user" ? userToken : tokenType === "firm" ? firmToken : adminToken;

//   // Fetch user or firm data
//   // const { userData, loading } = useHeaderUser();

//   // useEffect(() => {
//   //   // If no token or user data is loading, skip redirection
//   //   if (loading || !token || !userData?.slug) return;

//   //   // Redirect based on user data
//   //   redirect(`/user-profile/${userData.slug}`);
//   // }, [token, userData, loading]);

//   // Render loading state if data is still loading
//   // if (loading) {
//   //   return (
//   //     <div className="flex h-screen items-center justify-center bg-bg1">
//   //       <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-white"></div>
//   //     </div>
//   //   );
//   // }

//   return null;
// }

export default function page() {
  return null;
}
