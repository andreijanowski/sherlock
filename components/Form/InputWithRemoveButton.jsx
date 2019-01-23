import { string, bool, shape } from "prop-types";
import { ActionIcon } from "components";
import { FieldWrapper, RawInput, Label, ActionIconWrapper } from "./styled";

const InputWithRemoveButton = ({
  label,
  name,
  placeholder,
  type,
  fieldProps,
  disabled,
  input
}) => (
  <FieldWrapper>
    <RawInput
      autoComplete="nope"
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      {...input}
      {...fieldProps}
      padding="16px 60px 16px 16px"
    />
    <Label htmlFor={name}>{label}</Label>
    <ActionIconWrapper>
      <ActionIcon size="sm" icon={["fa", "minus"]} red />
    </ActionIconWrapper>
  </FieldWrapper>
);

InputWithRemoveButton.propTypes = {
  name: string.isRequired,
  disabled: bool,
  fieldProps: shape(),
  label: string,
  placeholder: string,
  type: string
};
InputWithRemoveButton.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  fieldProps: {},
  disabled: false
};

export default InputWithRemoveButton;
