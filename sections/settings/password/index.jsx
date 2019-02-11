import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { FormInput, Button, LoadingIndicator } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form } from "sections/settings/styled";
import { validatePassword } from "utils/validators";

const ChangePasswordForm = ({ t, profile, changePassword }) =>
  profile ? (
    <>
      <FinalForm
        onSubmit={changePassword}
        render={({ handleSubmit, invalid }) => (
          <Form onSubmit={handleSubmit}>
            <Flex mx={-2} flexDirection="column">
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="currentPassword"
                  label={t("currentPassword")}
                  validate={validatePassword(t)}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="password"
                  label={t("newPassword")}
                  validate={validatePassword(t)}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="passwordConfirmation"
                  label={t("passwordConfirmation")}
                  validate={validatePassword(t)}
                />
              </Box>
              <Box width={[1, 200]}>
                <Button type="submit" styleName="navyBlue" disabled={invalid}>
                  {t("common:update")}
                </Button>
              </Box>
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
  changePassword: func.isRequired
};

export default ChangePasswordForm;
