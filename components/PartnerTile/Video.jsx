import React from "react";
import { string } from "prop-types";
import YouTube from "react-youtube";
import styled from "styled-components";
import { Flex } from "@rebass/grid";

const VideoContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 60vw;
  height: 60vh;
  min-height: 400px;
  & > div {
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${p => p.theme.breakpoints[0]}) {
    height: auto;
  }
`;

const extractVideoID = url => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length === 11) {
    return match[7];
  }
  return null;
};

const Video = ({ url }) => {
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
    <VideoContainer>
      <YouTube {...{ ...state }} />
    </VideoContainer>
  );
};

Video.propTypes = {
  url: string
};

Video.defaultProps = {
  url: ""
};

export default Video;
