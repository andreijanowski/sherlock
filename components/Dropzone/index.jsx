import ReactDropzone from "react-dropzone";
import { arrayOf, string, boolean, func } from "prop-types";
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
  multiple: boolean.isRequired,
  tip: string.isRequired,
  errorTip: string.isRequired,
  info: string.isRequired,
  errorInfo: string.isRequired,
  image: string.isRequired
};

export default Dropzone;
