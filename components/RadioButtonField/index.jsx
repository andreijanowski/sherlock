import { string, node, bool } from "prop-types";
import { Field } from "react-final-form";
import {
  RadioButtonContainer,
  RadioButton,
  CircleRadioButtonLabel,
  RectangleRadioButtonLabel
} from "./styled";

const RadioButtonField = ({ children, value, name, isCircle, ...rest }) => {
  const LabelContainer = isCircle
    ? CircleRadioButtonLabel
    : RectangleRadioButtonLabel;
  return (
    <Field
      type="radio"
      {...{ name, value, ...rest }}
      render={({ input }) => (
        <RadioButtonContainer>
          <RadioButton type="radio" {...input} />
          <LabelContainer>{children}</LabelContainer>
        </RadioButtonContainer>
      )}
    />
  );
};

RadioButtonField.propTypes = {
  value: string.isRequired,
  name: string.isRequired,
  children: node.isRequired,
  isCircle: bool
};

RadioButtonField.defaultProps = {
  isCircle: false
};

export default RadioButtonField;
