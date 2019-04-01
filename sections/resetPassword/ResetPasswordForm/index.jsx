import { PureComponent } from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField, Button } from "components";
import { resetPassword as resetPasswordAction } from "actions/auth";
import { validateEmail, required } from "utils/validators";

class ResetPasswordForm extends PureComponent {
  constructor(props) {
    super(props);
    this.validateEmail = validateEmail(props.t);
    this.validatePassword = required(props.t);
  }

  submitForm = async values => {
    try {
      const { resetPassword } = this.props;
      await resetPassword(values);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { t } = this.props;
    return (
      <Form
        onSubmit={this.submitForm}
        render={({ handleSubmit, pristine, invalid, submitting }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              name="email"
              type="email"
              placeholder={t("emailToReset")}
              validate={this.validateEmail}
            />
            <Button
              onClick={handleSubmit}
              styleName="navyBlue"
              disabled={invalid || pristine || submitting}
            >
              {submitting ? (
                <FontAwesomeIcon icon="circle-notch" spin size="lg" />
              ) : (
                t("resetButton")
              )}
            </Button>
          </form>
        )}
      />
    );
  }
}

ResetPasswordForm.propTypes = {
  resetPassword: func.isRequired,
  t: func.isRequired
};

export default connect(
  null,
  {
    resetPassword: resetPasswordAction
  }
)(ResetPasswordForm);
