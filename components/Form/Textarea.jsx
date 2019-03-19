import { string, bool, shape, number } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { LoadingIndicator } from "components";
import { FieldWrapper, RawTextarea, Label, Error } from "./styled";
import { getError } from "./utils";

const TextareaField = ({
  label,
  name,
  placeholder,
  type,
  fieldProps,
  disabled,
  rows,
  ...rest
}) => (
  <FinalFormField
    name={name}
    render={({ input, meta }) => {
      const error = getError(meta);
      return (
        <FieldWrapper>
          <RawTextarea
            rows={rows}
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
          {meta.data.saving && !meta.active && <LoadingIndicator />}
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
  type: string,
  rows: number
};
TextareaField.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  fieldProps: {},
  disabled: false,
  rows: 6
};

export default TextareaField;
