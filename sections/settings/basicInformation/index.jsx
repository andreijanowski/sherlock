import React, { PureComponent } from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { FormInput, StyledButton, LoadingIndicator } from "components";
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
          name: profile.getIn(["attributes", "name"]),
          email: profile.getIn(["attributes", "email"])
        }}
        onSubmit={this.submitForm}
        subscription={{
          handleSubmit: true,
          pristine: true,
          invalid: true,
          submitting: true
        }}
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
                        url: profile.getIn(["attributes", "avatar", "url"]),
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
                <StyledButton
                  type="submit"
                  styleName="blue"
                  disabled={invalid || submitting}
                >
                  {t("common:update")}
                </StyledButton>
              </Box>
              {profile.getIn(["attributes", "unconfirmedEmail"]) && (
                <Box my={3}>
                  <ConfirmationMsg>
                    {t("confirmEmailChange", {
                      email: profile.getIn(["attributes", "unconfirmedEmail"])
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
