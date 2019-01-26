import { PureComponent, createRef } from "react";
import { string, shape } from "prop-types";
import { Field as FinalFormField } from "react-final-form";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { LoadingIndicator } from "components";
import { getError } from "./utils";
import { FieldWrapper, Error, Checkmark, HiddenCheckboxInput } from "./styled";

export class RawCheckbox extends PureComponent {
  checkbox = createRef();

  handleChange = (e, input) => {
    Promise.all([input.onChange(e)]).then(() =>
      Promise.all([this.checkbox.current.focus()]).then(() =>
        this.checkbox.current.blur()
      )
    );
  };

  render() {
    const { input, meta, error, label } = this.props;
    return (
      <FieldWrapper as="label">
        <HiddenCheckboxInput
          {...{
            ...input,
            ref: this.checkbox,
            onChange: e => this.handleChange(e, input)
          }}
        />
        <Checkmark isChecked={input.value} invalid={error ? "true" : undefined}>
          {input.value && <Icon icon={["fa", "check"]} />}
        </Checkmark>
        {label}
        {error && <Error>{error}</Error>}
        {meta && meta.data.saving && !meta.active && <LoadingIndicator />}
      </FieldWrapper>
    );
  }
}

RawCheckbox.propTypes = {
  label: string.isRequired,
  input: shape().isRequired,
  meta: shape(),
  error: string
};

RawCheckbox.defaultProps = {
  error: "",
  meta: null
};

const Checkbox = ({ name, label }) => (
  <FinalFormField
    name={name}
    type="checkbox"
    render={({ input, meta }) => {
      const error = getError(meta);
      return <RawCheckbox {...{ input, meta, error, label }} />;
    }}
  />
);

Checkbox.propTypes = {
  label: string.isRequired,
  name: string.isRequired
};

export default Checkbox;
