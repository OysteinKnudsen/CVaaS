import { Flex, Text, Spacer, type ButtonProps, Image } from "@chakra-ui/react";
import { UploadPhotoButton } from "./UploadPhotoButton/UploadPhotoButton";
import logo from '../assets/logo.png';
interface Props extends ButtonProps {
    onUpload: (publicId: string|null) => void;
}

export const Header: React.FC<Props> = ({ onUpload }) => {
  
    return (
      <Flex as="header" width={"100vw"} bg={"#F1F1E9"} px={6} py={4} align="center">
        <Image src={logo} alt="CVaaS-logo" width={50} />
        <UploadPhotoButton onUpload={onUpload} setIsUploading={() => {}} />
        <Spacer />
        <Text fontSize="md" fontWeight="medium">
          Bekk
        </Text>
      </Flex>
    );
  };