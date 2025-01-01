"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RatingInput } from "@/components/elements/StarRating";
import { TextareaAutoGrowing } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
import { loggedUser } from "@/data/global";
import Image from "next/image";
import { PiNotePencilBold } from "react-icons/pi";

// Define Zod schema
const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5, "Invalid rating"),
  reviewText: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(500, "Review must be at most 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function Reviews() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: loggedUser.review?.rating || 0,
      reviewText: loggedUser.review?.reviewText || "",
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    if (!loggedUser.jwt) {
      router.push("/login");
      return;
    }

    console.log("Submitted Data:", data);
    // Handle submission logic here
    setIsEditing(false);
  };

  const handleRating = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  if (!loggedUser.jwt && loggedUser.review) {
    return (
      <div className="max-w-screen-sm space-y-5">
        <p className="text-xl">You must log in to provide a review.</p>
        <Button onClick={() => router.push("/login")} className="w-full">
          Login
        </Button>
      </div>
    );
  }

  if (loggedUser.review && !isEditing) {
    return (
      <div className="relative max-w-screen-sm rounded-lg border border-gray-300 bg-white p-2">
        <div className="flex items-center gap-3">
          {loggedUser.avatar ? (
            <div className="size-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <Image
                src={loggedUser.avatar}
                alt="avatar"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg md:h-36 md:w-36">
              <p className="caption-bottom text-5xl text-white">{loggedUser.name[0]}</p>
            </div>
          )}
          <div className="space-y-2">
            <h6 className="text-lg font-medium">You</h6>
            <RatingInput
              totalStars={5}
              initialRating={loggedUser.review.rating}
              className="text-2xl"
              disabled
            />
          </div>
        </div>
        <p className="mt-3">{loggedUser.review.reviewText}</p>
        {/* Edit Button */}
        <button
          type="button"
          onClick={() => {
            reset(loggedUser.review);
            setIsEditing(true);
          }}
          className="absolute right-1 top-1 flex size-8 items-center justify-center rounded-full p-1 text-2xl text-bg1 transition-all duration-300 hover:bg-bg1 hover:text-white"
        >
          <PiNotePencilBold />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-screen-sm space-y-5">
      <div>
        <RatingInput totalStars={5} initialRating={loggedUser.review?.rating || 0} onRate={handleRating} className="text-2xl" />
        {errors.rating && <p className="text-sm text-red-500">{errors.rating.message}</p>}
      </div>

      <div>
        <TextareaAutoGrowing
          label="Write your review here"
          rows={5}
          {...register("reviewText")}
          placeholder=" "
        />
        {errors.reviewText && <p className="text-sm text-red-500">{errors.reviewText.message}</p>}
      </div>

      <div className="flex gap-3">
        <Button className="w-full" type="submit">
          {isEditing ? "Update" : "Submit"}
        </Button>
        {isEditing && (
          <Button
            variant="white"
            className="w-full"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function ReviewsCard({avatar, userName, rating, reviewText}: {avatar: any, userName: string, rating: number, reviewText: string}) {
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
        <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg md:h-36 md:w-36">
          <p className="caption-bottom text-5xl text-white">{userName[0]}</p>
        </div>
      )}
      <div className="space-y-2">
        <h6 className="text-lg font-medium">{userName}</h6>
        <RatingInput
          totalStars={5}
          initialRating={rating}
          className="text-2xl"
          disabled
        />
      </div>
    </div>
    <p className="mt-3">{reviewText}</p>
  </div>
  );
}
