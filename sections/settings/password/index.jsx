import React, { Component } from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { FormInput, Button, LoadingIndicator } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form, PasswordChangedMsg } from "sections/settings/styled";
import { validatePassword } from "utils/validators";

class ChangePasswordForm extends Component {
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
    const { profile, t } = this.props;
    const { wasPasswordChanged } = this.state;
    return profile ? (
      <FinalForm
        onSubmit={this.submitForm}
        render={({ handleSubmit, invalid, submitting }) => (
          <Form onSubmit={handleSubmit}>
            <Flex mx={-2} flexDirection="column">
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
                <Button
                  type="submit"
                  styleName="blue"
                  disabled={invalid || submitting}
                >
                  {t("common:update")}
                </Button>
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
    ) : (
      <LoadingIndicator />
    );
  }
}
ChangePasswordForm.propTypes = {
  t: func.isRequired,
  profile: shape().isRequired,
  changePassword: func.isRequired
};

export default ChangePasswordForm;
