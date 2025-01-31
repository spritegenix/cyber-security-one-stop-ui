"use client";
import useIsMobile from "@/customHooks/useIsMobile";
import AdditionalInformationForm from "./AdditionalInformationForm";
import BasicInformationForm from "./BasicInformationForm";
import ProfessionalDetailsForm from "./ProfessionalDetailsForm";
import Tab from "@/components/elements/tabGridFramerMotion/Tab";
import { FirmDashboard } from "@/data/global";
import { useLocalStorage } from "@/customHooks/useLocalStorage";
import { useHydrated } from "@/customHooks/useHydrated";
import CoverPhotosForm from "./CoverPhotosForm";
import VerificationDocumentsForm from "./VerificationDocumentsForm";
import { useGetBusinessDetails } from "@/app/_queryCall/businessAuth/csr";
import { FramerMotionAccordion } from "@/components/elements/Accordions/FramerMotionAccordion";
import { FaCircleDot } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import AdminNotification from "./AdminNotification";
import { useEffect } from "react";

export default function BusinessProfile() {
  const { userData: loggedUser, loading, error, refetch } = useGetBusinessDetails();
  useEffect(() => {
    // console.log(loggedUser);
  }, [loggedUser]);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useLocalStorage(
    "businessProfileActiveTab",
    "Basic Information",
  );
  const hydrated = useHydrated();

  if (!hydrated) return null;
  return (
    <div className="w-full md:col-span-11">
      {loggedUser?.adminNotice?.note && <AdminNotification note={loggedUser?.adminNotice?.note} />}
      {isMobile ? (
        <div className="space-y-2">
          {!!loggedUser?.isBusinessVerified ? (
            <p className="flex w-max items-center gap-2 rounded-full bg-green-500 px-4 py-1 text-sm text-white">
              <FaCircleDot />
              <span>Account Verified</span>
            </p>
          ) : (
            <p className="flex w-max items-center gap-2 rounded-full bg-red-500 px-4 py-1 text-sm text-white">
              <FaCircleDot />
              <span>You are not Verified</span>
            </p>
          )}
          {loggedUser?.isBlocked && (
            <p className="flex w-max items-center gap-2 rounded-full bg-red-500 px-4 py-1 text-sm text-white">
              <FaCircleDot />
              <span>Blocked By Admin</span>
            </p>
          )}
          {FirmDashboard?.tabs?.map((tab: any) => (
            <FramerMotionAccordion
              key={tab?.id}
              titleChildren={
                <div className="flex items-center gap-2">
                  {tab?.icon}
                  {tab?.label}
                </div>
              }
              contentChildren={
                <div className="py-2">
                  <TabContent activeTab={tab?.label} />
                </div>
              }
            />
          ))}
          {!loggedUser?.isBusinessVerified && (
            <p className="ml-4 text-sm text-red-500">
              Note: Please complete your profile to get verified
            </p>
          )}
        </div>
      ) : (
        // Desktop Grid
        <div className="grid grid-cols-12 gap-2 lg:gap-5">
          <ul className="col-span-4 space-y-5 rounded-lg border border-zinc-400 bg-white p-3 text-lg">
            {!!loggedUser?.isBusinessVerified ? (
              <p className="flex w-max items-center gap-2 rounded-full bg-green-500 px-4 py-1 text-sm text-white">
                <FaCircleDot />
                <span>Account Verified</span>
              </p>
            ) : (
              <p className="flex w-max items-center gap-2 rounded-full bg-red-500 px-4 py-1 text-sm text-white">
                <FaCircleDot />
                <span>You are not Verified</span>
              </p>
            )}
            {loggedUser?.isBlocked && (
              <p className="flex w-max items-center gap-2 rounded-full bg-red-500 px-4 py-1 text-sm text-white">
                <ImBlocked />
                <span>Blocked By Admin</span>
              </p>
            )}
            <Tab tabs={FirmDashboard?.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {!loggedUser?.isBusinessVerified && (
              <p className="ml-4 text-sm text-red-500">
                <strong>Note:</strong> Please complete your profile to get verified by Support Team.
              </p>
            )}
          </ul>
          <div className="col-span-8 rounded-lg border border-zinc-400 bg-white p-3">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
      )}
    </div>
  );
}

function TabContent({ activeTab }: any) {
  const { userData: loggedUser, loading, error, refetch } = useGetBusinessDetails();
  // console.log(loggedUser, "loggedUser");
  return (
    <>
      {activeTab === "Basic Information" && (
        <BasicInformationForm data={loggedUser} refetchData={refetch} />
      )}
      {activeTab === "Professional Details" && (
        <ProfessionalDetailsForm data={loggedUser} refetchData={refetch} />
      )}
      {activeTab === "Additional Information" && (
        <AdditionalInformationForm data={loggedUser} refetchData={refetch} />
      )}
      {activeTab === "Cover Photos" && <CoverPhotosForm data={loggedUser} refetchData={refetch} />}
      {activeTab === "Verification Documents" && (
        <VerificationDocumentsForm data={loggedUser} refetchData={refetch} />
      )}
    </>
  );
}
