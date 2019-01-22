import { string, node } from "prop-types";
import { Field } from "react-final-form";
import { RadioButtonContainer, RadioButton, RadioButtonLabel } from "./styled";

const RadioButtonField = ({ children, value, name, ...rest }) => (
  <Field
    type="radio"
    {...{ name, value, ...rest }}
    render={({ input }) => (
      <RadioButtonContainer>
        <RadioButton type="radio" {...input} />
        <RadioButtonLabel>{children}</RadioButtonLabel>
      </RadioButtonContainer>
    )}
  />
);

RadioButtonField.propTypes = {
  value: string.isRequired,
  name: string.isRequired,
  children: node.isRequired
};

export default RadioButtonField;
