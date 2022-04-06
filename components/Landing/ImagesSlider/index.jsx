import React, { useState, useRef, useEffect, useCallback } from "react";
import { arrayOf, bool, string, number, shape } from "prop-types";

import { VideoPreview } from "components/Landing";
import { getOptionPrefix } from "sections/landings/product/utils";
import { Bullet, Bullets, Container, Image } from "./styled";

const TIMEOUT = 5000;

const ImagesSlider = ({ images, hasBlueDots, activeOptionIndex, videos }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const videoData = videos && videos[getOptionPrefix(activeOptionIndex, index)];

  const goToNextImage = useCallback(() => {
    setIndex(currentIndex => {
      const nextIndex = currentIndex + 1;
      return nextIndex >= images.length ? 0 : nextIndex;
    });
    timeoutRef.current = setTimeout(goToNextImage, TIMEOUT);
  }, [images]);

  useEffect(() => {
    if (!videoData) {
      timeoutRef.current = setTimeout(goToNextImage, TIMEOUT);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [goToNextImage, videoData]);

  return (
    <Container>
      {videoData ? (
        <VideoPreview {...videoData} />
      ) : (
        <Image src={images[index]} />
      )}
      <Bullets>
        {images.map((imageSrc, imageIdx) => {
          const isActive = index === imageIdx;
          const onClick = () => {
            setIndex(imageIdx);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(goToNextImage, TIMEOUT);
          };
          return (
            <Bullet
              key={imageSrc}
              isActive={isActive}
              onClick={onClick}
              hasBlueDots={hasBlueDots}
            />
          );
        })}
      </Bullets>
    </Container>
  );
};

ImagesSlider.propTypes = {
  images: arrayOf(string).isRequired,
  hasBlueDots: bool.isRequired,
  videos: shape(),
  activeOptionIndex: number
};

ImagesSlider.defaultProps = {
  activeOptionIndex: null,
  videos: null
};

export default ImagesSlider;
