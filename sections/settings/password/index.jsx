import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { FormInput, Button, LoadingIndicator } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form } from "sections/settings/styled";

const ChangePasswordForm = ({ t, profile, updateProfile }) =>
  profile ? (
    <>
      <FinalForm
        onSubmit={updateProfile}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Flex mx={-2} flexDirection="column">
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="currentPassword"
                  label={t("currentPassword")}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput name="password" label={t("newPassword")} />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="passwordConfirmation"
                  label={t("passwordConfirmation")}
                />
              </Box>
              <Box width={[1, 200]}>
                <Button type="submit" styleName="navyBlue">
                  {t("update")}
                </Button>
              </Box>
              {/* {profile.unconfirmedEmail && (
                <Box my={3}>
                  <ConfirmationMsg>
                    {t("confirmEmailChange", {
                      email: profile.unconfirmedEmail
                    })}
                  </ConfirmationMsg>
                </Box>
              )} */}
            </Flex>
          </Form>
        )}
      />
    </>
  ) : (
    <LoadingIndicator />
  );
ChangePasswordForm.propTypes = {
  t: func.isRequired,
  profile: shape().isRequired,
  updateProfile: func.isRequired
};

export default ChangePasswordForm;
