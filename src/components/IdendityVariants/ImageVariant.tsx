import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { backgroundRemoval, generativeRestore } from '@cloudinary/url-gen/actions/effect';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { trim } from '@cloudinary/url-gen/actions/reshape';
import { color } from '@cloudinary/url-gen/qualifiers/background';
import { Card, Image, Button } from '@chakra-ui/react';
import { RiDownload2Line } from 'react-icons/ri';

interface Props {
  publicId: string;
  backdropColor: string;
}

export const ImageVariant: React.FC<Props> = ({ publicId, backdropColor }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  const handleDownload = (imageUrl: string) => {
    const a = document.createElement('a');
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `${publicId}_${backdropColor}.jpg`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    return;
  };

  const cloudinaryImageUrl = cld
    .image(publicId)
    .effect(backgroundRemoval())
    .resize(pad().width('1.0').background(color(backdropColor)))
    .reshape(trim())
    .effect(generativeRestore())
    .toURL();

  return (
    <Card.Root>
      <Image src={cloudinaryImageUrl} />
      <Card.Footer gap="2">
        <Card.Title>{backdropColor}</Card.Title>
        <Button variant={'ghost'} onClick={() => handleDownload(cloudinaryImageUrl)}>
          <RiDownload2Line />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
