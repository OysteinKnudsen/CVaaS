import React, { useEffect, useState } from "react";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { Box, Card, Float } from "@chakra-ui/react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { fit, scale } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/underlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { DownloadImageButton } from "./DownloadImageButton";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { autoBest } from "@cloudinary/url-gen/qualifiers/quality";
import placeholderImg from '../../../assets/placeholder.png';


interface Props {
  personPublicId: string;
  backdropImagePublicId: string;
}

export const ImageVariant: React.FC<Props> = (props) => {
  const { personPublicId, backdropImagePublicId } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
  }, [personPublicId])

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  
  if (!personPublicId || !backdropImagePublicId) return null;

  const transformedImage = cld
    .image(personPublicId)
    .effect(backgroundRemoval().fineEdges())
    .resize(fit().height("1.0").aspectRatio("3:4"))
    .resize(scale().width(1463).height(2048))
    .underlay(
      source(
        image(backdropImagePublicId).transformation(
          new Transformation().resize(scale().width(1463).height(2048))
        )
      )
    )
    .delivery(quality(autoBest()));

  const downloadUrl = transformedImage.toURL();

  return (
    <Box position={"relative"}>
      {!isLoaded && 
      <img src={placeholderImg} alt="Profile placeholder" />
      }
        <AdvancedImage
        onLoad={() => setIsLoaded(true)}
        cldImg={transformedImage}
        plugins={[placeholder({ mode: "blur" })]}
      />
      <Float placement="bottom-end" offset={[8]}>
        <DownloadImageButton downloadUrl={downloadUrl} />
      </Float>
    </Box>
  );
};
