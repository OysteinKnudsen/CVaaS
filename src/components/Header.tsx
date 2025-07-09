import { Flex, Text, Spacer, type ButtonProps } from "@chakra-ui/react";
import { UploadPhotoButton } from "./UploadPhotoButton/UploadPhotoButton";

interface Props extends ButtonProps {
    onUpload: (publicId: string|null) => void;
}

export const Header: React.FC<Props> = ({ onUpload }) => {
  
    return (
      <Flex as="header" bg={"#F1F1E9"} px={6} py={4} align="center">
        <Text fontSize="l" fontWeight="bold">
          CVaaS
        </Text>
        <UploadPhotoButton type="original" onUpload={onUpload} />
        <Spacer />
        <Text fontSize="md" fontWeight="medium">
          Bekk
        </Text>
      </Flex>
    );
  };