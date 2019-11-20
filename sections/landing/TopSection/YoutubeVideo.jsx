import { PureComponent } from "react";
import { func, string, bool } from "prop-types";
import YouTube from "react-youtube";

class YoutubeVideo extends PureComponent {
  state = {
    opts: {
      width: "100%",
      playerVars: {
        autoplay: 1
      }
    },
    videoId: "6jcUTbGqSYw"
  };

  render() {
    return <YouTube {...{ ...this.state }} />;
  }
}

YoutubeVideo.propTypes = {
  videoId: string.isRequired,
  close: func.isRequired,
  isVisible: bool.isRequired
};

export default YoutubeVideo;
