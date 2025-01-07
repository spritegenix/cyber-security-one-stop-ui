import type { Metadata, ResolvingMetadata } from "next";
import { banner, service1, user } from "@/assets";
import SocialMediaIconFinder from "@/components/elements/SocialMediaIconFinder";
import { RatingInput, StarRating } from "@/components/elements/StarRating";
import Wrapper from "@/components/elements/Wrappers";
import Layout from "@/components/layout/Layout";
import { CoverPhotosSlider } from "@/app/(BusinessProfile)/[businessID]/_sections/CoverPhotosSlider";
import { individualBusinessSample } from "@/data/listing";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserTie } from "react-icons/fa";
import { IoEarthSharp, IoLocation } from "react-icons/io5";
import Reviews, { ReviewsCard } from "./_sections/Reviews";
import Button from "@/components/elements/Button";
import { VscVerifiedFilled } from "react-icons/vsc";
import { fetchBusinessById } from "@/app/_queryCall/businessProfile/ssg";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Rebuild the page every hour
type Props = {
  params: Promise<{ businessID: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// make alļ business pages static at build time
// export async function generateStaticParams() {
//   const business = await fetchBusinessById({ businessSlug: id });
// return business.map((post) => ({
//   slug: post.slug,
// })).slice(0,100);
// }

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).businessID;

  const business = await fetchBusinessById({ businessSlug: id });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: business?.getBusinessById?.name || "Business Profile",
    openGraph: {
      images: [business?.getBusinessById?.businessDetails?.logo, ...previousImages],
    },
  };
}

