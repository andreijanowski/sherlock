import { PureComponent, createRef } from "react";
import { Field as FinalFormField } from "react-final-form";
import { string, func, shape } from "prop-types";
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
    const { label, name, value, setError, ...rest } = this.props;

    return (
      <FinalFormField
        value={value}
        name={name}
        type="select-multiple"
        {...rest}
        render={({ input: { value: checkedValues, ...input }, meta }) => {
          const error = getError(meta);
          if (meta.touched) {
            setError(error);
          }
          const isChecked =
            checkedValues && checkedValues.some(v => v.value === value.value);
          return (
            <PerfectSquare width={1}>
              <CheckboxLabel checked={isChecked} error={error}>
                <Checkbox
                  ref={this.checkbox}
                  {...input}
                  value={JSON.stringify(value)}
                  onChange={e => this.handleChange(e, input, checkedValues)}
                  checked={isChecked}
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
  setError: func.isRequired,
  value: shape().isRequired,
  label: string.isRequired
};

export default BigCheckbox;
