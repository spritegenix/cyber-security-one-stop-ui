import {
  useAdminManageBusinessAdBannerImage,
  useAdminManageBusinessMobileAdBannerImage,
} from "@/app/_queryCall/adminAuth/adBanner";
import { useAdminDeleteReviews } from "@/app/_queryCall/adminAuth/business";
import { useAdminManageTestimonials } from "@/app/_queryCall/adminAuth/reviews";
import Button from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import Modal from "@/components/elements/Modal";
import Tooltip from "@/components/elements/Tooltip";
import { formatDate } from "@/utils/customText";
import Image from "next/image";
import React, { useState } from "react";
import { MdDeleteForever, MdOutlinePostAdd } from "react-icons/md";

const IndividualBusinessData: React.FC<{ business?: any; refetchData: () => void }> = ({
  business,
  refetchData,
}) => {
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  // --------------Managing Testimonials-------------------------------------
  const {
    adminManageTestimonials,
    data: adminManageTestimonialsData,
    loading: adminManageTestimonialsLoading,
    error: adminManageTestimonialsError,
  } = useAdminManageTestimonials();
  async function handleAddFeedbackToWeb(id: string) {
    await adminManageTestimonials([{ feedbackId: id }]);
    refetchData();
  }
  // -------------------------------------------------------

  // --------------Managing Reviews---------------------------------------------
  const {
    deleteReviews,
    data: deleteReviewsData,
    loading: deleteReviewsLoading,
    error: deleteReviewsError,
  } = useAdminDeleteReviews();
  async function handleDeleteReview(id: string) {
    setDeleteModal({ isOpen: true, id: id });
  }
  const confirmDeleteReview = async () => {
    if (deleteModal.id && deleteConfirmation === "DELETE REVIEW") {
      await deleteReviews([{ reviewId: deleteModal.id, toDelete: true }]);
      handleClear();
    }
  };
  const handleClear = () => {
    setDeleteModal({ isOpen: false, id: null });
    setDeleteConfirmation("");
    refetchData();
  };
  // -----------------------------------------------------
  // --------------------- Managing Ad Banners -----------
  const {
    manageBusinessAdBannerImage,
    data: manageBusinessAdBannerImageData,
    loading: manageBusinessAdBannerImageLoading,
    error: manageBusinessAdBannerImageError,
  } = useAdminManageBusinessAdBannerImage();

  const {
    manageBusinessMobileAdBannerImage,
    data: manageBusinessMobileAdBannerImageData,
    loading: manageBusinessMobileAdBannerImageLoading,
    error: manageBusinessMobileAdBannerImageError,
  } = useAdminManageBusinessMobileAdBannerImage();
  async function handleDesktopAdBannerToWeb(id: string) {
    await manageBusinessAdBannerImage([{ id: id }]);
  }
  async function handleMobileAdBannerToWeb(id: string) {
    await manageBusinessMobileAdBannerImage([{ id: id }]);
  }
  // -----------------------------------------------------

  if (!business) {
    return (
      <div className="rounded bg-white p-4 shadow">
        <p className="text-gray-500">Click on a Expert/ Firm Name to see details</p>
      </div>
    );
  }

  console.log("business", business);
  return (
    <>
      <div className="mx-auto max-w-6xl p-4">
        {/* Business Header */}
        <div className="flex items-center space-x-4">
          <Image
            src={business?.businessDetails?.logo || "/placeholder.png"}
            alt={business?.name || "Business Logo"}
            className="size-20 rounded-full"
            width={100}
            height={100}
          />
          <div>
            <h1 className="text-2xl font-bold">{business?.name || "N/A"}</h1>
            <p className="text-gray-600">Updated At : {formatDate(business?.updatedAt) || "N/A"}</p>
            <p className="text-gray-600">Created At : {formatDate(business?.createdAt) || "N/A"}</p>
          </div>
        </div>
        {/* Subscription Details */}
        <div className="mt-5 flex items-center gap-2">
          <h2 className="text-xl font-semibold">Subscription:</h2>
          <p className="rounded-lg border-2 border-green-500 bg-green-100 px-2 uppercase text-green-500">
            {business?.subscription?.name || "FREE"}
          </p>
          <p>
            {" "}
            Expire Date: {new Date(business?.subscriptionExpire).toLocaleDateString() || "N/A"}
          </p>
        </div>
        {/* Contact Information */}
        <section className="mt-2">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <ul className="list-inside list-disc">
            {business?.primaryContacts?.length > 0 ? (
              business?.primaryContacts.map((contact: any) => (
                <li key={contact?.id}>
                  {contact?.type}: {contact.value}{" "}
                  {contact?.isPrimary && <span className="text-green-500">(Primary)</span>}{" "}
                  {contact?.isVerified && <span className="text-green-500">(Verified)</span>}
                </li>
              ))
            ) : (
              <p>No primary contacts available.</p>
            )}
            {business?.additionalContacts?.length > 0 ? (
              business?.additionalContacts.map((contact: string, index: number) => (
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
          <p>{business?.businessDetails?.description || "No description available."}</p>
          <p>
            <strong>Experience:</strong> {business.businessDetails?.experience || 0} years
          </p>
          <p>
            <strong>Registration Number:</strong>{" "}
            {business?.businessDetails?.registrationNumber || "N/A"}
          </p>
          <p>
            <strong>License Number:</strong> {business?.businessDetails?.license || "N/A"}
          </p>
          <p>
            <strong>Team Size:</strong> {business?.businessDetails?.teamSize || "N/A"}
          </p>
          <p>
            <strong>Primary Website:</strong>{" "}
            {business?.businessDetails?.primaryWebsite ? (
              <a
                href={business?.businessDetails?.primaryWebsite}
                target="_blank"
                className="text-blue-500"
              >
                {business?.businessDetails?.primaryWebsite}
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <div>
            <h3 className="mt-2 font-semibold">Social Links</h3>
            {business?.businessDetails?.websites?.length > 0 ? (
              business.businessDetails.websites.map((site: any, idx: number) => (
                <a key={idx} href={site.url} target="_blank" className="block text-blue-500">
                  {site.url}
                </a>
              ))
            ) : (
              <p>No websites available.</p>
            )}
          </div>
          <p className="mt-2 capitalize">
            <strong>Languages: </strong>
            {business?.businessDetails?.languages?.length > 0 ? (
              business?.businessDetails.languages?.map((lang: any) => lang.name).join(", ")
            ) : (
              <p>No languages specified.</p>
            )}
          </p>
          <p className="mt-2">
            <strong>Degrees: </strong>
            {business?.businessDetails?.degrees && business.businessDetails?.degrees.length > 0
              ? business?.businessDetails.degrees.join(", ")
              : "N/A"}
          </p>
        </section>

        {/* Timing  */}
        <section>
          <h2 className="my-2 font-semibold">Consultation Timing</h2>
          <ConsultationTiming
            timeSlots={transformOperatingHours(business?.businessDetails?.operatingHours || [])}
          />
        </section>
        {/* Categories */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {business.businessDetails?.categories?.length > 0 ? (
              business?.businessDetails.categories.map((category: any, idx: number) => (
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
            {business?.businessDetails?.addresses?.length > 0 ? (
              business?.businessDetails.addresses.map((address: any, idx: number) => (
                <li key={idx} className="mt-2">
                  <span className="font-semibold">{idx + 1}.</span> {address.street}, {address.city}
                  , {address.state}, {address.country} - {address.pincode}
                </li>
              ))
            ) : (
              <p>No addresses available.</p>
            )}
          </ul>
        </section>
        {/* Document For Verification  */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Documents For Verification</h2>
          <ul className="space-y-2">
            {business?.businessSupportingDocuments?.length > 0 ? (
              business?.businessSupportingDocuments.map((document: any, idx: number) => (
                <li key={document?.id}>
                  <a href={document?.url} className="text-blue-500 hover:underline" target="_blank">
                    {document?.type}
                  </a>
                  <p className="text-gray-500">{new Date(document.updatedAt).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p>No documents available.</p>
            )}
          </ul>
        </section>
        {/* Images */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {business?.businessDetails?.coverImages?.length > 0 ? (
              business?.businessDetails.coverImages.map((image: any, idx: number) => (
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
          <div className="grid grid-cols-1 gap-4">
            {business?.businessDetails?.adBannerImages?.length > 0 ? (
              business?.businessDetails.adBannerImages.map((banner: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -right-2 -top-2 w-min">
                    {banner?.adminBusinessAdBannerImage?.id !== banner?.id && (
                      <Tooltip content="Add to Web" direction="top">
                        <MdOutlinePostAdd
                          className="cursor-pointer text-2xl text-blue-500 duration-300 hover:scale-105"
                          onClick={() => handleDesktopAdBannerToWeb(banner?.id)}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <Image
                    src={banner?.url || "/placeholder-banner.png"}
                    alt={`Banner ${idx}`}
                    className="rounded-lg"
                    width={800}
                    height={500}
                  />
                  {banner?.adminBusinessAdBannerImage?.id === banner?.id && (
                    <p className="font-semibold text-green-500">Already Added by Admin</p>
                  )}
                  {manageBusinessAdBannerImageData && (
                    <p className="text-sm text-green-500">
                      {manageBusinessAdBannerImageData?.[idx]?.message}
                    </p>
                  )}
                  {manageBusinessAdBannerImageError && (
                    <p className="text-sm text-red-500">
                      {manageBusinessAdBannerImageError?.message}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No ad banners available.</p>
            )}
          </div>
        </section>
        {/* Mobile Ad Banners */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Mobile Ad Banners</h2>
          <div className="grid grid-cols-2 gap-4">
            {business?.businessDetails?.mobileAdBannerImages?.length > 0 ? (
              business?.businessDetails.mobileAdBannerImages.map((banner: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -right-2 -top-2 w-min">
                    {banner?.adminBusinessMobileAdBannerImage?.id !== banner?.id && (
                      <Tooltip content="Add to Web" direction="top">
                        <MdOutlinePostAdd
                          className="cursor-pointer text-2xl text-blue-500 duration-300 hover:scale-105"
                          onClick={() => handleMobileAdBannerToWeb(banner?.id)}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <Image
                    src={banner?.url || "/placeholder-banner.png"}
                    alt={`Banner ${idx}`}
                    className="rounded-lg"
                    width={500}
                    height={800}
                  />
                  {banner?.adminBusinessMobileAdBannerImage?.id === banner?.id && (
                    <p className="font-semibold text-green-500">Already Added by Admin</p>
                  )}
                  {manageBusinessMobileAdBannerImageData && (
                    <p className="text-sm text-green-500">
                      {manageBusinessMobileAdBannerImageData?.[idx]?.message}
                    </p>
                  )}
                  {manageBusinessMobileAdBannerImageError && (
                    <p className="text-sm text-red-500">
                      {manageBusinessMobileAdBannerImageError?.message}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No Mobile ad banners available.</p>
            )}
          </div>
        </section>

        {/* Feedbacks */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Feedbacks</h2>
          <ul className="space-y-2">
            {business?.feedbacks?.length > 0 ? (
              business?.feedbacks.map((feedback: any) => (
                <li key={feedback?.id} className="relative rounded-lg border border-bg1 p-2">
                  {!business?.testimonials.some((t: any) => t?.feedbackId === feedback?.id) && (
                    <Tooltip content="Add to Web" direction="top" className="float-end">
                      <MdOutlinePostAdd
                        className="cursor-pointer text-2xl text-blue-500 duration-300 hover:scale-105"
                        onClick={() => handleAddFeedbackToWeb(feedback?.id)}
                      />
                    </Tooltip>
                  )}
                  <p>Rating: {feedback?.rating}/5</p>
                  <p>{feedback?.comment}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(feedback?.createdAt).toLocaleDateString()}
                  </p>
                  {business?.testimonials.some((t: any) => t?.feedbackId === feedback?.id) && (
                    <p className="text-sm font-semibold text-green-500">
                      Already selected by Admin for UI
                    </p>
                  )}
                </li>
              ))
            ) : (
              <p>No feedbacks available.</p>
            )}
          </ul>
          {adminManageTestimonialsData && (
            <p className="text-sm text-green-500">{adminManageTestimonialsData?.[0]?.message}</p>
          )}
          {adminManageTestimonialsError && (
            <p className="text-sm text-red-500">{adminManageTestimonialsError?.message}</p>
          )}
        </section>

        {/* Reviews */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <p className="text-gray-500">
            Total Reviews: {business?.reviewCount} | Average Rating: (
            {business?.averageRating?.toFixed(1) || 0}/5)
          </p>
          <ul className="space-y-2">
            {" "}
            {business.reviews?.length > 0 ? (
              business.reviews.map((review: any) => (
                <li key={review?.id} className="relative rounded-lg border border-bg1 p-2">
                  <MdDeleteForever
                    className="absolute right-2 top-2 cursor-pointer text-2xl text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteReview(review?.id)}
                  />
                  <p className="font-semibold"> {review?.user?.name}</p>
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
          {deleteReviewsData && (
            <p className="text-center text-sm text-green-500">{deleteReviewsData?.[0]?.message}</p>
          )}
          {deleteReviewsError && (
            <p className="text-center text-sm text-red-500">{deleteReviewsError?.message}</p>
          )}
        </section>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <Modal onClose={() => setDeleteModal({ isOpen: false, id: null })}>
          <div className="rounded-lg border border-bg1 bg-white p-4">
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p className="text-sm text-gray-600">
              Type <strong>DELETE REVIEW</strong> to confirm deletion.
            </p>
            <Input
              type="text"
              label="Type Your Response"
              value={deleteConfirmation}
              onChange={(e: any) => setDeleteConfirmation(e.target.value)}
              placeholder=" "
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={() => setDeleteModal({ isOpen: false, id: null })}
                className="bg-gray-500"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteReview}
                disabled={deleteConfirmation !== "DELETE"}
                className="bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
            <p className="text-xs text-red-500">
              <strong>Note: </strong>You have to connect to Developer Team to recover it after
              delete.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IndividualBusinessData;

const transformOperatingHours = (operatingHours: any[]) => {
  const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  // Initialize all days as holidays
  const timeSlots: Record<string, any> = daysOfWeek.reduce((acc: any, day) => {
    acc[day] = { checked: false, start: null, end: null };
    return acc;
  }, {});

  // Map operating hours to respective days
  operatingHours.length > 0 &&
    operatingHours?.forEach((slot) => {
      const { dayOfWeek, openingTime, closingTime } = slot;
      timeSlots[dayOfWeek] = {
        checked: true,
        start: openingTime,
        end: closingTime,
      };
    });

  return timeSlots;
};

const ConsultationTiming = ({ timeSlots }: any) => {
  const formatTime = (time: string) => {
    if (!time) return "-- : --";
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <>
      <div className="grid w-max grid-cols-5 items-center gap-2">
        {Object.entries(timeSlots).map(([day, slot]: any) => (
          <React.Fragment key={day}>
            <p
              className={`border-input relative col-span-1 flex size-9 cursor-pointer flex-col items-center justify-center rounded-full border text-center capitalize shadow-sm shadow-black/5 transition-colors ${
                slot?.checked ? "bg-bg1 text-white" : "bg-white text-zinc-800"
              }`}
            >
              {day[0]} {/* Display the first letter of the day */}
            </p>
            {slot.checked ? (
              <>
                <p className="col-span-2 text-center">{formatTime(slot.start)}</p>
                <p className="col-span-2 text-center">{formatTime(slot.end)}</p>
              </>
            ) : (
              <>
                <span className="col-span-2 text-center text-gray-400">Holiday</span>
                <span className="col-span-2 text-gray-400"></span>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