export default async function IndividualBusinessPage({ params, searchParams }: Props) {
  const { businessID } = await params;
  // const { query } = await searchParams;
  // console.log(query);
  const business = await fetchBusinessById({ businessSlug: businessID });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Business",
    name: business?.getBusinessById?.name,
    image: business?.getBusinessById?.businessDetails?.logo,
    description: business?.getBusinessById?.businessDetails?.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: business?.getBusinessById?.businessDetails?.addresses[0]?.street || "",
      addressLocality: business?.getBusinessById?.businessDetails?.addresses[0]?.city || "",
      addressRegion: business?.getBusinessById?.businessDetails?.addresses[0]?.state || "",
      postalCode: business?.getBusinessById?.businessDetails?.addresses[0]?.zipCode || "",
      addressCountry: business?.getBusinessById?.businessDetails?.addresses[0]?.country || "",
    },
    telephone: business?.getBusinessById?.primaryContacts
      ?.filter((contact: { type: string; value: string }) => contact.type === "PHONE")
      ?.map((contact: { value: string }) => contact.value)
      ?.join(", "),
    email: business?.getBusinessById?.primaryContacts
      ?.filter((contact: { type: string; value: string }) => contact.type === "EMAIL")
      ?.map((contact: { value: string }) => contact.value)
      ?.join(", "),
    url: business?.getBusinessById?.businessDetails?.primaryWebsite || "",
    openingHoursSpecification: business?.getBusinessById?.businessDetails?.operatingHours?.map(
      (hours: { day: string; opens: string; closes: string }) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.day,
        opens: hours.opens,
        closes: hours.closes,
      }),
    ),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business?.getBusinessById?.averageRating || "0",
      reviewCount: business?.getBusinessById?.reviewCount || "0",
    },
  };

  if (!business || !business.getBusinessById) {
    notFound();
  }
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Wrapper isTop={true}>
        <Banner
          image={
            business?.getBusinessById?.businessDetails?.coverImages[0]?.url ||
            individualBusinessSample?.coverPhoto
          }
          avatar={
            business?.getBusinessById?.businessDetails?.logo || individualBusinessSample?.coverPhoto
          }
          name={business?.getBusinessById?.name || individualBusinessSample?.name}
          location={
            `${business?.getBusinessById?.businessDetails?.addresses[0]?.city},${business?.getBusinessById?.businessDetails?.addresses[0]?.state}` ||
            individualBusinessSample?.location
          }
          rating={business?.getBusinessById?.averageRating}
          reviews={business?.getBusinessById?.reviewCount}
          verified={business?.getBusinessById?.isBusinessVerified || false}
        />
      </Wrapper>
      {/* Description  */}
      <Wrapper className="my-5">
        <p className="whitespace-pre-line">
          {business?.getBusinessById?.businessDetails?.description ||
            individualBusinessSample?.description}
        </p>
      </Wrapper>
      {/* Tabs  */}
      <Wrapper as={"section"} className="my-5 grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Main  */}
        <section className="space-y-5 md:col-span-8">
          {/* Years Of Experience  */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">Experience:</h6>
            <p className="flex flex-wrap gap-2">
              <span className="rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white">
                {business?.getBusinessById?.businessDetails?.experience ||
                  individualBusinessSample?.yearsOfExperience}
                + years
              </span>
            </p>
          </div>
          {/* Cover Photos  */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">Cover Photos:</h6>
            <div className="relative">
              <CoverPhotosSlider
                data={
                  (business?.getBusinessById?.businessDetails?.coverImages).map(
                    (image: any) => image?.url,
                  ) || individualBusinessSample.coverPhotos
                }
              />
            </div>
          </div>
          {/* Practice Areas  */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">Practice Areas:</h6>
            <p className="flex flex-wrap gap-2">
              {business?.getBusinessById?.businessDetails?.categories.map(
                (category: { id: string; slug: string; name: string }) => (
                  <span
                    key={category.id}
                    data-secondary-key={category.slug}
                    className="rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                  >
                    {category.name}
                  </span>
                ),
              )}
            </p>
          </div>
          {/* Practice Courts  */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">Practice Courts:</h6>
            <p className="flex flex-wrap gap-2">
              {business?.getBusinessById?.businessDetails?.courts.map(
                (court: { id: string; slug: string; name: string }) => (
                  <span
                    key={court.id}
                    data-secondary-key={court.slug}
                    className="rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                  >
                    {court.name}
                  </span>
                ),
              )}
            </p>
          </div>
          {/* Language Proficiency  */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">Language Proficiency:</h6>
            <p className="flex flex-wrap gap-2">
              {business?.getBusinessById?.businessDetails?.languages.map(
                (language: { id: string; slug: string; name: string }) => (
                  <span
                    key={language.id}
                    data-secondary-key={language.slug}
                    className="rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                  >
                    {language.name}
                  </span>
                ),
              )}
            </p>
          </div>
          {/* Academic Degree  */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">Academic Degree:</h6>
            <p className="flex flex-wrap gap-2">
              {business?.getBusinessById?.businessDetails?.degrees.map(
                (name: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                  >
                    {name}
                  </span>
                ),
              )}
            </p>
          </div>
          {/* License/Bar Number */}
          <div className="space-y-3">
            <h6 className="text-2xl font-medium max-md:mb-2">License/Bar Number:</h6>
            <p className="w-max rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white">
              {business?.getBusinessById?.businessDetails?.license}
            </p>
          </div>
          {/* Rating and Reviews */}
          <ReviewsSection
            className="hidden md:block"
            reviews={business?.getBusinessById?.reviews || []}
          />
          {/* ------------------------  */}
        </section>
        {/* Aside  */}
        <aside className="space-y-5 md:col-span-4">
          {/* Contact Information */}
          <div className="space-y-5">
            <h2 className="mb-3 text-2xl font-semibold">Contact Information</h2>

            {/* Phone Number */}
            <div className="gap-3 md:flex">
              <h6 className="text-xl font-medium">Phone Number:</h6>
              <ul className="flex flex-col flex-wrap gap-2">
                {/* Render primary phone numbers */}
                {business?.getBusinessById?.primaryContacts
                  ?.filter((contact: { type: string; value: string }) => contact.type === "PHONE")
                  .map((contact: any, index: any) => (
                    <Link
                      key={`primary-${index}`}
                      href={`tel:${contact.value}`}
                      className="w-max rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                    >
                      {contact.value}
                    </Link>
                  ))}

                {/* Render additional phone numbers */}
                {business?.getBusinessById?.additionalContacts
                  ?.filter((contact: string) => isPhoneNumber(contact))
                  .map((contact: string, index: number) => (
                    <Link
                      key={`additional-phone-${index}`}
                      href={`tel:${contact}`}
                      className="w-max rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                    >
                      {contact}
                    </Link>
                  ))}
              </ul>
            </div>

            {/* Email */}
            <div className="gap-3 md:flex">
              <h6 className="text-xl font-medium">Email:</h6>
              <ul className="flex flex-wrap gap-2">
                {/* Render primary email */}
                {business?.getBusinessById?.primaryContacts
                  ?.filter((contact: { type: string; value: string }) => contact.type === "EMAIL")
                  .map((contact: any, index: any) => (
                    <Link
                      key={`primary-${index}`}
                      href={`mailto:${contact.value}`}
                      className="w-max rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                    >
                      {contact.value}
                    </Link>
                  ))}

                {/* Render additional email addresses from business data */}
                {business?.getBusinessById?.additionalContacts
                  ?.filter((contact: string) => isEmail(contact))
                  .map((contact: string, index: number) => (
                    <Link
                      key={`additional-email-${index}`}
                      href={`mailto:${contact}`}
                      className="w-max rounded-md border border-bg1 bg-bg1/10 px-2 py-0.5 font-medium transition-all duration-300 hover:bg-bg1 hover:text-white"
                    >
                      {contact}
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
          {/* Social Information  */}
          <div className="space-y-3">
            <h2 className="mb-3 text-2xl font-semibold">Social Information</h2>
            {/* Website  */}
            {business?.getBusinessById?.businessDetails?.primaryWebsite && (
              <div className="items-center gap-3">
                <h6 className="mb-2 text-xl font-medium max-md:mb-2">Website:</h6>
                <div className="flex items-center gap-3">
                  <IoEarthSharp className="text-2xl text-bg1" />
                  <Link
                    href={business?.getBusinessById?.businessDetails?.primaryWebsite || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wrap text-blue-500 hover:underline"
                  >
                    {business?.getBusinessById?.businessDetails?.primaryWebsite}
                  </Link>
                </div>
              </div>
            )}
            {/* Social Media  */}
            {(individualBusinessSample?.socials.length > 0 ||
              business?.getBusinessById?.businessDetails?.websites?.length > 0) && (
              <div>
                <h6 className="mb-2 text-xl font-medium">Social Media:</h6>
                <ul className="space-y-3">
                  {/* Render individualBusinessSample socials */}
                  {/* {individualBusinessSample?.socials.map((link: string, index: number) => (
                    <div key={`individual-${index}`} className="flex items-center gap-3">
                      <SocialMediaIconFinder url={link} className="min-w-6 text-2xl" />
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wrap text-blue-500 hover:underline"
                      >
                        {link}
                      </Link>
                    </div>
                  ))} */}
                  {/* Render businessDetails websites */}
                  {business?.getBusinessById?.businessDetails?.websites?.map(
                    (website: any, index: number) => (
                      <div key={`business-${index}`} className="flex items-center gap-3">
                        <SocialMediaIconFinder url={website.url} className="min-w-6 text-2xl" />
                        <Link
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-wrap text-blue-500 hover:underline"
                        >
                          {website.url}
                        </Link>
                      </div>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
          {/* ConsultationTiming  */}
          <div>
            <ConsultationTiming
              timeSlots={transformOperatingHours(
                business?.getBusinessById?.businessDetails?.operatingHours || [],
              )}
            />
          </div>
        </aside>
        {/* Rating and Reviews */}
        <ReviewsSection className="md:hidden" reviews={business?.getBusinessById?.reviews || []} />
      </Wrapper>
    </Layout>
  );
}

function Banner({ image, avatar, name, location, rating, reviews, verified }: any) {
  return (
    <div className="relative md:pb-28">
      <div className="flex h-80 w-full justify-center overflow-hidden rounded-lg bg-zinc-300 max-sm:hidden">
        <Image // 1536 X 320 / 25:5
          src={image || banner}
          alt="banner"
          width={1536}
          height={320}
          className="h-full w-min object-cover md:object-contain"
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
            <span>{name}</span>
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

const isPhoneNumber = (value: string) => /^[0-9]{10,15}$/.test(value); // Simple phone number check (10-15 digits)
const isEmail = (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

const transformOperatingHours = (operatingHours: any[]) => {
  const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  // Initialize all days as holidays
  const timeSlots: Record<string, any> = daysOfWeek.reduce((acc: any, day) => {
    acc[day] = { checked: false, start: null, end: null };
    return acc;
  }, {});

  // Map operating hours to respective days
  operatingHours.forEach((slot) => {
    const { dayOfWeek, openingTime, closingTime } = slot;
    timeSlots[dayOfWeek] = {
      checked: true,
      start: openingTime,
      end: closingTime,
    };
  });

  return timeSlots;
};

// Assuming `convertToWorkingHour` and `convertToDayTimingsDefaultValue` are imported

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
      <h2 className="mb-5 text-2xl font-semibold">Consultation Timing</h2>
      <div className="grid w-max grid-cols-5 items-center gap-2">
        {Object.entries(timeSlots).map(([day, slot]: any) => (
          <React.Fragment key={day}>
            <p
              className={`border-input relative col-span-1 flex size-9 cursor-pointer flex-col items-center justify-center rounded-full border text-center capitalize shadow-sm shadow-black/5 transition-colors ${
                slot?.checked ? "bg-orange-500 text-white" : "bg-white text-zinc-800"
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

function ReviewsSection({ className, reviews }: { className: string; reviews: any[] }) {
  return (
    <div className={`mt-5 space-y-3 ${className}`}>
      <h6 className="text-2xl font-semibold max-md:mb-2">Write Your Review</h6>
      <div className="space-y-3">
        <Reviews />
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewsCard
              key={review.id || index} // Use unique id if available, fallback to index
              avatar={review.user?.avatar}
              userName={review.user?.name || "Anonymous"} // Fallback to "Anonymous" if no name is provided
              rating={review.rating || 0} // Default to 0 if no rating
              reviewText={review.comment || "No comments provided"} // Fallback for missing comments
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews available yet.</p>
        )}
      </div>
      {reviews && reviews.length > 3 && (
        <Button className="w-full max-w-screen-sm">Load More</Button>
      )}
    </div>
  );
}
