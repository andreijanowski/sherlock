import { string, shape } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { getError } from "./utils";
import { FieldWrapper, Error, Checkmark, HiddenCheckboxInput } from "./styled";

export const RawCheckbox = ({ input, error, label }) => (
  <FieldWrapper as="label">
    <HiddenCheckboxInput {...input} />
    <Checkmark isChecked={input.value} invalid={error ? "true" : undefined}>
      {input.value && <Icon icon={["fa", "check"]} />}
    </Checkmark>
    {label}
    {error && <Error>{error}</Error>}
  </FieldWrapper>
);

RawCheckbox.propTypes = {
  label: string.isRequired,
  input: shape().isRequired,
  error: string
};

RawCheckbox.defaultProps = {
  error: ""
};

const Checkbox = ({ name, label }) => (
  <FinalFormField
    name={name}
    type="checkbox"
    render={({ input, meta }) => {
      const error = getError(meta);
      return <RawCheckbox {...{ input, error, label }} />;
    }}
  />
);

Checkbox.propTypes = {
  label: string.isRequired,
  name: string.isRequired
};

export default Checkbox;
