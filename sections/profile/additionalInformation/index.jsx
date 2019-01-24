import React from "react";
import { func } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { H3, FormCheckbox, FormSelect, FormInput } from "components";
import cc from "currency-codes";
import { Flex, Box } from "@rebass/grid";
import { Form } from "../styled";

const timeOfTheDay = [
  "breakfastService",
  "lunchService",
  "dinnerService",
  "brunchService",
  "cafeService",
  "snackService"
];

const paymentMethods = ["canPayWithCards", "canPayWithCash", "canPayByPhone"];

const currencies = cc.codes().map(c => ({
  value: c,
  label: c
}));

const AdditionalInformationForm = ({ t }) => (
  <FinalForm
    onSubmit={v => console.log(v)}
    render={({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <H3>{t("timeOfTheDay")}</H3>
        <Flex flexWrap="wrap">
          {timeOfTheDay.map(time => (
            <Box width={1 / 2}>
              <FormCheckbox name={time} key={time} label={t(time)} />
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
            <Box width={1 / 2}>
              <FormCheckbox name={method} key={method} label={t(method)} />
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
  t: func.isRequired
};

export default AdditionalInformationForm;
