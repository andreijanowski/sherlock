import React from "react";
import { func } from "prop-types";
import { required, validateEmail } from "utils/validators";
import { Form as FinalForm, Field } from "react-final-form";
import { H3, FormInput, FormSelect } from "components";
import { countries } from "countries-list";
import { Flex, Box } from "@rebass/grid";
import { Form } from "../styled";

const countriesPhoneCodes = [];
Object.entries(countries)
  .sort((a, b) => (a[1].name < b[1].name ? -1 : 1))
  .forEach(country => {
    const phoneCodes = country[1].phone.split(",");
    phoneCodes.forEach(code => {
      countriesPhoneCodes.push({
        label: `+${code}`,
        value: {
          code: country[0],
          name: country[1].name,
          native: country[1].native,
          prefix: code
        }
      });
    });
  });

const ContactInformationForm = ({ t }) => (
  <FinalForm
    onSubmit={v => console.log(v)}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3>{t("contactInformation")}</H3>
        <FormInput
          name="name"
          validate={required(t)}
          label={t("nameLabel")}
          placeholder={t("namePlaceholder")}
        />
        <FormInput
          name="email"
          validate={validateEmail(t)}
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
        />
        <Flex mx={-2}>
          <Box width={1 / 3} px={2}>
            <Field
              name="country"
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
);

ContactInformationForm.propTypes = {
  t: func.isRequired
};

export default ContactInformationForm;
