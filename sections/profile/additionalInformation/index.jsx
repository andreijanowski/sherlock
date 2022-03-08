import React from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import { Flex, Box } from "@rebass/grid";
import setFieldData from "final-form-set-field-data";

import {
  H3,
  FormCheckbox,
  FormSelect,
  FormInput,
  AutoSave,
  LoadingIndicator,
  HintBox
} from "components";
import { Trans } from "i18n";
import currencies from "utils/currencies";
import { Form } from "../styled";
import { timeOfTheDay, paymentMethods } from "./utils";

const AdditionalInformationForm = ({ t, initialValues, handleSubmit }) =>
  initialValues ? (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{
        form: true
      }}
      render={({ form: { mutators } }) => (
        <Form>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
          />
          <H3>{t("timeOfTheDay")}</H3>
          <Flex flexWrap="wrap">
            {timeOfTheDay.map(time => (
              <Box width={[1, null, 1 / 2]} key={time}>
                <FormCheckbox name={time} label={t(time)} />
              </Box>
            ))}
          </Flex>
          <H3 mt={3}>{t("priceRange")}</H3>
          <Flex mx={-2} flexWrap="wrap">
            <Box width={[1, null, 1 / 3, 1 / 2]} px={2}>
              <Field
                name="currency"
                component={FormSelect}
                label={t("currencyLabel")}
                placeholder={t("currencyPlaceholder")}
                items={currencies}
              />
            </Box>
            <Box width={[1, null, 2 / 3, 1 / 2]} px={2}>
              <FormInput
                name="pricePerPerson"
                label={t("pricePerPersonLabel")}
                placeholder={t("pricePerPersonPlaceholder")}
              />
            </Box>
          </Flex>
          <H3 mt={3}>{t("services")}</H3>
          <FormCheckbox name="hasCatering" label={t("hasCatering")} />
          <FormCheckbox name="hasReservations" label={t("hasReservations")} />
          <FormCheckbox name="hasPrivateEvents" label={t("hasPrivateEvents")} />
          <FormCheckbox
            name="availableInLefood"
            label={t("availableInLefood")}
          />
          <H3 mt={3}>{t("paymentMethods")}</H3>
          <Flex flexWrap="wrap">
            {paymentMethods.map(method => (
              <Box width={1 / 2} key={method}>
                <FormCheckbox name={method} label={t(method)} />
              </Box>
            ))}
          </Flex>
          <HintBox
            hint={
              <Trans t={t} i18nKey="secretCodeHint" components={[<br />]} />
            }
          >
            <H3 mt={3}>{t("secretCode")}</H3>
          </HintBox>
          <FormInput
            name="secretCode"
            label={t("secretCodeLabel")}
            placeholder={t("secretCodePlaceholder")}
          />
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
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
