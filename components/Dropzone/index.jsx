import ReactDropzone from "react-dropzone";
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

export default Dropzone;
