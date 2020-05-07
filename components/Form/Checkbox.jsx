import { useRef } from "react";
import { string, shape, bool } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { LoadingIndicator } from "components";
import { Flex, Box } from "@rebass/grid";
import { getError } from "./utils";
import {
  FieldWrapper,
  Error,
  Checkmark,
  HiddenCheckboxInput,
  CheckboxText
} from "./styled";

export const RawCheckbox = ({
  input,
  meta,
  error,
  label,
  hasCloserText,
  disabled
}) => {
  const checkbox = useRef();

  const handleChange = e => {
    Promise.all([input.onChange(e)]).then(() =>
      Promise.all([checkbox.current.focus()]).then(() =>
        checkbox.current.blur()
      )
    );
  };

  return (
    <Flex>
      <Box>
        <FieldWrapper as="label">
          <HiddenCheckboxInput
            {...input}
            ref={checkbox}
            onChange={disabled ? null : e => handleChange(e)}
            disabled={disabled}
          />
          <Checkmark
            isChecked={input.value}
            invalid={error ? "true" : undefined}
            hasCloserText={hasCloserText}
            disabled={disabled}
          >
            {input.value && <Icon icon={["fa", "check"]} />}
          </Checkmark>
          <CheckboxText hasCloserText={hasCloserText}>{label}</CheckboxText>
          {error && <Error>{error}</Error>}
          {meta && meta.data.saving && !meta.active && <LoadingIndicator />}
        </FieldWrapper>
      </Box>
    </Flex>
  );
};

RawCheckbox.propTypes = {
  label: string.isRequired,
  input: shape().isRequired,
  meta: shape(),
  error: string,
  hasCloserText: bool,
  disabled: bool
};

RawCheckbox.defaultProps = {
  error: "",
  meta: null,
  hasCloserText: false,
  disabled: false
};

const Checkbox = ({ name, label, disabled }) => (
  <FinalFormField
    name={name}
    type="checkbox"
    render={({ input, meta }) => {
      const error = getError(meta);

      return (
        <RawCheckbox
          input={input}
          meta={meta}
          error={error}
          label={label}
          disabled={disabled}
        />
      );
    }}
  />
);

Checkbox.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  disabled: bool
};

Checkbox.defaultProps = {
  disabled: false
};

export default Checkbox;
