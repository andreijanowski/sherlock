import { string, bool, shape } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import TextareaAutosize from "react-autosize-textarea";
import { FieldWrapper, RawInput, Label, Error } from "./styled";
import { getError } from "./utils";

const TextareaField = ({
  label,
  name,
  placeholder,
  type,
  fieldProps,
  disabled,
  ...rest
}) => (
  <FinalFormField
    name={name}
    render={({ input, meta }) => {
      const error = getError(meta);
      return (
        <FieldWrapper>
          <RawInput
            as={TextareaAutosize}
            rows={6}
            smallLabel={!!input.value}
            invalid={error ? "true" : undefined}
            autoComplete="nope"
            type={type}
            disabled={!error && disabled}
            placeholder={placeholder}
            {...input}
            {...fieldProps}
          />
          <Label htmlFor={name} textarea>
            {label}
          </Label>
          {error && <Error>{error}</Error>}
        </FieldWrapper>
      );
    }}
    {...rest}
  />
);

TextareaField.propTypes = {
  name: string.isRequired,
  disabled: bool,
  fieldProps: shape(),
  label: string,
  placeholder: string,
  type: string
};
TextareaField.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  fieldProps: {},
  disabled: false
};

export default TextareaField;
