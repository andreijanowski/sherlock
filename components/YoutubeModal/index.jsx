import { PureComponent } from "react";
import { Modal } from "components";
import { func, string, bool } from "prop-types";
import YouTube from "react-youtube";
import { Wrapper } from "./styled";

class YoutubeModal extends PureComponent {
  state = {
    opts: null
  };

  componentDidMount() {
    this.setVideoSize();
    window.addEventListener("resize", this.setVideoSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setVideoSize);
  }

  setVideoSize = () => {
    const width = window.innerWidth - 128;
    this.setState({
      opts: { width, height: width / 2 }
    });
  };

  render() {
    const { videoId, close, isVisible } = this.props;
    const { opts } = this.state;
    return opts && isVisible ? (
      <Modal open onClose={close}>
        <Wrapper pt={4} {...opts}>
          <YouTube {...{ videoId, opts }} />
        </Wrapper>
      </Modal>
    ) : null;
  }
}

YoutubeModal.propTypes = {
  videoId: string.isRequired,
  close: func.isRequired,
  isVisible: bool.isRequired
};

export default YoutubeModal;
