"use client";
import { banner, user } from "@/assets";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import ProfilePicture from "../../_sections/ProfilePicture";
import "react-international-phone/style.css";
import { RatingInput } from "@/components/elements/StarRating";
import Link from "next/link";
import { PiNotePencilBold } from "react-icons/pi";
import { useUpdateUserDetails, useUserMe } from "@/app/_queryCall/userAuth/csr";
import { ProfileForm } from "../../_sections/ProfileForm";
import { useEffect } from "react";

export default function UserProfile() {
  const { userData, loading, error, refetch } = useUserMe();

  useEffect(() => {
    console.log("User data:", userData);
  }, [userData]);
  const {
    updateUserDetails: handleUpdateLogo,
    queryResponse: mutationLogoResult,
    loading: logoLoading,
    error: logoError,
  } = useUpdateUserDetails();
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Wrapper
        containerClassName="pb-10"
        className="grid grid-cols-1 gap-10 md:grid-cols-2"
        isTop={true}
      >
        <div className="relative max-w-screen-sm rounded-lg border-2 border-bg1 p-1">
          {/* Form  */}
          <div className="relative rounded-md bg-white">
            <Image
              src={banner}
              alt="banner"
              width={640}
              height={320}
              className="h-44 w-full rounded-t-md object-cover"
            />
            <div className="absolute left-1/2 top-[7rem] -translate-x-1/2">
              <ProfilePicture
                defaultImage={userData?.avatar}
                mutation={handleUpdateLogo}
                mutationData={mutationLogoResult?.updateUserDetails?.avatar}
                loading={logoLoading}
                error={logoError}
              />
            </div>
            <div className="mt-32 px-2">
              <ProfileForm defaultValues={userData} />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="relative space-y-2 rounded-lg">
            {/* Rating and Reviews  */}
            <h2 className="text-2xl font-semibold">Your Rating and Reviews</h2>
            {userData?.reviews.length > 0 ? (
              <div className="relative max-h-[34.5rem] space-y-3 rounded-md border-2 border-bg1 p-1 md:overflow-y-auto">
                {userData?.reviews.map((item: any, index: number) => (
                  <ReviewsCard
                    key={item?.id || index}
                    avatar={item?.business?.logo}
                    userName={item?.business?.name || "Anonymous"}
                    rating={item?.rating || 0}
                    reviewText={item?.comment || "No Review"}
                    slug={item?.business?.slug}
                  />
                ))}
              </div>
            ) : (
              <p>No Reviews</p>
            )}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
}

function ReviewsCard({
  avatar,
  userName,
  rating,
  reviewText,
  slug,
}: {
  avatar: any;
  userName: string;
  rating: number;
  reviewText: string;
  slug: string;
}) {
  return (
    <div className="group relative max-w-screen-sm rounded-lg border border-gray-300 bg-white p-2 transition-all duration-300 hover:border-bg1">
      <div className="flex items-center gap-3">
        {avatar ? (
          <div className="size-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <Image
              src={avatar}
              alt="avatar"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg group-hover:bg-bg1">
            <p className="caption-bottom text-5xl capitalize text-white">{userName[0]}</p>
          </div>
        )}
        <div className="space-y-2">
          <Link href={slug ? `/${slug}` : "#"} className="text-lg font-medium hover:text-bg1">
            {userName}
          </Link>
          <RatingInput totalStars={5} initialRating={rating} className="text-2xl" disabled />
        </div>
      </div>
      <p className="mt-3">{reviewText}</p>
      {/* Edit Button */}
      <Link
        href={slug ? `/${slug}` : "#"}
        type="button"
        className="absolute right-1 top-1 flex size-8 items-center justify-center rounded-full p-1 text-2xl text-bg1 transition-all duration-300 hover:bg-bg1 hover:text-white"
      >
        <PiNotePencilBold />
      </Link>
    </div>
  );
}
