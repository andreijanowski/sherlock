import React, { PureComponent } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Field as FinalFormField } from "react-final-form";
import { formatDate } from "react-day-picker/moment";
import onClickOutside from "react-onclickoutside";
import { shape, string, bool, func } from "prop-types";
import { ActionIcon } from "components";
import {
  DaypickerWrapper,
  Label,
  FieldWrapper,
  RawInput,
  Error,
  ActionIconWrapper
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

  clean = () => {
    const { input } = this.props;
    this.setState({
      selectedDate: undefined
    });
    input.onChange(undefined);
  };

  render() {
    const {
      input,
      label,
      placeholder,
      meta,
      isErrorVisibilityRequired,
      arePastDaysDisabled,
      withCleanButton
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
            padding={withCleanButton && "16px 60px 16px 16px"}
          />
          <Label>{label}</Label>
          {withCleanButton && (
            <ActionIconWrapper onClick={this.clean}>
              <ActionIcon size="sm" icon={["fa", "times"]} red />
            </ActionIconWrapper>
          )}
          {error && <Error>{error}</Error>}
          {isPickerOpen && (
            <DayPicker
              showOutsideDays
              disabledDays={
                arePastDaysDisabled ? [{ before: new Date() }] : undefined
              }
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
  isErrorVisibilityRequired: bool,
  arePastDaysDisabled: bool.isRequired,
  withCleanButton: bool.isRequired
};

RawFormDayPicker.defaultProps = {
  placeholder: null,
  isErrorVisibilityRequired: false
};

const EnhancedRawFormDayPicker = onClickOutside(RawFormDayPicker);

const FormDayPicker = ({
  name,
  label,
  placeholder,
  validate,
  arePastDaysDisabled,
  withCleanButton
}) => (
  <FinalFormField
    name={name}
    validate={validate}
    render={({ input, meta }) => (
      <EnhancedRawFormDayPicker
        {...{
          input,
          meta,
          label,
          placeholder,
          arePastDaysDisabled,
          withCleanButton
        }}
      />
    )}
  />
);

FormDayPicker.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  validate: func,
  placeholder: string,
  arePastDaysDisabled: bool,
  withCleanButton: bool
};

FormDayPicker.defaultProps = {
  placeholder: null,
  validate: undefined,
  arePastDaysDisabled: true,
  withCleanButton: false
};

export default FormDayPicker;
