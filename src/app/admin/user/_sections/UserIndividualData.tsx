import React from "react";

interface Contact {
  id: string;
  type: string;
  value: string;
  isVerified: boolean;
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  business: {
    name: string;
  };
}

interface Feedback {
  id: string;
  rating: number;
  comment: string;
}

interface User {
  id: string;
  name?: string;
  contacts?: Contact[];
  addresses?: Address[];
  reviews?: Review[];
  feedbacks?: Feedback[];
  hideDetails?: boolean;
  isBlocked?: boolean;
  paymentVerification?: boolean;
  subscriptionId?: string;
}

export default function UserIndividualData({ user }: { user: User }) {
  return (
    <div className="mx-auto max-w-5xl rounded-lg bg-gray-100 p-6 shadow-lg">
      {/* Header Section */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg1 text-2xl font-bold text-white">
          {user?.name?.[0] || "C"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user?.name || "Unknown User"}</h1>
          <p className="text-gray-600">ID: {user?.id || "N/A"}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
        {user?.contacts?.length ? (
          <ul className="mt-2 list-disc pl-5 text-gray-700">
            {user.contacts.map((contact) => (
              <li key={contact?.id}>
                <strong>{contact?.type}:</strong> {contact?.value}{" "}
                {contact?.isVerified && (
                  <span className="font-semibold text-green-500">{`(Verified)`}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No contact information available.</p>
        )}
      </div>

      {/* Address Section */}
      {user?.addresses?.length ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Address</h2>
          {user.addresses.map((address) => (
            <div key={address?.id} className="mt-2 text-gray-700">
              <p>{address?.street || "Street not specified"}</p>
              <p>
                {address?.city || "City not specified"}, {address?.state || "State not specified"},{" "}
                {address?.country || "Country not specified"} -{" "}
                {address?.pincode || "Pincode not specified"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No addresses available.</p>
      )}

      {/* Feedback Section */}
      {user?.feedbacks?.length ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Feedbacks</h2>
          <ul className="mt-2 list-none">
            {user.feedbacks.map((feedback) => (
              <li
                key={feedback?.id}
                className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <p className="text-gray-600">Rating: {feedback?.rating || 0} ⭐</p>
                <p className="mt-1 text-gray-700">{feedback?.comment || "No feedback provided."}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-700">No feedbacks available.</p>
      )}

      {/* Reviews Section */}
      {user?.reviews?.length ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Reviews</h2>
          <ul className="mt-2 list-none">
            {user.reviews.map((review) => (
              <li
                key={review?.id}
                className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {review?.business?.name || "Unknown Business"}
                </h3>
                <p className="text-gray-600">Rating: {review?.rating || 0} ⭐</p>
                <p className="mt-1 text-gray-700">{review?.comment || "No comment provided."}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-700">No reviews available.</p>
      )}

      {/* Additional Info */}
      <div className="text-gray-700">
        <h2 className="mb-2 text-xl font-semibold">Additional Info</h2>
        <p>
          <strong>Hide Details:</strong> {user?.hideDetails ? "Yes" : "No"}
        </p>
        <p>
          <strong>Blocked:</strong> {user?.isBlocked ? "Yes" : "No"}
        </p>
        <p>
          <strong>Payment Verified:</strong> {user?.paymentVerification ? "Yes" : "No"}
        </p>
        <p>
          <strong>Subscription:</strong> {user?.subscriptionId || "None"}
        </p>
      </div>
    </div>
  );
}
