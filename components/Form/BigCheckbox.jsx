import React, { PureComponent } from "react";
import { Field as FinalFormField } from "react-final-form";
import { string, func } from "prop-types";
import { PerfectSquare } from "components";
import { CheckboxLabel, Checkbox, CheckboxText } from "./styled";

class BigCheckbox extends PureComponent {
  handleChange = (e, input) => {
    Promise.all([input.onChange(e)]).then(() =>
      Promise.all([this.ref.focus()]).then(() => this.ref.blur())
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
          if (meta.touched) {
            setError(meta.error);
          }
          return (
            <PerfectSquare width={1}>
              <CheckboxLabel
                checked={checkedValues.includes(value)}
                error={
                  checkedValues.includes(value) && meta.touched && meta.error
                }
              >
                <Checkbox
                  ref={r => {
                    this.ref = r;
                  }}
                  {...input}
                  onChange={e => this.handleChange(e, input, meta)}
                  checked={checkedValues.includes(value)}
                />
                <CheckboxText>{label}</CheckboxText>
              </CheckboxLabel>
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
  value: string.isRequired,
  label: string.isRequired
};

export default BigCheckbox;
