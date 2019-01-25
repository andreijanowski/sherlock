import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { H3, FormCheckbox, FormSelect, FormInput, AutoSave } from "components";
import { Flex, Box } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";
import { Form } from "../styled";
import { timeOfTheDay, paymentMethods, currencies } from "./utils";

const AdditionalInformationForm = ({ t, initialValues, handleSubmit }) => (
  <FinalForm
    initialValues={initialValues}
    onSubmit={handleSubmit}
    mutators={{ setFieldData }}
    render={({ form: { mutators } }) => (
      <Form>
        <AutoSave setFieldData={mutators.setFieldData} save={handleSubmit} />
        <H3>{t("timeOfTheDay")}</H3>
        <Flex flexWrap="wrap">
          {timeOfTheDay.map(time => (
            <Box width={1 / 2} key={time}>
              <FormCheckbox name={time} label={t(time)} />
            </Box>
          ))}
        </Flex>
        <H3 mt={3}>{t("priceRange")}</H3>
        <Flex mx={-2}>
          <Box width={1 / 2} px={2}>
            <Field
              name="currency"
              component={FormSelect}
              label={t("currencyLabel")}
              placeholder={t("currencyPlaceholder")}
              items={currencies}
            />
          </Box>
          <Box width={1 / 2} px={2}>
            <FormInput
              name="pricePerPerson"
              label={t("pricePerPersonLabel")}
              placeholder={t("pricePerPersonPlaceholder")}
            />
          </Box>
        </Flex>
        <H3 mt={3}>{t("services")}</H3>
        <FormCheckbox name="hasCatering" label={t("hasCatering")} />
        <FormInput
          name="deliveryUrl"
          label={t("deliveryUrlLabel")}
          placeholder={t("deliveryUrlPlaceholder")}
        />
        <FormInput
          name="onlineBookingUrl"
          label={t("onlineBookingUrlLabel")}
          placeholder={t("onlineBookingUrlPlaceholder")}
        />
        <FormInput
          name="takeawayUrl"
          label={t("takeawayUrlLabel")}
          placeholder={t("takeawayUrlPlaceholder")}
        />
        <H3 mt={3}>{t("paymentMethods")}</H3>
        <Flex flexWrap="wrap">
          {paymentMethods.map(method => (
            <Box width={1 / 2} key={method}>
              <FormCheckbox name={method} label={t(method)} />
            </Box>
          ))}
        </Flex>
        <H3 mt={3}>{t("secretCode")}</H3>
        <FormInput
          name="secretCode"
          label={t("secretCodeLabel")}
          placeholder={t("secretCodePlaceholder")}
        />
      </Form>
    )}
  />
);

AdditionalInformationForm.propTypes = {
  t: func.isRequired,
  initialValues: shape(),
  handleSubmit: func.isRequired
};

AdditionalInformationForm.defaultProps = {
  initialValues: undefined
};

export default AdditionalInformationForm;
