import { string, bool, shape } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { LoadingIndicator } from "components";
import { FieldWrapper, RawInput, Label, Error, LoadingWrapper } from "./styled";
import { getError } from "./utils";

const InputField = ({
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
            invalid={error ? "true" : undefined}
            autoComplete="nope"
            type={type}
            disabled={!error && disabled}
            placeholder={placeholder}
            {...input}
            {...fieldProps}
          />
          <Label htmlFor={name}>{label}</Label>
          {error && <Error>{error}</Error>}
          {meta.data.saving && !meta.active && (
            <LoadingWrapper>
              <LoadingIndicator />
            </LoadingWrapper>
          )}
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
  type: string
};
InputField.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  fieldProps: {},
  disabled: false
};

export default InputField;
