"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RatingInput } from "@/components/elements/StarRating";
import { TextareaAutoGrowing } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
// import { loggedUser } from "@/data/global";
import Image from "next/image";
import { PiNotePencilBold } from "react-icons/pi";
import { useFeedbackMutation, useGetUserFirmFeedback } from "@/app/_queryCall/globalFeedback/csr";
import useAuthStore from "@/zustandStore/authStore";

// Define Zod schema
const reviewSchema = z.object({
  id: z.string().optional(),
  rating: z.number().min(1, "Rating is required").max(5, "Invalid rating"),
  reviewText: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(500, "Review must be at most 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function Reviews({ userType }: any) {
  const isLogin = useAuthStore((state) =>
    userType === "firm" ? state?.firmToken : state?.userToken,
  );
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });
  const rating = watch("rating") || 0;
  const {
    feedbackData,
    loading: feedbackLoading,
    error: feedbackError,
    refetch: feedbackRefetch,
  } = useGetUserFirmFeedback({ userType });
  useEffect(() => {
    if (feedbackData) {
      // console.log(feedbackData, "feedbackData");
      reset({
        ...feedbackData,
        id: feedbackData?.feedbacks[0]?.id,
        rating: feedbackData?.feedbacks[0]?.rating,
        reviewText: feedbackData?.feedbacks[0]?.comment,
      });
    }
  }, [feedbackData, reset]);
  const { submitFeedback, data, loading, error } = useFeedbackMutation({ userType });

  const onSubmit = async (data: ReviewFormData) => {
    if (!isLogin) {
      router.push(userType === "firm" ? "/listing-login" : "/login");
      return;
    }

    const newFeedbackData = {
      feedbackId: data?.id || undefined,
      rating: data?.rating || undefined,
      comment: data?.reviewText || undefined,
      toDelete: false,
    };

    console.log("Submitted Data:", data);
    await submitFeedback(newFeedbackData);
    await feedbackRefetch();
    setIsEditing(false);
  };

  const handleRating = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  // Show Login Button if user is not logged in
  if (!isLogin) {
    return (
      <div className="max-w-screen-sm space-y-5">
        <p className="text-xl">You must log in to provide a review.</p>
        <Button
          onClick={() => router.push(userType === "firm" ? "/listing-login" : "/login")}
          className="w-full"
        >
          Login
        </Button>
      </div>
    );
  }

  // Show review if Already Given
  if (feedbackData?.feedbacks?.length > 0 && !isEditing) {
    return (
      <div className="relative max-w-screen-sm rounded-lg border border-gray-300 bg-white p-2">
        <div className="flex items-center gap-3">
          {(userType === "user" ? feedbackData?.avatar : feedbackData?.businessDetails?.logo) ? (
            <div className="size-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <Image
                src={
                  userType === "user" ? feedbackData?.avatar : feedbackData?.businessDetails?.logo
                }
                alt="avatar"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg">
              <p className="caption-bottom text-5xl capitalize text-white">
                {userType === "user" ? feedbackData?.name?.[0] : feedbackData?.name?.[0]}
              </p>
            </div>
          )}
          <div className="space-y-2">
            <h6 className="text-lg font-medium">You</h6>
            <RatingInput
              totalStars={5}
              initialRating={feedbackData?.feedbacks[0]?.rating || 0}
              className="text-2xl"
              disabled
            />
          </div>
        </div>
        <p className="mt-3">{feedbackData?.feedbacks[0]?.comment || ""}</p>
        {/* Edit Button */}
        <button
          type="button"
          onClick={() => {
            reset(feedbackData.review);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center space-y-5">
      <div>
        <RatingInput
          totalStars={5}
          initialRating={rating}
          onRate={handleRating}
          className="text-2xl"
        />
        {errors.rating && <p className="text-sm text-red-500">{errors.rating.message}</p>}
      </div>
      <div className="w-full">
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
      {error && <p className="text-sm text-red-500">{error?.message}</p>}
      {data && <p className="text-sm text-green-500">{data?.message}</p>}
    </form>
  );
}

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
          <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg md:h-36 md:w-36">
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
