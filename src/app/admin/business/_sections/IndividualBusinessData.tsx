import { formatDate } from "@/utils/customText";
import Image from "next/image";
import React from "react";

const IndividualBusinessData: React.FC<{ business?: any }> = ({ business }) => {
  if (!business) {
    return (
      <div className="rounded bg-white p-4 shadow">
        <p className="text-gray-500">Click on a Expert/ Firm Name to see details</p>
      </div>
    );
  }
  console.log("business", business);
  return (
    <div className="mx-auto max-w-6xl p-4">
      {/* Business Header */}
      <div className="flex items-center space-x-4">
        <Image
          src={business.businessDetails?.logo || "/placeholder.png"}
          alt={business.name || "Business Logo"}
          className="size-20 rounded-full"
          width={100}
          height={100}
        />
        <div>
          <h1 className="text-2xl font-bold">{business.name || "N/A"}</h1>
          <p className="text-gray-600">Updated At : {formatDate(business.updatedAt) || "N/A"}</p>
          <p className="text-gray-600">Created At : {formatDate(business.createdAt) || "N/A"}</p>
        </div>
      </div>

      {/* Contact Information */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <ul className="list-inside list-disc">
          {business.primaryContacts?.length > 0 ? (
            business.primaryContacts.map((contact: any) => (
              <li key={contact.id}>
                {contact.type}: {contact.value}{" "}
                {contact.isPrimary && <span className="text-green-500">(Primary)</span>}
              </li>
            ))
          ) : (
            <p>No primary contacts available.</p>
          )}
          {business.additionalContacts?.length > 0 ? (
            business.additionalContacts.map((contact: string, index: number) => (
              <li key={index}>Additional Contact: {contact}</li>
            ))
          ) : (
            <p>No additional contacts available.</p>
          )}
        </ul>
      </section>

      {/* Business Details */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Business Details</h2>
        <p>{business.businessDetails?.description || "No description available."}</p>
        <p>Experience: {business.businessDetails?.experience || 0} years</p>
        <p>Team Size: {business.businessDetails?.teamSize || "N/A"}</p>
        <p>
          Primary Website:{" "}
          {business.businessDetails?.primaryWebsite ? (
            <a
              href={business.businessDetails.primaryWebsite}
              target="_blank"
              className="text-blue-500"
            >
              {business.businessDetails.primaryWebsite}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <div>
          <h3 className="mt-2 font-semibold">Social Links</h3>
          {business.businessDetails?.websites?.length > 0 ? (
            business.businessDetails.websites.map((site: any, idx: number) => (
              <a key={idx} href={site.url} target="_blank" className="block text-blue-500">
                {site.url}
              </a>
            ))
          ) : (
            <p>No websites available.</p>
          )}
        </div>
        {/* <div>
          <h3 className="mt-2 font-semibold">Operating Hours</h3>
          <p>{business.businessDetails?.operatingHours || "Not specified."}</p>
        </div> */}
        <div>
          <h3 className="mt-2 font-semibold">Languages</h3>
          {business?.businessDetails?.languages?.length > 0 ? (
            business.businessDetails.languages.join(", ")
          ) : (
            <p>No languages specified.</p>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {business.businessDetails?.categories?.length > 0 ? (
            business.businessDetails.categories.map((category: any, idx: number) => (
              <div key={idx} className="rounded-lg border border-bg1 p-1 py-0">
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      </section>

      {/* Addresses */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <ul>
          {business.businessDetails?.addresses?.length > 0 ? (
            business.businessDetails.addresses.map((address: any, idx: number) => (
              <li key={idx} className="mt-2">
                <span className="font-semibold">{idx + 1}.</span> {address.street}, {address.city},{" "}
                {address.state}, {address.country} - {address.pincode}
              </li>
            ))
          ) : (
            <p>No addresses available.</p>
          )}
        </ul>
      </section>

      {/* Images */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {business.businessDetails?.coverImages?.length > 0 ? (
            business.businessDetails.coverImages.map((image: any, idx: number) => (
              <Image
                key={idx}
                src={image.url || "/placeholder-image.png"}
                alt={`Cover ${idx}`}
                className="rounded-lg"
                width={300}
                height={200}
              />
            ))
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </section>

      {/* Ad Banners */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Ad Banners</h2>
        <div className="grid grid-cols-2 gap-4">
          {business.businessDetails?.adBannerImages?.length > 0 ? (
            business.businessDetails.adBannerImages.map((banner: any, idx: number) => (
              <Image
                key={idx}
                src={banner.url || "/placeholder-banner.png"}
                alt={`Banner ${idx}`}
                className="rounded-lg"
                width={300}
                height={200}
              />
            ))
          ) : (
            <p>No ad banners available.</p>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <ul className="list-inside list-disc">
          {business.reviews?.length > 0 ? (
            business.reviews.map((review: any) => (
              <li key={review.id}>
                <p>Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </ul>
      </section>

      {/* Feedbacks */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Feedbacks</h2>
        <ul className="list-inside list-disc">
          {business.feedbacks?.length > 0 ? (
            business.feedbacks.map((feedback: any) => (
              <li key={feedback.id}>
                <p>{feedback.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p>No feedbacks available.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default IndividualBusinessData;
