import { PureComponent } from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { func, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField, Button, PasswordStrengthMeter } from "components";
import { changePasswordByToken as changePasswordByTokenAction } from "actions/auth";
import { validatePassword, validatePasswordsMatch } from "utils/validators";
import { Box } from "@rebass/grid";
import { HelperTitle, Separator } from "./styled";

class ChangePasswordForm extends PureComponent {
  constructor(props) {
    super(props);
    this.validatePassword = validatePassword(props.t);
    this.validatePasswordsMatch = validatePasswordsMatch(props.t);
  }

  submitForm = async ({ password, passwordConfirmation }) => {
    try {
      const { changePasswordByToken, token } = this.props;
      await changePasswordByToken({
        password,
        passwordConfirmation,
        resetPasswordToken: token
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { t } = this.props;

    return (
      <Form
        onSubmit={this.submitForm}
        render={({ handleSubmit, pristine, invalid, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <HelperTitle>{t("newPaswordHelperTitle")}</HelperTitle>
            <InputField
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Something secure"
              validate={this.validatePassword}
            >
              <PasswordStrengthMeter password={values.password} />
            </InputField>
            <InputField
              name="passwordConfirmation"
              type="password"
              placeholder="Repeat Password"
              validate={this.validatePasswordsMatch}
            >
              <PasswordStrengthMeter password={values.passwordConfirmation} />
            </InputField>
            <Separator size={32} />
            <Box width={1}>
              <Button
                onClick={handleSubmit}
                styleName="blue"
                fluid
                disabled={invalid || pristine || submitting}
              >
                {submitting ? (
                  <FontAwesomeIcon icon="circle-notch" spin size="lg" />
                ) : (
                  t("changeButton")
                )}
              </Button>
            </Box>
          </form>
        )}
      />
    );
  }
}

ChangePasswordForm.propTypes = {
  changePasswordByToken: func.isRequired,
  t: func.isRequired,
  token: string.isRequired
};

export default connect(
  null,
  {
    changePasswordByToken: changePasswordByTokenAction
  }
)(ChangePasswordForm);
