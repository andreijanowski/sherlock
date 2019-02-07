import { PureComponent, createRef } from "react";
import ReactCropper from "react-cropper";
import { Modal, Button, LoadingIndicator } from "components";
import { Box, Flex } from "@rebass/grid";
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

  handleCrop = () => {
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
    const { src, aspectRatio, isVisible, hide, crop, cancel } = this.props;
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
          <Flex pt={4} mx={-2}>
            <Box width={1 / 2} px={2}>
              <Button styleName="blue" onClick={hide} width="100%">
                {cancel}
              </Button>
            </Box>
            <Box width={1 / 2} px={2}>
              <Button styleName="blue" onClick={this.handleCrop} width="100%">
                {crop}
              </Button>
            </Box>
          </Flex>
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
  crop: string.isRequired,
  cancel: string.isRequired,
  maxWidth: number.isRequired,
  maxHeight: number.isRequired,
  onCrop: func.isRequired
};

Cropper.defaultProps = { aspectRatio: undefined };

export default Cropper;
