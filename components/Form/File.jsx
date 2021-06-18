import { func, shape, string, arrayOf, bool } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { Flex, Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";

import { Dropzone } from "components";
import { bytesToKB } from "utils/misc";
import { FileWrapper, FileName, FileSize, FileDeleteIcon } from "./styled";

const FilePreview = ({ file, onDeleteClick }) => (
  <Flex justifyContent="space-between" alignItems="center" flexWrap="nowrap">
    <Flex flexWrap="nowrap" alignItems="center">
      <Box mr={3}>
        <FontAwesomeIcon size="3x" icon={faFile} />
      </Box>
      <Box>
        <FileName>{file.name}</FileName>
        <FileSize>{bytesToKB(file.size)} KB</FileSize>
      </Box>
    </Flex>
    <FileDeleteIcon onClick={onDeleteClick} />
  </Flex>
);

FilePreview.propTypes = {
  file: shape().isRequired,
  onDeleteClick: func.isRequired
};

const File = ({
  name,
  accept,
  tip,
  errorTipType,
  info,
  errorInfoType,
  restyled,
  validate
}) => (
  <FinalFormField
    name={name}
    validate={validate}
    render={({ input, meta: { valid, error } }) => {
      const fileName = input.value.name || input.value.url;
      const showFilePreview = valid && restyled && input.value;

      const onDeleteClick = () => {
        input.onChange(undefined);
      };

      const computedTip =
        !restyled && fileName
          ? `Menu: ${fileName.split("/").slice(-1)[0]}`
          : tip;

      const computedInfo = (restyled || !fileName) && info;

      return showFilePreview ? (
        <FilePreview file={input.value} onDeleteClick={onDeleteClick} />
      ) : (
        <FileWrapper restyled={restyled}>
          <Dropzone
            {...{
              accept,
              onDrop: f => input.onChange(f[0]),
              multiple: false,
              tip: computedTip,
              info: computedInfo,
              errorTipType,
              errorInfoType,
              customValidation: restyled && !!validate,
              validationError: error
            }}
          />
        </FileWrapper>
      );
    }}
  />
);

File.propTypes = {
  name: string.isRequired,
  accept: arrayOf(string).isRequired,
  tip: string.isRequired,
  errorTipType: string.isRequired,
  info: string.isRequired,
  errorInfoType: string.isRequired,
  restyled: bool,
  validate: func
};

File.defaultProps = {
  restyled: false,
  validate: undefined
};

export default File;
