import {
  Button,
  FileUpload,
  useFileUpload,
  type FileUploadFileAcceptDetails,
} from "@chakra-ui/react";
import type React from "react";
import { HiUpload } from "react-icons/hi";
import { FileUploadError } from "./FileUploadError";
import type { ApiUploadResponse } from "../../../types/api/ApiUpload";
import { useEffect } from "react";

interface Props {
  onUpload: (publicId: string | null) => void;
}

export const UploadPhotoButton: React.FC<Props> = (props) => {
  const handleUpload = async (fileDetails: FileUploadFileAcceptDetails) => {
    const file = fileDetails.files[0];

    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data: ApiUploadResponse = await response.json();
    props.onUpload(data.public_id);
  };

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 4.4 * 1024 * 1024, // 4.4mb is Vercel max file size
    onFileAccept: handleUpload,
    accept: ["image/png", "image/webp", "image/heic"],
  });

  useEffect(() => {
    if (fileUpload.acceptedFiles?.length === 0) {
      props.onUpload(null);
    }
  }, [fileUpload.acceptedFiles]);

  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button ml={4} bg="black" color="white">
          Last opp
          <HiUpload />
        </Button>
      </FileUpload.Trigger>
      {fileUpload.rejectedFiles?.length > 0 && (
        <FileUploadError error={fileUpload.rejectedFiles[0].errors[0]} />
      )}
    </FileUpload.RootProvider>
  );
};
