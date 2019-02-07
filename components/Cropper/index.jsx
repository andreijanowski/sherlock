import { PureComponent, createRef } from "react";
import ReactCropper from "react-cropper";
import { Modal, Button, LoadingIndicator } from "components";
import { Box } from "@rebass/grid";
import { string, func, number, bool } from "prop-types";
import { CropperStyles, Wrapper } from "./styled";

class Cropper extends PureComponent {
  cropper = createRef();

  state = { cropping: false };

  componentDidUpdate(prevProps) {
    const { src: prevSrc } = prevProps;
    const { src } = this.props;
    if (src !== prevSrc) {
      this.cropper.current.reset();
    }
  }

  handleCrop = async () => {
    // without setTimeout function LoadingIndicator is not displayed ¯\_(ツ)_/¯
    this.setState({ cropping: true }, () => setTimeout(this.crop, 0));
  };

  crop = () => {
    const { maxWidth, maxHeight, onCrop } = this.props;
    const { width, height } = this.cropper.current.getCroppedCanvas();
    let computedWidth = width;
    let computedHeight = height;

    if (width > maxWidth || height > maxHeight) {
      const scale = width > height ? maxWidth / width : maxHeight / height;
      computedWidth = Math.floor(width * scale);
      computedHeight = Math.floor(height * scale);
    }

    const croppedImage = this.cropper.current
      .getCroppedCanvas({
        width: computedWidth,
        height: computedHeight
      })
      .toDataURL("image/jpeg", 0.7);
    onCrop(croppedImage);

    if (this.cropper.current) {
      this.setState({ cropping: false });
    }
  };

  render() {
    const { src, aspectRatio, isVisible, hide, accept, cancel } = this.props;
    const { cropping } = this.state;
    return (
      <Modal {...{ open: isVisible, onClose: hide }}>
        <Wrapper>
          <CropperStyles />
          <ReactCropper
            {...{
              ref: this.cropper,
              src,
              aspectRatio,
              responsive: true,
              style: { height: "calc(100% - 72px)", width: "100%" }
            }}
          />
          <Box pt={4}>
            <Button styleName="blue" onClick={this.handleCrop}>
              {accept}
            </Button>
            <Button styleName="blue" onClick={hide}>
              {cancel}
            </Button>
          </Box>
          {cropping && <LoadingIndicator />}
        </Wrapper>
      </Modal>
    );
  }
}

Cropper.propTypes = {
  src: string.isRequired,
  aspectRatio: number,
  isVisible: bool.isRequired,
  hide: func.isRequired,
  accept: string.isRequired,
  cancel: string.isRequired,
  maxWidth: number.isRequired,
  maxHeight: number.isRequired,
  onCrop: func.isRequired
};

Cropper.defaultProps = { aspectRatio: undefined };

export default Cropper;
