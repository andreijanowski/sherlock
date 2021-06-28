import ReactDropzone from "react-dropzone";
import { Box } from "@rebass/grid";
import { arrayOf, string, bool, func } from "prop-types";

import { LoadingIndicator } from "components";
import { CircleWarningIcon } from "icons";
import { Wrapper, Input, Tip, Info, ValidationError } from "./styled";

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
  loading,
  isCircleShape,
  customValidation,
  validationError
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

      const isDragRejectValidated = customValidation ? false : isDragReject;

      if (isDragRejectValidated) {
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
          {...getRootProps({
            isDragActive,
            isDragReject: isDragRejectValidated,
            image,
            loading,
            isCircleShape
          })}
        >
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Input {...getInputProps()} />
              <Tip {...{ isDragReject: isDragRejectValidated }}>{tipText}</Tip>
              <Info {...{ isDragReject: isDragRejectValidated }}>
                {infoText}
              </Info>
              {customValidation && validationError && (
                <ValidationError>
                  <Box mr={1}>
                    <CircleWarningIcon />
                  </Box>
                  {validationError}
                </ValidationError>
              )}
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
  info: string.isRequired,
  errorTipType: string.isRequired,
  errorTipMultiple: string,
  errorInfoType: string.isRequired,
  errorInfoMultiple: string,
  image: string,
  isCircleShape: bool,
  loading: bool,
  customValidation: bool,
  validationError: string
};

Dropzone.defaultProps = {
  image: null,
  isCircleShape: false,
  errorTipMultiple: "",
  errorInfoMultiple: "",
  loading: false,
  customValidation: false,
  validationError: null
};

export default Dropzone;
