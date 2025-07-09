import {  Badge, Box, Float, SimpleGrid} from "@chakra-ui/react";
import React from "react";
import { ImageVariant } from "./ImageVariant";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

interface Props {
  originalPhotoPublicId: string | null;
  backdrops: string[];
}

export const PhotoGrid: React.FC<Props> = ({ originalPhotoPublicId, backdrops }) => {
  if (!originalPhotoPublicId) return null;

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  
  return (
    <SimpleGrid columns={4} gap={8} margin={8} bgColor={"#1F1F1F"}>
      <Box position={"relative"}>
      <AdvancedImage
      cldImg={cld.image(originalPhotoPublicId)}
      />
      <Float placement={'top-end'} offset={1}>
        <Badge backgroundColor={"#e6eff8"} color={"black"}>Orginal</Badge>
      </Float>
      </Box>
      {backdrops.map((backdrop) => (
        <ImageVariant personPublicId={originalPhotoPublicId} backdropImagePublicId={backdrop}/>
      ))}
    </SimpleGrid>
  );
};
