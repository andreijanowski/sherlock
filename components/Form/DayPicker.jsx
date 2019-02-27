import React, { PureComponent } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Field as FinalFormField } from "react-final-form";
import { formatDate } from "react-day-picker/moment";
import onClickOutside from "react-onclickoutside";
import { shape, string } from "prop-types";
import { DaypickerWrapper, Label, FieldWrapper, RawInput } from "./styled";

class RawFormDayPicker extends PureComponent {
  state = {
    isPickerOpen: false,
    selectedDate: undefined
  };

  handleFocus = () => {
    const { input } = this.props;
    input.onFocus();
    this.setState({ isPickerOpen: true });
  };

  handleClickOutside = () => {
    const { input } = this.props;
    input.onBlur();
    this.setState({ isPickerOpen: false });
  };

  handleDayChange = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    const { input } = this.props;
    this.setState({
      selectedDate: day
    });
    input.onChange(formatDate(day, "YYYY-MM-DD"));
  };

  render() {
    const { input, label, placeholder } = this.props;
    const { isPickerOpen, selectedDate } = this.state;
    return (
      <DaypickerWrapper>
        <FieldWrapper>
          <RawInput
            autoComplete="nope"
            placeholder={placeholder}
            value={input.value}
            onFocus={this.handleFocus}
            readOnly
          />
          <Label>{label}</Label>
          {isPickerOpen && (
            <DayPicker
              showOutsideDays
              disabledDays={[{ before: new Date() }]}
              selectedDays={selectedDate}
              onDayClick={this.handleDayChange}
            />
          )}
        </FieldWrapper>
      </DaypickerWrapper>
    );
  }
}

RawFormDayPicker.propTypes = {
  input: shape().isRequired,
  label: string.isRequired,
  placeholder: string
};

RawFormDayPicker.defaultProps = {
  placeholder: null
};

const EnhancedRawFormDayPicker = onClickOutside(RawFormDayPicker);

const FormDayPicker = ({ name, label, placeholder }) => (
  <FinalFormField
    name={name}
    render={({ input, meta }) => (
      <EnhancedRawFormDayPicker {...{ input, meta, label, placeholder }} />
    )}
  />
);

FormDayPicker.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  placeholder: string
};

FormDayPicker.defaultProps = {
  placeholder: null
};

export default FormDayPicker;
