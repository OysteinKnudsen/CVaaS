import "./index.css";
import { Box, Button, ButtonGroup, Flex, Heading,VStack } from "@chakra-ui/react";
import { useState } from "react";
import { UploadPhotoButton } from "./components/UploadPhotoButton/UploadPhotoButton";
import { ImageVariants } from "./components/IdendityVariants/ImageVariants";


function App() {
  const [originalPhotoPublicId, setOriginalPhotoPublicId] = useState<string | null>(null);
  
  return (
    <>
      <VStack align="stretch" width="100vw" minHeight="100vh" p={8}>
        <Heading alignSelf="center">Generering av CV-bilder</Heading>
        <Flex
          direction="row"
          justify="space-between"
          align="flex-start"
          width="100%"
          maxWidth="1200px"
          gap={12}
        >
          <Box flex="1" minWidth="300px">
            <VStack align="flex-start">
              <UploadPhotoButton
                type="original"
                onUpload={(pid) => {
                  setOriginalPhotoPublicId(pid);
                }}
              />
            </VStack>
          </Box>
          {originalPhotoPublicId && <ImageVariants publicId={originalPhotoPublicId} />}
          {originalPhotoPublicId && (
            <Box flex="1" minWidth="300px">
              <VStack as="section"  align="flex-start">
                <Heading size="lg">Velg metode for generering</Heading>
                <ButtonGroup orientation="vertical" width="100%">
                  <Button>Generer med identitetsfarger</Button>
                  <Button>Velg fra opplastede bakgrunner</Button>
                  <Button>Last opp egen bakgrunn</Button>
                </ButtonGroup>
              </VStack>
            </Box>
          )}
        </Flex>

        {/* TODO: Button to allow user to upload original CV photo*/}
        {/* TODO: Display original photo uploaded by the user. Fetched from cloudinary*/}
        {/* TOOD: Allow user to select between generating variants based on identity colors, uploading own backdrop*/}
        {/*TODO: If generated variants, use the transform API to generate variants and get the public url of the transformed images */}
        {/*TODO: Display the variants in a grid */}
        {/*TODO: Allow user to download the variants */}
        {/*TODO: If the user uploads a backdrop, use the upload API to upload to cloudinary and show the result image below the original photo */}
        {/*TODO: Add a footer with the name of the app and the year */}
      </VStack>
    </>
  );
}

export default App;
