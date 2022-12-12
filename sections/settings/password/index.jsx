import React, { PureComponent } from "react";
import { func } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { FormInput, StyledButton } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form, PasswordChangedMsg } from "sections/settings/styled";
import { validatePassword } from "utils/validators";

class ChangePasswordForm extends PureComponent {
  state = {
    wasPasswordChanged: false
  };

  submitForm = async (values, form) => {
    try {
      const { changePassword } = this.props;
      await changePassword(values);
      this.setState({
        wasPasswordChanged: true
      });
    } catch (e) {
      console.log(e);
    } finally {
      form.reset();
    }
  };

  render() {
    const { t } = this.props;
    const { wasPasswordChanged } = this.state;
    return (
      <FinalForm
        onSubmit={this.submitForm}
        subscription={{
          handleSubmit: true,
          invalid: true,
          submitting: true
        }}
        render={({ handleSubmit, invalid, submitting }) => (
          <Form onSubmit={handleSubmit}>
            <Flex flexDirection="column">
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="currentPassword"
                  type="password"
                  label={t("currentPassword")}
                  validate={validatePassword(t)}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="password"
                  type="password"
                  label={t("newPassword")}
                  validate={validatePassword(t)}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="passwordConfirmation"
                  type="password"
                  label={t("passwordConfirmation")}
                  validate={validatePassword(t)}
                />
              </Box>
              <Box width={1}>
                <StyledButton
                  type="submit"
                  styleName="blue"
                  disabled={invalid || submitting}
                >
                  {t("common:update")}
                </StyledButton>
              </Box>
              {wasPasswordChanged && (
                <Box mt={3}>
                  <PasswordChangedMsg>
                    {t("passwordChanged")}
                  </PasswordChangedMsg>
                </Box>
              )}
            </Flex>
          </Form>
        )}
      />
    );
  }
}
ChangePasswordForm.propTypes = {
  t: func.isRequired,
  changePassword: func.isRequired
};

export default ChangePasswordForm;
