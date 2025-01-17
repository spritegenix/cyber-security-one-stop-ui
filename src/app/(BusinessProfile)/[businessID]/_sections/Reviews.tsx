"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RatingInput } from "@/components/elements/StarRating";
import { TextareaAutoGrowing } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { useRouter } from "next/navigation";
// import { loggedUser } from "@/data/global";
import Image from "next/image";
import { PiNotePencilBold } from "react-icons/pi";
import useAuthStore from "@/zustandStore/authStore";
import {
  useGetReviewWithId,
  useReviewBusinessMutation,
} from "@/app/_queryCall/businessProfile/csr";

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

export default function Reviews({ businessSlug }: any) {
  const isLogin = useAuthStore((state) => state?.userToken);

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
    data: loggedUserReview,
    loading: loggedUserReviewLoading,
    error: loggedUserReviewError,
    fetchReview,
    refetch: loggedUserReviewRefetch,
  } = useGetReviewWithId({
    businessSlug,
  });

  useEffect(() => {
    if (loggedUserReview) {
      console.log(loggedUserReview, "loggedUserReview");
      reset({
        ...loggedUserReview,
        id: loggedUserReview?.id,
        rating: loggedUserReview?.rating,
        reviewText: loggedUserReview?.comment || "",
      });
    }
  }, [loggedUserReview, reset]);

  useEffect(() => {
    fetchReview();
  }, []);

  const { reviewBusiness, data, loading, error } = useReviewBusinessMutation();
  const onSubmit = async (data: ReviewFormData) => {
    if (!isLogin) {
      router.push("/login");
      return;
    }

    const newReviewData = {
      reviewBusinessId: data?.id || undefined,
      businessSlug: businessSlug,
      rating: data?.rating || undefined,
      comment: data?.reviewText || undefined,
      toDelete: false,
    };

    console.log("Submitted Data:", newReviewData);
    await reviewBusiness(newReviewData);
    if (!error) {
      await loggedUserReviewRefetch();
      setIsEditing(false);
    }
  };

  const handleRating = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  if (!isLogin) {
    return (
      <div className="max-w-screen-sm space-y-5">
        <p className="text-xl">You must log in to provide a review.</p>
        <Button onClick={() => router.push("/login")} className="w-full">
          Login
        </Button>
      </div>
    );
  }

  if (loggedUserReview?.comment && !isEditing) {
    return (
      <div className="relative max-w-screen-sm rounded-lg border border-gray-300 bg-white p-2">
        <div className="flex items-center gap-3">
          {loggedUserReview?.user?.avatar ? (
            <div className="size-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <Image
                src={loggedUserReview?.user?.avatar}
                alt="avatar"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg">
              <p className="caption-bottom text-5xl capitalize text-white">
                {loggedUserReview?.user?.name[0]}
              </p>
            </div>
          )}
          <div className="space-y-2">
            <h6 className="text-lg font-medium">You</h6>
            <RatingInput
              totalStars={5}
              initialRating={loggedUserReview.rating}
              className="text-2xl"
              disabled
            />
          </div>
        </div>
        <p className="mt-3">{loggedUserReview?.comment}</p>
        {/* Edit Button */}
        <button
          type="button"
          onClick={() => {
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
        <RatingInput
          totalStars={5}
          initialRating={rating}
          onRate={handleRating}
          className="text-2xl"
        />
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
      {error && <p className="text-sm text-red-500">{error?.message}</p>}
      {data && <p className="text-sm text-green-500">{data?.message}</p>}
    </form>
  );
}
