import { RatingInput } from "@/components/elements/StarRating";
import Image from "next/image";

export function ReviewsCard({
  avatar,
  userName,
  rating,
  reviewText,
}: {
  avatar: any;
  userName: string;
  rating: number;
  reviewText: string;
}) {
  return (
    <div className="relative max-w-screen-sm rounded-lg border border-gray-300 bg-white p-2">
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
          <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg">
            <p className="caption-bottom text-5xl text-white">{userName[0]}</p>
          </div>
        )}
        <div className="space-y-2">
          <h6 className="text-lg font-medium">{userName}</h6>
          <RatingInput totalStars={5} initialRating={rating} className="text-2xl" disabled />
        </div>
      </div>
      <p className="mt-3">{reviewText}</p>
    </div>
  );
}
