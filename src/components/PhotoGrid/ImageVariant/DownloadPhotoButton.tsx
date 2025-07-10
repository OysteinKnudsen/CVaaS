import { Button } from "@chakra-ui/react";
import { RiDownload2Line } from "react-icons/ri";

interface Props {
    downloadUrl: string;
}

export const DownloadPhotoButton: React.FC<Props> = (props) => {

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = props.downloadUrl;
    a.download = "image.png";
    a.click();
}

  return (
    <Button variant={"ghost"} color={"white"} size={"md"} onClick={handleDownload}>
      <RiDownload2Line/>
    </Button>
  );
};