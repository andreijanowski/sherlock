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
  videoId: string,
  close: func,
  isVisible: bool
};

YoutubeVideo.defaultProps = {
  videoId: "",
  close: () => null,
  isVisible: false
};

export default YoutubeVideo;
