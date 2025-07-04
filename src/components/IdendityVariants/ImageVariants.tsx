import { BackdropColors } from '../../constants';
import React from 'react';
import { ImageVariant } from './ImageVariant';
import { Heading } from '@chakra-ui/react';

interface Props {
  publicId: string;
}

export const ImageVariants: React.FC<Props> = (props) => {
  return (
    <>
      {Object.entries(BackdropColors).map(([title, hexes]) => (
        <section key={title}>
          <Heading size={'xl'}>{title}</Heading>
          {hexes.map((hex) => (
            <ImageVariant key={hex} publicId={props.publicId} backdropColor={hex} />
          ))}
        </section>
      ))}
    </>
  );
};
