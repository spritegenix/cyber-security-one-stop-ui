import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import Image from "next/image";
import Button from "@/components/elements/Button";
import { FiDownload } from "react-icons/fi";
import Modal from "@/components/elements/Modal";

interface CroppingImageModalProps {
  imgSrc: string;
  setCroppedImage: (croppedImage: string) => void;
  aspectButton?: boolean;
  cropDownloadButton?: boolean;
  enableCircleButton?: boolean;
  defaultAspect?: number;
  isCircularCropBoolean?: boolean;
  handleClose: () => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

export default function CroppingImageModal({
  imgSrc,
  setCroppedImage,
  aspectButton = true,
  cropDownloadButton = true,
  enableCircleButton = true,
  defaultAspect = 1,
  isCircularCropBoolean = true,
  handleClose,
}: CroppingImageModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
  const [aspect, setAspect] = useState<number | undefined>(defaultAspect);
  const [isCircularCrop, setIsCircularCrop] = useState(isCircularCropBoolean);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef<string>("");

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleToggleAspect = () => {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(defaultAspect);
      if (imgRef.current) {
        const { width, height } = imgRef.current;
        setCrop(centerAspectCrop(width, height, defaultAspect));
      }
    }
  };

  const handleDownloadCrop = async () => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    if (!image || !canvas || !completedCrop) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreenCanvas = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreenCanvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      offscreenCanvas.width,
      offscreenCanvas.height,
    );

    const blob = await offscreenCanvas.convertToBlob({ type: "image/png" });
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    blobUrlRef.current = URL.createObjectURL(blob);
    hiddenAnchorRef.current?.setAttribute("href", blobUrlRef.current);
    hiddenAnchorRef.current?.click();
  };

  const handleSetCroppedImage = async () => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;

    if (!image || !canvas || !completedCrop) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreenCanvas = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreenCanvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );

    // Convert the canvas to a data URL
    offscreenCanvas.convertToBlob({ type: "image/png" }).then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // console.log(base64data, "base64data");
        setCroppedImage(base64data); // Set the final cropped image
      };
      reader.readAsDataURL(blob);
    });
  };

  useDebounceEffect(
    () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  return (
    <Modal onClose={handleClose}>
      <div className="grid max-w-2xl grid-cols-1 gap-5 rounded-md bg-white p-2 md:grid-cols-2">
        <div>
          {imgSrc && (
            <ReactCrop
              className=""
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              // minWidth={400}
              minHeight={100}
              circularCrop={isCircularCrop}
            >
              <Image
                src={imgSrc}
                ref={imgRef}
                alt="Crop me"
                width={800}
                height={800}
                onLoad={onImageLoad}
                className="h-full object-contain"
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              />
            </ReactCrop>
          )}
          <div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="flex flex-col items-center justify-center">
                <input
                  type="range"
                  step="0.1"
                  min="1"
                  max="2"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer rounded-lg bg-gray-200"
                />
                <label>Scale: {scale.toFixed(1)}</label>
              </div>
              <div className="flex flex-col items-center justify-center">
                <input
                  type="range"
                  step="1"
                  min="0"
                  max="180"
                  value={rotate}
                  onChange={(e) => setRotate(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer rounded-lg bg-gray-200"
                />
                <label>Rotate: {rotate}&deg;</label>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {aspectButton && (
                <Button onClick={handleToggleAspect}>Toggle Aspect {aspect ? "Off" : "On"}</Button>
              )}
              {enableCircleButton && (
                <Button onClick={() => setIsCircularCrop((pre) => !pre)}>
                  {isCircularCrop ? "Disable Circular Crop" : "Enable Circular Crop"}
                </Button>
              )}
              <Button
                onClick={() => {
                  handleSetCroppedImage();
                  handleClose();
                }}
              >
                Set
              </Button>
              {cropDownloadButton && (
                <Button onClick={handleDownloadCrop}>
                  <FiDownload />
                </Button>
              )}
            </div>
            <a ref={hiddenAnchorRef} download="cropped-image.png" hidden />
          </div>
        </div>

        {completedCrop && (
          <canvas
            ref={previewCanvasRef}
            className={`my-auto border-2 border-black max-md:hidden ${isCircularCrop ? "rounded-full" : ""}`}
            style={{
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </Modal>
  );
}
