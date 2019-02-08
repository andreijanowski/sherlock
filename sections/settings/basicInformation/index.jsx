import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { FormInput, Button, LoadingIndicator } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form, ConfirmationMsg } from "./styled";
import Avatar from "./Avatar";

const UserBasicInfoForm = ({ t, profile, updateProfile }) =>
  profile ? (
    <>
      <FinalForm
        initialValues={{
          name: profile.name,
          email: profile.email
        }}
        onSubmit={updateProfile}
        render={({ handleSubmit, form }) => (
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
                        saveImage: form.change
                      }}
                    />
                  )}
                />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput name="name" label={t("name")} placeholder="test" />
              </Box>
              <Box width={[1, 1, 560]}>
                <FormInput
                  name="email"
                  label={t("email")}
                  placeholder="email"
                />
              </Box>
              <Box width={[1, 200]}>
                <Button type="submit" styleName="navyBlue">
                  {t("update")}
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
    </>
  ) : (
    <LoadingIndicator />
  );
UserBasicInfoForm.propTypes = {
  t: func.isRequired,
  handleSubmit: func.isRequired,
  profile: shape().isRequired,
  updateProfile: func.isRequired
};

export default UserBasicInfoForm;
