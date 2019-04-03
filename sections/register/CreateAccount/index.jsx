import { PureComponent } from "react";
import { connect } from "react-redux";
import { Form } from "react-final-form";
import { func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  InputField,
  Button,
  CheckboxField,
  BlueText,
  ItalicText,
  PasswordStrengthMeter,
  FacebookLogin
} from "components";
import { register } from "actions/auth";
import {
  validateEmail,
  validatePassword,
  required,
  validatePasswordsMatch
} from "utils/validators";
import { Box, Flex } from "@rebass/grid";
import {
  HelperTitle,
  Separator,
  SuccessMessageWrapper,
  TextSeparatorStyled
} from "./styled";

class CreateAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: null
    };
    this.validateEmail = validateEmail(props.t);
    this.validatePassword = validatePassword(props.t);
    this.validateCheckbox = required(props.t);
    this.validatePasswordsMatch = validatePasswordsMatch(props.t);
  }

  submitForm = async ({
    email,
    password,
    passwordConfirmation,
    termsAgreement
  }) => {
    try {
      const { t, createUserAccount } = this.props;
      await createUserAccount({
        email,
        password,
        passwordConfirmation,
        termsAgreement
      })
        .then(() =>
          this.setState({
            successMessage: t("confirmationMessege", { email })
          })
        )
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { t } = this.props;
    const { successMessage } = this.state;
    if (successMessage) {
      return <SuccessMessageWrapper>{successMessage}</SuccessMessageWrapper>;
    }
    return (
      <Form
        onSubmit={this.submitForm}
        render={({ handleSubmit, pristine, invalid, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <HelperTitle>{t("emailHelperTitle")}</HelperTitle>
            <InputField
              name="email"
              type="email"
              placeholder="name@company.com"
              validate={this.validateEmail}
            />
            <Separator size={32} />
            <HelperTitle>{t("paswordHelperTitle")}</HelperTitle>
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
            <CheckboxField
              name="termsAgreement"
              validate={this.validateCheckbox}
            >
              <Box>
                {t("terms.start")}
                <a href="#">
                  <BlueText>
                    <ItalicText>{t("terms.privacyPolicy")}</ItalicText>
                  </BlueText>
                </a>
                {t("terms.and")}
                <a href="#">
                  <BlueText>
                    <ItalicText>{t("terms.termsOfUse")}</ItalicText>
                  </BlueText>
                </a>
              </Box>
            </CheckboxField>
            <Separator size={32} />
            <Flex flexWrap="wrap" m={-1}>
              <Box p={1} width={[1, 1, 1, 1 / 3]}>
                <Button
                  onClick={handleSubmit}
                  styleName="blue"
                  fluid
                  disabled={invalid || pristine || submitting}
                >
                  {submitting ? (
                    <FontAwesomeIcon icon="circle-notch" spin size="lg" />
                  ) : (
                    t("registerButton")
                  )}
                </Button>
              </Box>
              <TextSeparatorStyled size={16}>or</TextSeparatorStyled>
              <Box p={1} width={[1, 1, 1, 2 / 3]}>
                <FacebookLogin
                  disabled={!values.termsAgreement}
                  withAgreement={values.termsAgreement}
                >
                  {t("Facebook")}
                </FacebookLogin>
              </Box>
            </Flex>
          </form>
        )}
      />
    );
  }
}

CreateAccount.propTypes = {
  createUserAccount: func.isRequired,
  t: func.isRequired
};

export default connect(
  null,
  {
    createUserAccount: register
  }
)(CreateAccount);
