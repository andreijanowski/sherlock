import React, { useCallback, useState } from "react";
import { string, number, arrayOf } from "prop-types";

import { Container, Image, Video } from "./styled";

const LOCAL_STATIC_PATH = "/static/";

const VideoPreview = ({ poster, src, width, height, borderRadius }) => {
  const [showVideo, setShowVideo] = useState(false);

  const onImgClick = useCallback(() => {
    setShowVideo(true);
  }, []);

  return (
    <Container>
      {showVideo ? (
        <Video
          {...(src.startsWith(LOCAL_STATIC_PATH)
            ? {
                as: "video",
                controls: true,
                autoPlay: true,
                muted: true,
                src
              }
            : {
                as: "iframe",
                src: `${src}?autoplay=1&mute=1`,
                frameBorder: 0
              })}
          width={width}
          height={height}
          borderRadius={borderRadius}
          mx="auto"
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
  height: arrayOf(number).isRequired,
  borderRadius: number
};

VideoPreview.defaultProps = {
  borderRadius: 0
};

export default VideoPreview;
