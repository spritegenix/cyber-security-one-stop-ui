import Button from "@/components/elements/Button";
import Reviews, { ReviewsCard } from "./Reviews";

export default function ReviewsSection({
  className,
  reviews,
}: {
  className: string;
  reviews: any[];
}) {
  return (
    <div className={`mt-5 space-y-3 ${className}`}>
      <h6 className="text-2xl font-semibold max-md:mb-2">Write Your Review</h6>
      <div className="space-y-3">
        <Reviews />
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewsCard
              key={review?.id || index} // Use unique id if available, fallback to index
              avatar={review?.user?.avatar}
              userName={review?.user?.name || "Anonymous"} // Fallback to "Anonymous" if no name is provided
              rating={review?.rating || 0} // Default to 0 if no rating
              reviewText={review?.comment || "No comments provided"} // Fallback for missing comments
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews available yet.</p>
        )}
      </div>
      {reviews && reviews?.length > 3 && (
        <Button className="w-full max-w-screen-sm">Load More</Button>
      )}
    </div>
  );
}
