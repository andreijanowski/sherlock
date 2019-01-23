import { PureComponent, createRef } from "react";
import ReactCropper from "react-cropper";
import { Modal, Button } from "components";
import { Box } from "@rebass/grid";
import { string, func, number, boolean } from "prop-types";
import { CropperStyles, Wrapper } from "./styled";

class Cropper extends PureComponent {
  cropper = createRef();

  componentDidUpdate(prevProps) {
    const { src: prevSrc } = prevProps;
    const { src } = this.props;
    if (src !== prevSrc) {
      this.cropper.current.reset();
    }
  }

  handleCrop = () => {
    this.cropper.current.disable();
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
    this.cropper.current.enable();
  };

  render() {
    const { src, aspectRatio, isVisible, hide, accept, cancel } = this.props;
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
        </Wrapper>
      </Modal>
    );
  }
}

Cropper.propTypes = {
  src: string.isRequired,
  aspectRatio: number.isRequired,
  isVisible: boolean.isRequired,
  hide: func.isRequired,
  accept: string.isRequired,
  cancel: string.isRequired,
  maxWidth: number.isRequired,
  maxHeight: number.isRequired,
  onCrop: func.isRequired
};

export default Cropper;
