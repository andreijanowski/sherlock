import React, { useState, useRef, useEffect, useCallback } from "react";
import { arrayOf, string } from "prop-types";

import { Bullet, Bullets, Container, Image } from "./styled";

const TIMEOUT = 5000;

const ImagesSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const goToNextImage = useCallback(() => {
    setIndex(currentIndex => {
      const nextIndex = currentIndex + 1;
      return nextIndex >= images.length ? 0 : nextIndex;
    });
    timeoutRef.current = setTimeout(goToNextImage, TIMEOUT);
  }, [images]);

  useEffect(() => {
    timeoutRef.current = setTimeout(goToNextImage, TIMEOUT);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [goToNextImage]);

  return (
    <Container>
      <Image src={images[index]} />
      <Bullets>
        {images.map((imageSrc, imageIdx) => {
          const isActive = index === imageIdx;
          const onClick = () => {
            setIndex(imageIdx);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(goToNextImage, TIMEOUT);
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
