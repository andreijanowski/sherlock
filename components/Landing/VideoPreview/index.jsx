import React, { useCallback, useState } from "react";
import { string, number, arrayOf } from "prop-types";

import { Container, Image, Video } from "./styled";

const VideoPreview = ({ poster, src, width, height }) => {
  const [showVideo, setShowVideo] = useState(false);

  const onImgClick = useCallback(() => {
    setShowVideo(true);
  }, []);

  return (
    <Container>
      {showVideo ? (
        <Video
          width={width}
          height={height}
          mx="auto"
          src={`${src}?autoplay=1&mute=1`}
          frameBorder="0"
        />
      ) : (
        <Image
          width={width}
          mx="auto"
          src={poster}
          alt="Banner"
          onClick={onImgClick}
        />
      )}
    </Container>
  );
};

VideoPreview.propTypes = {
  poster: string.isRequired,
  src: string.isRequired,
  width: arrayOf(number).isRequired,
  height: arrayOf(number).isRequired
};

export default VideoPreview;
