import React, { PureComponent } from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { FormInput, Button, LoadingIndicator } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form, ConfirmationMsg } from "sections/settings/styled";
import { validateEmail, required } from "utils/validators";
import Avatar from "./Avatar";

class UserBasicInfoForm extends PureComponent {
  submitForm = async values => {
    try {
      const { updateProfile } = this.props;
      await updateProfile(values);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { profile, t } = this.props;
    return profile ? (
      <FinalForm
        initialValues={{
          name: profile.name,
          email: profile.email
        }}
        onSubmit={this.submitForm}
        render={({ handleSubmit, form, invalid, submitting }) => (
          <Form onSubmit={handleSubmit}>
            <Flex mx={-2} flexDirection="column">
              <Box width={100} mb={32}>
                <Field
                  name="avatar"
                  render={() => (
                    <Avatar
                      {...{
                        t,
                        url: profile && profile.avatar.url,
                        saveToFormState: form.change
                      }}
                    />
                  )}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="name"
                  label={t("name")}
                  validate={required(t)}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="email"
                  label={t("email")}
                  validate={validateEmail(t)}
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
              {profile.unconfirmedEmail && (
                <Box my={3}>
                  <ConfirmationMsg>
                    {t("confirmEmailChange", {
                      email: profile.unconfirmedEmail
                    })}
                  </ConfirmationMsg>
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
UserBasicInfoForm.propTypes = {
  t: func.isRequired,
  handleSubmit: func,
  profile: shape(),
  updateProfile: func.isRequired
};

UserBasicInfoForm.defaultProps = {
  handleSubmit: null,
  profile: null
};

export default UserBasicInfoForm;
