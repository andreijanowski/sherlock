import React from "react";
import { string } from "prop-types";
import YouTube from "react-youtube";

import { Container } from "./styled";

const extractVideoID = url => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length === 11) {
    return match[7];
  }
  return null;
};

const YoutubeVideo = ({ url }) => {
  const state = {
    opts: {
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1
      }
    },
    videoId: extractVideoID(url)
  };

  return (
    <Container>
      <YouTube {...{ ...state }} />
    </Container>
  );
};

YoutubeVideo.propTypes = {
  url: string
};

YoutubeVideo.defaultProps = {
  url: ""
};

export default YoutubeVideo;
