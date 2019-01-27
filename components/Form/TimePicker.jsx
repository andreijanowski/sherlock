import { PureComponent, createRef } from "react";
import Timekeeper from "react-timekeeper";
import { Field as FinalFormField } from "react-final-form";
import onClickOutside from "react-onclickoutside";
import { shape, string, bool, func } from "prop-types";
import {
  FieldWrapper,
  RawInput,
  Label,
  Error,
  TimekeeperWrapper
} from "./styled";
import { getError, TimekeeperConfig } from "./utils";

class RawTimePicker extends PureComponent {
  state = {
    isTimekeeperVisible: false,
    top: 0
  };

  timekeeperRef = createRef();

  componentDidUpdate(_, { isTimekeeperVisible: wasTimekeeperVisible }) {
    const { isTimekeeperVisible } = this.state;
    if (!wasTimekeeperVisible && isTimekeeperVisible) {
      const height = window.innerHeight;
      const { bottom } = this.timekeeperRef.current.getBoundingClientRect();
      const diff = height - bottom;
      if (diff < 0) {
        this.setTop(diff);
      }
    }
  }

  setTop = top => this.setState({ top });

  handleFocus = () => {
    const { input } = this.props;
    input.onFocus();
    this.setState({
      isTimekeeperVisible: true
    });
  };

  handleChange = time => {
    const { input } = this.props;
    input.onChange(time);
  };

  handleClickOutside = () => {
    const { input, meta, handleBlur } = this.props;
    if (meta.active) {
      if (handleBlur) {
        handleBlur(input.value);
      }
      input.onBlur();
      this.setState({
        isTimekeeperVisible: false,
        top: 0
      });
    }
  };

  render() {
    const {
      input,
      meta,
      name,
      disabled,
      placeholder,
      label,
      ...fieldProps
    } = this.props;
    const { isTimekeeperVisible, top } = this.state;
    const error = getError(meta);

    return (
      <FieldWrapper>
        <RawInput
          invalid={error ? "true" : undefined}
          autoComplete="nope"
          disabled={!error && disabled}
          placeholder={placeholder}
          value={input.value && input.value.formatted}
          onFocus={this.handleFocus}
          onBlur={!isTimekeeperVisible ? input.onBlur : undefined}
          readOnly
          {...fieldProps}
        />
        <Label htmlFor={name}>{label}</Label>
        {error && <Error>{error}</Error>}
        {isTimekeeperVisible && (
          <TimekeeperWrapper ref={this.timekeeperRef} top={top}>
            <Timekeeper
              time={input.value && input.value.formatted}
              switchToMinuteOnHourSelect
              onChange={time => this.handleChange(time)}
              config={TimekeeperConfig}
            />
          </TimekeeperWrapper>
        )}
      </FieldWrapper>
    );
  }
}

RawTimePicker.propTypes = {
  input: shape().isRequired,
  meta: shape().isRequired,
  name: string.isRequired,
  disabled: bool,
  placeholder: string.isRequired,
  label: string.isRequired,
  handleBlur: func
};

RawTimePicker.defaultProps = {
  disabled: false,
  handleBlur: undefined
};

const EnhancedRawTimePicker = onClickOutside(RawTimePicker);

const TimePicker = ({ name, ...rest }) => (
  <FinalFormField
    name={name}
    render={({ input, meta }) => (
      <EnhancedRawTimePicker {...{ name, input, meta, ...rest }} />
    )}
  />
);

TimePicker.propTypes = {
  name: string.isRequired
};

export default TimePicker;
