import { PureComponent } from "react";
import { Dropzone, Cropper } from "components";
import { string, bool, number, func } from "prop-types";

class DropzoneWithCropper extends PureComponent {
  state = {
    filesForCropping: [],
    isAddingFile: false
  };

  handleDrop = files => {
    const filesForCropping = files.map(f => URL.createObjectURL(f));
    this.setState({ filesForCropping });
  };

  handleCropperHide = () =>
    this.setState(state => ({
      filesForCropping: state.filesForCropping.splice(1)
    }));

  handleCrop = async image => {
    const { saveImage } = this.props;
    this.handleCropperHide();
    this.setState({ isAddingFile: true });
    await saveImage(image);
    this.setState({ isAddingFile: false });
  };

  render() {
    const {
      tip,
      errorTip,
      info,
      errorInfo,
      multiple,
      accept,
      cancel,
      maxWidth,
      maxHeight,
      aspectRatio,
      image
    } = this.props;
    const { filesForCropping, isAddingFile } = this.state;
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
            image,
            loading: isAddingFile
          }}
        />
        {filesForCropping.length > 0 && (
          <Cropper
            {...{
              maxWidth,
              maxHeight,
              accept,
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
  accept: string.isRequired,
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
