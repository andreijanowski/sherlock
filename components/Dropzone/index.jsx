import ReactDropzone from "react-dropzone";
import { LoadingIndicator } from "components";
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
  image,
  loading
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
        <Wrapper
          {...getRootProps({ isDragActive, isDragReject, image, loading })}
        >
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Input {...getInputProps()} />
              <Tip {...{ isDragReject }}>{tipText}</Tip>
              <Info {...{ isDragReject }}>{infoText}</Info>
            </>
          )}
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
  image: string,
  loading: bool
};

Dropzone.defaultProps = {
  image: null,
  errorTipMultiple: "",
  errorInfoMultiple: "",
  loading: false
};

export default Dropzone;
