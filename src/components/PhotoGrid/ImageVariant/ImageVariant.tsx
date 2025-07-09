import React, { useState } from "react";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { Card } from "@chakra-ui/react";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { fit, scale } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/underlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { DownloadImageButton } from "./DownloadImageButton";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { autoBest, autoLow } from "@cloudinary/url-gen/qualifiers/quality";
import placeholderImg from '../../../assets/placeholder.png';


interface Props {
  personPublicId: string;
  backdropImagePublicId: string;
}

export const ImageVariant: React.FC<Props> = (props) => {
  const { personPublicId, backdropImagePublicId } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });
  if (!personPublicId || !backdropImagePublicId) return null;

  const lowQualityBackdropPlaceholder = cld
  .image(backdropImagePublicId)
  .resize(scale().width(1463).height(2048))
  .delivery(quality(autoLow()));
  
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
    <Card.Root>
      <Card.Body>
        {!isLoaded && 
       <img src={placeholderImg} alt="Profile placeholder" />
        }
          <AdvancedImage
          onLoad={() => setIsLoaded(true)}
          cldImg={transformedImage}
          plugins={[placeholder({ mode: "vectorize" })]}
        />
      </Card.Body>
      <DownloadImageButton downloadUrl={downloadUrl} />
    </Card.Root>
  );
};
