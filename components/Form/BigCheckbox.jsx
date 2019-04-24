import { PureComponent, createRef } from "react";
import { Field as FinalFormField } from "react-final-form";
import { string, shape, number } from "prop-types";
import { PerfectSquare, LoadingIndicator } from "components";
import { CheckboxLabel, Checkbox } from "./styled";
import { getError } from "./utils";

class BigCheckbox extends PureComponent {
  checkbox = createRef();

  handleChange = (e, input, checkedValues) => {
    const checkboxValue = JSON.parse(e.target.value);
    const isChecked = e.target.checked;
    const newValue = isChecked
      ? [...checkedValues, checkboxValue]
      : checkedValues.filter(v => v.value !== checkboxValue.value);
    Promise.all([input.onChange(newValue)]).then(() =>
      Promise.all([this.checkbox.current.focus()]).then(() =>
        this.checkbox.current.blur()
      )
    );
  };

  render() {
    const { label, name, value, max, min, ...rest } = this.props;

    return (
      <FinalFormField
        value={value}
        name={name}
        type="select-multiple"
        {...rest}
        render={({ input: { value: checkedValues, ...input }, meta }) => {
          const index =
            checkedValues &&
            checkedValues.findIndex(v => v.value === value.value);
          const error = getError(meta) && index >= max;
          const disabled = index !== -1 && checkedValues.length === min;
          return (
            <PerfectSquare width={1}>
              <CheckboxLabel checked={index !== -1} error={error}>
                <Checkbox
                  ref={this.checkbox}
                  {...input}
                  value={JSON.stringify(value)}
                  onChange={
                    disabled
                      ? undefined
                      : e => this.handleChange(e, input, checkedValues)
                  }
                  checked={index !== -1}
                />
                {label}
              </CheckboxLabel>
              {meta.data.saving && !meta.active && <LoadingIndicator />}
            </PerfectSquare>
          );
        }}
      />
    );
  }
}

BigCheckbox.propTypes = {
  name: string.isRequired,
  value: shape().isRequired,
  label: string.isRequired,
  max: number.isRequired,
  min: number.isRequired
};

export default BigCheckbox;
