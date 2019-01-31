import { PureComponent } from "react";
import { Dropzone, Cropper } from "components";
import { string, bool, number, func } from "prop-types";

class DropzoneWithCropper extends PureComponent {
  state = {
    filesForCropping: []
  };

  handleDrop = files => {
    const filesForCropping = files.map(f => URL.createObjectURL(f));
    this.setState({ filesForCropping });
  };

  handleCropperHide = () =>
    this.setState(state => ({
      filesForCropping: state.filesForCropping.splice(1)
    }));

  handleCrop = image => {
    const { saveImage } = this.props;
    this.handleCropperHide();
    saveImage(image);
  };

  render() {
    const {
      tip,
      errorTip,
      info,
      errorInfo,
      multiple,
      crop,
      cancel,
      maxWidth,
      maxHeight,
      aspectRatio,
      image
    } = this.props;
    const { filesForCropping } = this.state;
    return (
      <>
        <Dropzone
          {...{
            accept: ["image/png", "image/jpeg"],
            onDrop: this.handleDrop,
            tip,
            errorTip,
            info,
            errorInfo,
            multiple,
            image
          }}
        />
        {filesForCropping.length > 0 && (
          <Cropper
            {...{
              maxWidth,
              maxHeight,
              crop,
              cancel,
              aspectRatio,
              isVisible: filesForCropping.length > 0,
              src: filesForCropping[0],
              hide: this.handleCropperHide,
              onCrop: this.handleCrop
            }}
          />
        )}
      </>
    );
  }
}

DropzoneWithCropper.propTypes = {
  tip: string.isRequired,
  errorTip: string.isRequired,
  info: string.isRequired,
  errorInfo: string.isRequired,
  multiple: bool.isRequired,
  crop: string.isRequired,
  cancel: string.isRequired,
  maxWidth: number.isRequired,
  maxHeight: number.isRequired,
  aspectRatio: number,
  image: string,
  saveImage: func.isRequired
};

DropzoneWithCropper.defaultProps = {
  aspectRatio: undefined,
  image: null
};

export default DropzoneWithCropper;
