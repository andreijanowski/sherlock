import ReactDropzone from "react-dropzone";
import { arrayOf, string, bool, func } from "prop-types";
import { Wrapper, Input, Tip, Info } from "./styled";

const Dropzone = ({
  accept,
  onDrop,
  multiple,
  tip,
  errorTipType,
  errorTipMultiple,
  info,
  errorInfoType,
  errorInfoMultiple,
  image
}) => (
  <ReactDropzone {...{ accept, onDrop, multiple }}>
    {({
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      draggedFiles
    }) => {
      let tipText = tip;
      let infoText = info;
      if (isDragReject) {
        if (!multiple && draggedFiles.length > 1) {
          tipText = errorTipMultiple;
          infoText = errorInfoMultiple;
        } else {
          tipText = errorTipType;
          infoText = errorInfoType;
        }
      }
      return (
        <Wrapper {...getRootProps({ isDragActive, isDragReject, image })}>
          <Input {...getInputProps()} />
          <Tip {...{ isDragReject }}>{tipText}</Tip>
          <Info {...{ isDragReject }}>{infoText}</Info>
        </Wrapper>
      );
    }}
  </ReactDropzone>
);

Dropzone.propTypes = {
  accept: arrayOf(string).isRequired,
  onDrop: func.isRequired,
  multiple: bool.isRequired,
  tip: string.isRequired,
  errorTipType: string.isRequired,
  errorTipMultiple: string,
  info: string.isRequired,
  errorInfoType: string.isRequired,
  errorInfoMultiple: string,
  image: string
};

Dropzone.defaultProps = {
  image: null,
  errorTipMultiple: "",
  errorInfoMultiple: ""
};

export default Dropzone;
