import React, { PureComponent } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Field as FinalFormField } from "react-final-form";
import { formatDate } from "react-day-picker/moment";
import onClickOutside from "react-onclickoutside";
import { shape, string, bool, func } from "prop-types";
import {
  DaypickerWrapper,
  Label,
  FieldWrapper,
  RawInput,
  Error
} from "./styled";
import { getError } from "./utils";

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
    const {
      input,
      label,
      placeholder,
      meta,
      isErrorVisibilityRequired
    } = this.props;
    const { isPickerOpen, selectedDate } = this.state;
    const error = getError(meta, isErrorVisibilityRequired);
    return (
      <DaypickerWrapper>
        <FieldWrapper>
          <RawInput
            autoComplete="nope"
            invalid={error ? "true" : undefined}
            placeholder={placeholder}
            value={input.value}
            onFocus={this.handleFocus}
            readOnly
          />
          <Label>{label}</Label>
          {error && <Error>{error}</Error>}
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
  meta: shape().isRequired,
  label: string.isRequired,
  placeholder: string,
  isErrorVisibilityRequired: bool
};

RawFormDayPicker.defaultProps = {
  placeholder: null,
  isErrorVisibilityRequired: false
};

const EnhancedRawFormDayPicker = onClickOutside(RawFormDayPicker);

const FormDayPicker = ({ name, label, placeholder, validate }) => (
  <FinalFormField
    name={name}
    validate={validate}
    render={({ input, meta }) => (
      <EnhancedRawFormDayPicker {...{ input, meta, label, placeholder }} />
    )}
  />
);

FormDayPicker.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  validate: func,
  placeholder: string
};

FormDayPicker.defaultProps = {
  placeholder: null,
  validate: undefined
};

export default FormDayPicker;
