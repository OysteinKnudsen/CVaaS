import { Flex, Text, Spacer, type ButtonProps, Image, Box, VStack, HStack } from "@chakra-ui/react";
import { UploadPhotoButton } from "./UploadPhotoButton/UploadPhotoButton";
import logo from '../assets/logo.png';
import { useState } from "react";
interface Props extends ButtonProps {
    onUpload: (publicId: string|null) => void;
}

export const Header: React.FC<Props> = ({ onUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (publicId: string|null) => {
    setError(null);
    onUpload(publicId);
  }
  
    return (
      <Flex as="header" width={"100vw"} bg={"#F1F1E9"} px={6} py={4} align="center">
        <Image src={logo} alt="CVaaS-logo" width={50} />
        <HStack>
          <UploadPhotoButton onUpload={handleUpload} onError={(error) => {setError(error)}} />
          {error && <Text color={"red"}>{error}</Text>}
        </HStack>
        <Spacer />
        <Text fontSize="md" fontWeight="medium">
          Bekk
        </Text>
      </Flex>
    );
  };