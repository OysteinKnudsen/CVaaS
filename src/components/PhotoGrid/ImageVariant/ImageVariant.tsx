import React from "react";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { Box, Float } from "@chakra-ui/react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/underlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { DownloadPhotoButton } from "./DownloadPhotoButton";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { autoBest } from "@cloudinary/url-gen/qualifiers/quality";

interface Props {
  personPublicId: string;
  backdropImagePublicId: string;
}

export const ImageVariant: React.FC<Props> = (props) => {
  const { personPublicId, backdropImagePublicId } = props;

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  const transformedImage = cld
    .image(personPublicId)
    .effect(backgroundRemoval().fineEdges())
    .underlay(
      source(
        image(backdropImagePublicId).transformation(
          new Transformation().resize(
            fill()
              .width("1.0")
              .height("1.0")
              .gravity("auto")
              .addFlag("relative")
          )
        )
      )
    )
    .delivery(quality(autoBest()));

  const downloadUrl = transformedImage.toURL();

  return (
    <Box position={"relative"}>
      <AdvancedImage
        cldImg={transformedImage}
        plugins={[placeholder({ mode: "blur" })]}
      />
      <Float placement="bottom-end" offset={[8]}>
        <DownloadPhotoButton downloadUrl={downloadUrl} />
      </Float>
    </Box>
  );
};
