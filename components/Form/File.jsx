import { string, arrayOf } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { Dropzone } from "components";
import { FileWrapper } from "./styled";

const File = ({ name, accept, tip, errorTipType, info, errorInfoType }) => (
  <FinalFormField
    name={name}
    render={({ input }) => {
      const fileName = input.value.name || input.value.url;
      return (
        <FileWrapper>
          <Dropzone
            {...{
              accept,
              onDrop: f => input.onChange(f[0]),
              multiple: false,
              tip: fileName ? `Menu: ${fileName.split("/").slice(-1)[0]}` : tip,
              info: !fileName && info,
              errorTipType,
              errorInfoType
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
  errorInfoType: string.isRequired
};

export default File;
