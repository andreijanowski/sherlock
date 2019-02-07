import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import { FormInput, Button } from "components";
import { Flex, Box } from "@rebass/grid";
import { Form } from "./styled";
import Avatar from "./Avatar";

const UserBasicInfoForm = ({ t }) => (
  <FinalForm
    initialValues={{}}
    onSubmit={e => {
      console.log(e);
    }}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <Flex mx={-2} flexDirection="column">
          <Box width={100} mb={32}>
            <Avatar {...{ t }} />
          </Box>
          <Box width={[1, 1, 560]} px={2}>
            <FormInput name="name" label={t("name")} placeholder="test" />
          </Box>
          <Box width={[1, 1, 560]} px={2}>
            <FormInput name="email" label={t("email")} placeholder="email" />
          </Box>
          <Box width={[1, 200]} px={2}>
            <Button type="submit" styleName="navyBlue">
              Update
            </Button>
          </Box>
        </Flex>
      </Form>
    )}
  />
);
UserBasicInfoForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  handleSubmit: func.isRequired
};

UserBasicInfoForm.defaultProps = {
  initialValues: undefined
};

export default UserBasicInfoForm;
