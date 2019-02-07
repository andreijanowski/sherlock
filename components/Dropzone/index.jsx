import ReactDropzone from "react-dropzone";
import { arrayOf, string, bool, func } from "prop-types";
import { Wrapper, Input, Tip, Info } from "./styled";

const Dropzone = ({
  accept,
  onDrop,
  multiple,
  tip,
  errorTip,
  info,
  errorInfo,
  image
}) => (
  <ReactDropzone {...{ accept, onDrop, multiple }}>
    {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
      <Wrapper {...getRootProps({ isDragActive, isDragReject, image })}>
        <Input {...getInputProps()} />
        <Tip {...{ isDragReject }}>{isDragReject ? errorTip : tip}</Tip>
        <Info {...{ isDragReject }}>{isDragReject ? errorInfo : info}</Info>
      </Wrapper>
    )}
  </ReactDropzone>
);

Dropzone.propTypes = {
  accept: arrayOf(string).isRequired,
  onDrop: func.isRequired,
  multiple: bool.isRequired,
  tip: string.isRequired,
  errorTip: string.isRequired,
  info: string.isRequired,
  errorInfo: string.isRequired,
  image: string
};

Dropzone.defaultProps = {
  image: null
};

export default Dropzone;
