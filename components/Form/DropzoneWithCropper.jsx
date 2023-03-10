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
      errorTipType,
      errorTipMultiple,
      info,
      errorInfoType,
      errorInfoMultiple,
      multiple,
      crop,
      cancel,
      maxWidth,
      maxHeight,
      aspectRatio,
      image,
      isCircleShape
    } = this.props;
    const { filesForCropping, isAddingFile } = this.state;
    return (
      <>
        <Dropzone
          {...{
            accept: ["image/png", "image/jpeg"],
            onDrop: this.handleDrop,
            tip,
            errorTipType,
            errorTipMultiple,
            info,
            errorInfoType,
            errorInfoMultiple,
            multiple,
            image,
            isCircleShape,
            loading: isAddingFile
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
  errorTipType: string.isRequired,
  errorTipMultiple: string,
  info: string.isRequired,
  errorInfoType: string.isRequired,
  errorInfoMultiple: string,
  multiple: bool.isRequired,
  crop: string.isRequired,
  cancel: string.isRequired,
  maxWidth: number.isRequired,
  maxHeight: number.isRequired,
  aspectRatio: number,
  image: string,
  saveImage: func.isRequired,
  isCircleShape: bool
};

DropzoneWithCropper.defaultProps = {
  aspectRatio: undefined,
  image: null,
  isCircleShape: false,
  errorTipMultiple: "",
  errorInfoMultiple: ""
};

export default DropzoneWithCropper;
