import React, { useState, useRef, useEffect } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import CroppingImageModal from "@/components/elements/CroppedImageUpload/CroppingImageModal";
import Button from "@/components/elements/Button";
import { ProgressbarCircular } from "@/components/elements/ProgressBar";

export default function ProfilePicture({
  defaultImage,
  mutationData,
  mutation,
  loading,
  error,
}: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(""); // Source of selected image
  const [croppedImage, setCroppedImage] = useState<string>(""); // Final cropped image
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [backendImage, setBackendImage] = useState<any>(defaultImage);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Update backendImage when defaultImage changes
  useEffect(() => {
    if (defaultImage) {
      setBackendImage(defaultImage);
    }
  }, [defaultImage]);
  // Convert base64 to File object
  const base64ToFile = async (base64String: string): Promise<File> => {
    const response = await fetch(base64String);
    const blob = await response.blob();
    return new File([blob], "profile-image.jpg", { type: "image/jpeg" });
  };

  // Handle Avatar Image Upload
  const handleImageUpload = async (croppedImage: string) => {
    try {
      if (!croppedImage) {
        setErrorMessage("No image selected.");
        return;
      }
      setErrorMessage("");
      setImageFileUploadProgress(0);
      const file = await base64ToFile(croppedImage);
      // Simulating progress for demo purposes
      for (let progress = 10; progress <= 90; progress += 10) {
        setImageFileUploadProgress(progress);
        await new Promise((res) => setTimeout(res, 100)); // Simulated delay
      }
      let avatarFile = new File([file], file.name, {
        type: file.type,
      });
      await mutation({ avatar: avatarFile, addresses: [] });
      setImageFileUploadProgress(100);
      setBackendImage(croppedImage);
      setCroppedImage("");
    } catch (err) {
      setErrorMessage("Failed to upload image. Please try again.");
      console.error(err);
    } finally {
      setImageFileUploadProgress(null);
    }
  };

  // Handle file input change
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        // After file is loaded, set its source to component state and
        // open the cropping modal.
        setImgSrc(reader.result as string);
        setIsModalOpen(true); // Open modal after file selection
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    // Reset file input value to allow re-selection of the same file
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset input value
    }
  };

  return (
    <>
      {/* File Input */}
      <div className="flex max-w-max flex-col items-center gap-5">
        <div className="group relative flex max-w-max items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            ref={inputRef}
            hidden
            multiple={false}
          />

          {/* Edit Pencil */}
          <div
            onClick={() => inputRef.current?.click()}
            className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-bg1 shadow-lg transition-all group-hover:bg-bg1 group-hover:text-white"
          >
            <GoPencil />
          </div>

          {/* Image Preview */}
          {croppedImage ? (
            // Display cropped image
            <div
              className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:border-bg1"
              onClick={() => inputRef.current?.click()}
            >
              <Image
                src={croppedImage}
                width={128}
                height={128}
                alt="Avatar Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : backendImage ? (
            // Display default user image
            <div
              className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:border-bg1"
              onClick={() => inputRef.current?.click()}
            >
              <Image
                src={backendImage}
                width={128}
                height={128}
                alt="Default Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            // Display fallback icon
            <div
              className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gray-200 shadow-lg group-hover:border-bg1"
              onClick={() => inputRef.current?.click()}
            >
              <FaUserTie className="text-5xl text-white" />
            </div>
          )}

          {/* Display loader when image is being uploaded */}
          {imageFileUploadProgress !== null && imageFileUploadProgress < 100 && (
            <ProgressbarCircular imageFileUploadProgress={imageFileUploadProgress} />
          )}
        </div>
        {croppedImage && (
          <Button
            as={"div"}
            className="w-min cursor-pointer"
            onClick={() => handleImageUpload(croppedImage)}
          >
            Update
          </Button>
        )}
        {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        {error && <p className="mt-2 text-sm text-red-500">{error?.message}</p>}
        {mutationData && (
          <p className="mt-2 text-center text-sm text-green-500">Updated Successfully</p>
        )}
      </div>
      {/* Cropping Modal */}
      {isModalOpen && (
        <CroppingImageModal
          imgSrc={imgSrc}
          setCroppedImage={setCroppedImage}
          isCircularCropBoolean={true}
          scaleButton={false}
          aspectButton={false}
          cropDownloadButton={false}
          enableCircleButton={false}
          defaultAspect={1}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
