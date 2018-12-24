import { string, node } from "prop-types";
import { Field } from "react-final-form";
import { InputContainer, Input, InputError } from "./styled";

const FormInput = ({
  children,
  name,
  placeholder,
  type,
  autoComplete,
  ...rest
}) => (
  <Field
    {...{ name, ...rest }}
    render={({ input, meta }) => {
      const valid = meta.valid && !meta.pristine;
      const invalid = meta.touched && meta.invalid;
      return (
        <InputContainer>
          <Input
            {...{
              placeholder,
              type,
              valid,
              error: invalid,
              autoComplete,
              ...input
            }}
          />
          {invalid && <InputError>{meta.error}</InputError>}
          {!invalid && children}
        </InputContainer>
      );
    }}
  />
);

FormInput.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  autoComplete: string,
  children: node,
  placeholder: string
};

FormInput.defaultProps = {
  autoComplete: "false",
  children: null,
  placeholder: null
};

export default FormInput;
