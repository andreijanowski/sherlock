import ReactDropzone from "react-dropzone";
import { LoadingIndicator } from "components";
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
  image,
  loading
}) => (
  <ReactDropzone {...{ accept, onDrop, multiple }}>
    {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
      <Wrapper
        {...getRootProps({ isDragActive, isDragReject, image, loading })}
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Input {...getInputProps()} />
            <Tip {...{ isDragReject }}>{isDragReject ? errorTip : tip}</Tip>
            <Info {...{ isDragReject }}>{isDragReject ? errorInfo : info}</Info>
          </>
        )}
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
  image: string,
  loading: bool
};

Dropzone.defaultProps = {
  image: null,
  loading: false
};

export default Dropzone;
