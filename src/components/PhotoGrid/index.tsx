import {  SimpleGrid} from "@chakra-ui/react";
import React from "react";
import { ImageVariant } from "./ImageVariant";

interface Props {
  originalPhotoPublicId: string | null;
  backdrops: string[];
}

export const PhotoGrid: React.FC<Props> = ({ originalPhotoPublicId, backdrops }) => {
  if (!originalPhotoPublicId) return null;
  return (
    <SimpleGrid columns={4}>
      {backdrops.map((backdrop) => (
        <ImageVariant personPublicId={originalPhotoPublicId} backdropImagePublicId={backdrop}/>
      ))}
    </SimpleGrid>
  );
};
