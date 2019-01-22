import { string, node } from "prop-types";
import { Field } from "react-final-form";
import { CheckboxContainer, Checkmark, Checkbox, InputError } from "./styled";

const CheckboxField = ({ children, name, ...rest }) => (
  <Field
    type="checkbox"
    {...{ name, ...rest }}
    render={({ input, meta }) => {
      const invalid = meta.touched && meta.invalid;
      return (
        <CheckboxContainer>
          {children}
          <Checkbox
            {...{
              ...input
            }}
          />
          <Checkmark error={invalid} />
          {invalid && <InputError>{meta.error}</InputError>}
        </CheckboxContainer>
      );
    }}
  />
);

CheckboxField.propTypes = {
  name: string.isRequired,
  children: node.isRequired
};

export default CheckboxField;
