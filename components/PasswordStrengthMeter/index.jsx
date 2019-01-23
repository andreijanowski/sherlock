import {
  PasswordStrengthMeterWrapper,
  MeterBackground,
  MeterProgress
} from "./styled";

const PasswordStrengthMeter = password => {
  const validPassword = password.password || "";
  const calculatePasswordStrength = value => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/;
    const mediumPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;

    if (value.length === 0)
      return {
        score: "0, 100",
        value: ""
      };

    if (strongPassword.test(value))
      return {
        score: "100, 100",
        value: "strong"
      };

    if (mediumPassword.test(value))
      return {
        score: "40, 100",
        value: "medium"
      };

    return {
      score: "15, 100",
      value: "week"
    };
  };
  return (
    <PasswordStrengthMeterWrapper
      isEmpty={validPassword.length === 0}
      strength={calculatePasswordStrength(validPassword).value}
    >
      <svg viewBox="0 0 36 36">
        <MeterBackground />
        <MeterProgress
          strokeDasharray={calculatePasswordStrength(validPassword).score}
        />
      </svg>
    </PasswordStrengthMeterWrapper>
  );
};

export default PasswordStrengthMeter;
