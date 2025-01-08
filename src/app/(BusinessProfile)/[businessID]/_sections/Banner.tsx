import { banner } from "@/assets";
import { StarRating } from "@/components/elements/StarRating";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";

export default function Banner({ image, avatar, name, location, rating, reviews, verified }: any) {
  return (
    <div className="relative md:pb-28">
      <div className="aspect-w-4 aspect-h-1 flex w-full justify-center overflow-hidden rounded-lg bg-zinc-300 max-sm:hidden">
        <Image // 4:1
          src={image || banner}
          alt="banner"
          width={1536}
          height={320}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bottom-0 left-10 flex gap-3 md:absolute md:gap-5">
        {avatar ? (
          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg md:h-36 md:w-36">
            <Image
              src={avatar}
              alt="avatar"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg md:h-36 md:w-36">
            <FaUserTie className="text-5xl text-white" />
          </div>
        )}
        <div className="my-auto">
          <h2 className="mb-2 flex flex-wrap gap-2 text-3xl font-bold md:mt-9 md:text-4xl">
            <span>{name || "Update Your Profile"}</span>
            {verified && <VscVerifiedFilled className="text-green-500" />}
          </h2>
          <p className="flex items-center gap-2 text-zinc-500">
            <IoLocation className="text-lg" /> {location}
          </p>
          <p className="flex items-center gap-2 text-zinc-500">
            <StarRating totalStars={5} rating={rating} className="text-lg text-yellow-500" />(
            {reviews} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}
