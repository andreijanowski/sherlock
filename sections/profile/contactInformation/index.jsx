import React from "react";
import { func, shape } from "prop-types";
import { validateEmail } from "utils/validators";
import { Form as FinalForm, Field } from "react-final-form";
import {
  H3,
  FormInput,
  FormSelect,
  AutoSave,
  LoadingIndicator
} from "components";
import { Flex, Box } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";
import { Form } from "../styled";
import { countriesPhoneCodes } from "./utils";

const ContactInformationForm = ({ t, initialValues, handleSubmit }) =>
  initialValues ? (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      render={({ form: { mutators } }) => (
        <Form>
          <AutoSave setFieldData={mutators.setFieldData} save={handleSubmit} />
          <H3>{t("contactInformation")}</H3>
          <FormInput
            name="email"
            validate={validateEmail(t)}
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
          />
          <Flex mx={-2}>
            <Box width={1 / 3} px={2}>
              <Field
                name="phoneCountry"
                component={FormSelect}
                label={t("countryLabel")}
                placeholder={t("countryPlaceholder")}
                items={countriesPhoneCodes}
                showFlag
              />
            </Box>
            <Box width={2 / 3} px={2}>
              <FormInput
                name="phone"
                label={t("phoneLabel")}
                placeholder={t("phonePlaceholder")}
              />
            </Box>
          </Flex>
          <FormInput
            name="website"
            label={t("websiteLabel")}
            placeholder={t("websitePlaceholder")}
          />
          <FormInput
            name="instagram"
            label={t("instagramLabel")}
            placeholder={t("instagramPlaceholder")}
          />
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
  );

ContactInformationForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  handleSubmit: func.isRequired
};

ContactInformationForm.defaultProps = {
  initialValues: undefined
};

export default ContactInformationForm;