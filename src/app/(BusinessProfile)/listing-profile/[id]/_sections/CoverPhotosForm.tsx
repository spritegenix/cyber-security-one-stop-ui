import React, { use, useEffect } from "react";
import CoverPhotoUploaderForm from "../../../../../components/elements/fileUploaders/CoverPhotoUploaderForm";
import { useMutationBusinessFile } from "@/app/_queryCall/businessAuth/csr";

export default function CoverPhotosForm({ data, refetchData }: any) {
  const [backendData, setBackendData] = React.useState<any>();
  useEffect(() => {
    setBackendData(data);
  }, [data]);
  const {
    handleUpdate: handleCover,
    data: CoverData,
    loading: CoverLoading,
    error: CoverError,
  } = useMutationBusinessFile();
  const {
    handleUpdate: handleDesktopBanner,
    data: DesktopData,
    loading: DesktopLoading,
    error: DesktopError,
  } = useMutationBusinessFile();
  const {
    handleUpdate: handleMobileBanner,
    data: MobileData,
    loading: MobileLoading,
    error: MobileError,
  } = useMutationBusinessFile();

  async function handleCoverFunction(data: any) {
    let images = data?.map((item: any) => ({
      image: item?.file,
      order: item?.order,
      imageId: item?.id,
      toDelete: item?.toDelete,
    }));
    try {
      await handleCover({ coverImages: images });
    } catch (e) {
      console.error("Error updating cover photos", e);
    }
  }

  async function handleDesktopBannerFunction(data: any) {
    let images = data?.map((item: any) => ({
      image: item?.file,
      order: item?.order,
      imageId: item?.id,
      toDelete: item?.toDelete,
    }));
    try {
      await handleDesktopBanner({ adBannerImages: images });
    } catch (e) {
      console.error("Error updating cover photos", e);
    }
  }
  async function handleMobileBannerFunction(data: any) {
    let images = data?.map((item: any) => ({
      image: item?.file,
      order: item?.order,
      imageId: item?.id,
      toDelete: item?.toDelete,
    }));
    try {
      await handleMobileBanner({ mobileAdBannerImages: images });
    } catch (e) {
      console.error("Error updating cover photos", e);
    }
  }
  return (
    backendData &&
    backendData?.businessDetails && (
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Cover Photos</h2>
          <p className="text-xs text-red-500">
            Note: First Image will be shown as cover photo in Business Profile
          </p>
        </div>
        <CoverPhotoUploaderForm
          defaultData={
            backendData?.businessDetails.coverImages?.map((item: any) => {
              return { id: item?.id, url: item?.url, file: undefined, toDelete: false };
            }) || []
          }
          mutationHandler={handleCoverFunction}
          loading={CoverLoading}
          error={CoverError?.message}
          responseData={CoverData?.manageBusinessCoverImage?.map((item: any) => item?.message)}
          aspectRatio={192 / 108}
        />
        <h2 className="text-xl font-semibold">Ad Banners for Desktop</h2>
        <CoverPhotoUploaderForm
          defaultData={
            backendData?.businessDetails?.adBannerImages?.map((item: any) => {
              return { id: item?.id, url: item?.url, file: undefined, toDelete: false };
            }) || []
          }
          aspectRatio={16 / 9}
          mutationHandler={handleDesktopBannerFunction}
          loading={DesktopLoading}
          error={DesktopError?.message}
          responseData={DesktopData?.manageBusinessAdBannerImage?.map((item: any) => item?.message)}
        />
        <h2 className="text-xl font-semibold">Ad Banners for Mobile</h2>
        <CoverPhotoUploaderForm
          defaultData={
            backendData?.businessDetails?.mobileAdBannerImages?.map((item: any) => {
              return { id: item?.id, url: item?.url, file: undefined, toDelete: false };
            }) || []
          }
          aspectRatio={9 / 16}
          mutationHandler={handleMobileBannerFunction}
          loading={MobileLoading}
          error={MobileError?.message}
          responseData={MobileData?.manageBusinessMobileAdBannerImage?.map(
            (item: any) => item?.message,
          )}
        />
      </div>
    )
  );
}