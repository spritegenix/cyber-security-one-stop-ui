import Button from "@/components/elements/Button";
import Reviews from "./Reviews";
import { ReviewsCard } from "./ReviewsCard";

export default function ReviewsSection({
  className,
  reviews,
  businessSlug,
}: {
  className: string;
  reviews: any[];
  businessSlug: string;
}) {
  return (
    <div className={`mt-5 space-y-3 ${className}`}>
      <h6 className="text-2xl font-semibold max-md:mb-2">Write Your Review</h6>
      <div className="space-y-3">
        <Reviews businessSlug={businessSlug} />
        {reviews && reviews.length > 0 ? (
          reviews?.map((review, index) => (
            <ReviewsCard
              key={review?.id || index}
              avatar={review?.user?.avatar}
              userName={review?.user?.name || "Anonymous"}
              rating={review?.rating || 0}
              reviewText={review?.comment || "No comments provided"}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews available yet.</p>
        )}
      </div>
      {/* {reviews && reviews?.length > 3 && (
        <Button className="w-full max-w-screen-sm">Load More</Button>
      )} */}
    </div>
  );
}
