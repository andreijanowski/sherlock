import React, { useState, useCallback } from "react";

import { HOW_IT_WORKS_VIDEO_URL } from "consts";
import { Container, Image, Video } from "./styled";

const WIDTH = ["100%", null, null, 1033];

const VideoPreview = () => {
  const [showVideo, setShowVideo] = useState(false);

  const onImgClick = useCallback(() => {
    setShowVideo(true);
  }, []);

  return (
    <Container>
      {showVideo ? (
        <Video
          width={WIDTH}
          height="576"
          mx="auto"
          src={`${HOW_IT_WORKS_VIDEO_URL}?autoplay=1&mute=1`}
          frameBorder="0"
        />
      ) : (
        <Image
          width={WIDTH}
          mx="auto"
          src="/static/img/howItWorks/videoBanner.png"
          alt="Banner"
          onClick={onImgClick}
        />
      )}
    </Container>
  );
};

export default VideoPreview;
