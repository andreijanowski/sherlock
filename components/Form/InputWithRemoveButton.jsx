import { string, bool, shape, func } from "prop-types";
import { ActionIcon, LoadingIndicator } from "components";
import { FieldWrapper, RawInput, Label, ActionIconWrapper } from "./styled";

const InputWithRemoveButton = ({
  label,
  name,
  placeholder,
  type,
  fieldProps,
  disabled,
  input,
  remove,
  saving
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
    <ActionIconWrapper onClick={remove}>
      <ActionIcon size="sm" icon={["fa", "minus"]} red />
    </ActionIconWrapper>
    {saving && <LoadingIndicator />}
  </FieldWrapper>
);

InputWithRemoveButton.propTypes = {
  name: string.isRequired,
  disabled: bool,
  fieldProps: shape(),
  label: string,
  placeholder: string,
  type: string,
  input: shape().isRequired,
  remove: func.isRequired,
  saving: bool.isRequired
};
InputWithRemoveButton.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  fieldProps: {},
  disabled: false
};

export default InputWithRemoveButton;
