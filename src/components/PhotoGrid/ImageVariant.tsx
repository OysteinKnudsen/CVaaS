import React from "react";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { Box } from "@chakra-ui/react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { fit, scale } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/underlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { mode } from "@cloudinary/url-gen/actions/rotate";

interface Props {
  personPublicId: string;
  backdropImagePublicId: string;
}

export const ImageVariant: React.FC<Props> = ({
  personPublicId,
  backdropImagePublicId,
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  if (!personPublicId || !backdropImagePublicId) return null;

  
  const transformedImage = cld.image(personPublicId)
  .effect(backgroundRemoval().fineEdges())
  .resize(fit().height("1.0").aspectRatio("3:4"))
  .resize(scale().width(1463).height(2048))
  .underlay(
    source(
      image(backdropImagePublicId).transformation(
        new Transformation().resize(scale().width(1463).height(2048))
      )
    )
  );


  return (
    <Box>
      <AdvancedImage cldImg={transformedImage} plugins={[placeholder({mode: 'blur'})]}/>
    </Box>
  );
};
