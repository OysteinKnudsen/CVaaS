/**
 * Button to allow user to upload photos to Cloudinary.
 * The button should use the API endpoint to upload the photo to Cloudinary.
 * The button should handle two cases:
 * - uploading a original CV photo
 * - uploading a backdrop photo
 * The button should have a loading state and an error state.
 * The button should return the public ID of the uploaded photo.
 * The button text should be "Last opp orginalbilde" or "Last opp bakgrunn" depending on the case.
 */

import { Button,  FileUpload, useFileUpload, type FileUploadFileAcceptDetails, Float } from "@chakra-ui/react";
import type React from "react";
import { HiUpload } from "react-icons/hi";
import { FilePreview } from "./UploadedFilePreview";

interface Props {
  type: "original" | "backdrop";
  onUpload: (publicId: string) => void;
}

export const UploadPhotoButton: React.FC<Props> = (props) => {
  const buttonText =
    props.type === "original" ? "Last opp orginalbilde" : "Last opp bakgrunn";

  const handleUpload = async (fileDetails: FileUploadFileAcceptDetails) => {
    const file = fileDetails.files[0];

    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/upload?type=" + props.type, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    props.onUpload(data.publicId);
    console.log(fileDetails);
  };

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 4.4 * 1024 * 1024, // 4.4mb is Vercel max file size
    onFileAccept: handleUpload,
    accept: ["image/png", "image/webp", "image/heic"],
  })

  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.HiddenInput/>
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> {buttonText}
        </Button>
      </FileUpload.Trigger>
      {fileUpload.acceptedFiles?.length > 0 && 
      <FilePreview file={fileUpload.acceptedFiles[0]} />
      }
    </FileUpload.RootProvider>
  );
};
