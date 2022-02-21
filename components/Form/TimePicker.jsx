import React from "react";
import { Field as FinalFormField } from "react-final-form";
import { func, string, bool } from "prop-types";

import { LoadingIndicator } from "components";
import { composeValidators, validateTimeString } from "utils/validators";
import { useT } from "utils/hooks";
import { Error, FieldWrapper, Label, RawInput } from "./styled";
import { formatTimeNumber, getError, parseTimeString } from "./utils";

const TimePicker = ({
  name,
  validate,
  label,
  placeholder,
  disabled,
  isErrorVisibilityRequired,
  ...rest
}) => {
  const t = useT();

  return (
    <FinalFormField
      name={name}
      validate={
        validate
          ? composeValidators(validateTimeString(t), validate)
          : validateTimeString(t)
      }
      parse={parseTimeString}
      format={formatTimeNumber}
      render={({ input, meta }) => {
        const error = getError(meta, isErrorVisibilityRequired);
        return (
          <FieldWrapper {...rest}>
            <RawInput
              {...input}
              disabled={!error && disabled}
              invalid={error ? "true" : undefined}
              autoComplete="nope"
              placeholder={placeholder}
            />
            <Label htmlFor={name}>{label}</Label>
            {error && <Error>{error}</Error>}
            {meta.data.saving && !meta.active && <LoadingIndicator />}
          </FieldWrapper>
        );
      }}
    />
  );
};

TimePicker.propTypes = {
  name: string.isRequired,
  validate: func,
  disabled: bool,
  isErrorVisibilityRequired: bool,
  placeholder: string.isRequired,
  label: string.isRequired
};

TimePicker.defaultProps = {
  validate: undefined,
  disabled: false,
  isErrorVisibilityRequired: false
};

export default TimePicker;
