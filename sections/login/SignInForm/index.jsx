import { PureComponent } from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField, Button, FacebookLogin } from "components";
import { login } from "actions/auth";
import { validateEmail, required } from "utils/validators";
import { FormContainer, Separator } from "./styled";

class SignInForm extends PureComponent {
  constructor(props) {
    super(props);
    this.validateEmail = validateEmail(props.t);
    this.validatePassword = required(props.t);
  }

  submitForm = async values => {
    try {
      const { loginUser } = this.props;
      await loginUser(values);
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
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              name="email"
              type="email"
              placeholder={t("login")}
              validate={this.validateEmail}
            />
            <InputField
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={t("password")}
              validate={this.validatePassword}
            />
            <Button
              onClick={handleSubmit}
              styleName="navyBlue"
              disabled={invalid || pristine || submitting}
            >
              {submitting ? (
                <FontAwesomeIcon icon="circle-notch" spin size="lg" />
              ) : (
                t("loginButton")
              )}
            </Button>
            <Separator size={36}>or</Separator>
            <FacebookLogin>{t("Facebook")}</FacebookLogin>
          </FormContainer>
        )}
      />
    );
  }
}

SignInForm.propTypes = {
  loginUser: func.isRequired,
  t: func.isRequired
};

export default connect(
  null,
  {
    loginUser: login
  }
)(SignInForm);
