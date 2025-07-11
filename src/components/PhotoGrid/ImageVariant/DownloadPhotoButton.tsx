import { Button, DownloadTrigger } from "@chakra-ui/react";
import { RiDownload2Line } from "react-icons/ri";

interface Props {
  downloadUrl: string;
}

export const DownloadPhotoButton: React.FC<Props> = (props) => {
  const fetchImage = async () => {
    const response = await fetch(props.downloadUrl);
    const blob = await response.blob();
    return blob;
  };

  return (
    <DownloadTrigger
      data={fetchImage}
      fileName={"photo_variant"}
      mimeType={"image/*"}
    >
      <Button
        variant={"ghost"}
        color={"white"}
        size={"md"}
      >
        <RiDownload2Line />
      </Button>
    </DownloadTrigger>
  );
};
