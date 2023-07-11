import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CldImage, CldOgImage } from "next-cloudinary";
import { Trash } from "lucide-react";
import { LoadingSpinner } from "@/components/utils/loading";
import { useDropzone } from "react-dropzone";
import axios, { AxiosResponse } from "axios";

type Accept = string | RegExp | (string | RegExp)[];

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  accept?: Accept; // Updated to Accept type
}

interface LoadingProgressProps {
  percentCompleted: number;
}

const LoadingProgress: React.FC<LoadingProgressProps> = ({
  percentCompleted,
}) => {
  return (
    <div className="flex items-center">
      <div className="w-full bg-gray-200 h-2 rounded-md">
        <div
          className="h-full bg-blue-500 rounded-md"
          style={{ width: `${percentCompleted}%` }}
        />
      </div>
      <span className="ml-2 text-gray-500">{`${percentCompleted}%`}</span>
    </div>
  );
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  accept = ["image/*"], // Specify the accepted file types as an array
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qo7lidod"); // Replace with your Cloudinary upload preset

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dqpzvvd0v/image/upload", // Replace with your Cloudinary upload endpoint
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / file.size
              );
              setUploadProgress(percentCompleted);
            },
          }
        )
        .then((response: AxiosResponse<any>) => {
          const imageUrl = response.data.secure_url;
          onChange(imageUrl);
          setPreviewImage(null);
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = (url: string) => {
    onRemove(url);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        handleUpload(acceptedFiles[0]);
      }
    },
    disabled: disabled || isUploading,
  });

  return (
    <div className="relative">
      <div className="mb-4 grid gap-4 grid-cols-3">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Image alt="Image" src={url} width={200} height={200} />
          </div>
        ))}
        {!disabled && (
          <>
            {value.length === 0 && !isUploading && (
              <div
                {...getRootProps()}
                className="relative flex items-center justify-center w-[200px] h-[200px] rounded-md border-2 border-dashed border-gray-300 cursor-pointer"
              >
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mx-auto h-8 w-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Drag and drop an image or click to browse
                  </p>
                </div>
                <input
                  {...getInputProps()}
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleUpload(e.target.files[0]);
                    }
                  }}
                  className="absolute w-0 h-0 overflow-hidden"
                  disabled={disabled || isUploading}
                />
              </div>
            )}
            {previewImage && (
              <CldImage
                width="960"
                height="600"
                src={previewImage}
                sizes="100vw"
                alt="Description of my image"
                zoom="0.5"
              />
            )}
          </>
        )}
      </div>
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <LoadingSpinner size={60} />
        </div>
      )}
      {isUploading && <LoadingProgress percentCompleted={uploadProgress} />}
      {!disabled && (
        <p className="text-sm text-gray-500">
          {value.length} {value.length === 1 ? "image" : "images"} uploaded
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
