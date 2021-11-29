import React, { useState } from "react";
import { arrayOf, string } from "prop-types";

import { Bullet, Bullets, Container, Image } from "./styled";

const ImagesSlider = ({ images }) => {
  const [src, setSrc] = useState(images[0]);

  return (
    <Container>
      <Image src={src} />
      <Bullets>
        {images.map(imageSrc => {
          const isActive = imageSrc === src;
          const onClick = () => {
            setSrc(imageSrc);
          };
          return (
            <Bullet key={imageSrc} isActive={isActive} onClick={onClick} />
          );
        })}
      </Bullets>
    </Container>
  );
};

ImagesSlider.propTypes = {
  images: arrayOf(string).isRequired
};

export default ImagesSlider;
