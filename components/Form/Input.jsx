import { string, bool, shape } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { LoadingIndicator } from "components";
import { FieldWrapper, RawInput, Label, Error } from "./styled";
import { getError } from "./utils";

const InputField = ({
  label,
  name,
  placeholder,
  type,
  fieldProps,
  disabled,
  isErrorVisibilityRequired,
  ...rest
}) => (
  <FinalFormField
    name={name}
    type={type}
    render={({ input, meta }) => {
      const error = getError(meta, isErrorVisibilityRequired);
      return (
        <FieldWrapper>
          <RawInput
            invalid={error ? "true" : undefined}
            autoComplete="nope"
            disabled={!error && disabled}
            placeholder={placeholder}
            {...input}
            {...fieldProps}
          />
          <Label htmlFor={name}>{label}</Label>
          {error && <Error>{error}</Error>}
          {meta.data.saving && !meta.active && <LoadingIndicator />}
        </FieldWrapper>
      );
    }}
    {...rest}
  />
);

InputField.propTypes = {
  name: string.isRequired,
  disabled: bool,
  fieldProps: shape(),
  label: string,
  placeholder: string,
  type: string,
  isErrorVisibilityRequired: bool
};
InputField.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  fieldProps: {},
  disabled: false,
  isErrorVisibilityRequired: false
};

export default InputField;
