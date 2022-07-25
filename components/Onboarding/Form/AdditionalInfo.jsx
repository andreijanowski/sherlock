import React from "react";

import { Flex, Box } from "@rebass/grid";
import { func, shape } from "prop-types";
import { Field, Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";

import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import { FormCheckbox, FormSelect, FormInput, AutoSave } from "components";

import currencies from "utils/currencies";
import {
  timeOfTheDay,
  paymentMethods,
  checkboxes
} from "sections/profile/additionalInformation/utils";

import {
  Content,
  Wrapper,
  Title,
  InfoWrapper,
  FormWrapper,
  FieldLabel,
  Optional
} from "./styled";

const AdditionalInfo = ({ values: initialValues, handleSubmit }) => {
  const t = useT(["additionalInformation", "basicInformation"]);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{
        form: true
      }}
      render={({ form: { mutators } }) => (
        <FormWrapper>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
          />
          <Wrapper>
            <Title>{t("shortHeader")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="550px">
                <FieldLabel>
                  {t("timeOfTheDay")}
                  <Optional>{t("basicInformation:optional")}</Optional>
                </FieldLabel>
                <Flex flexWrap="wrap">
                  {timeOfTheDay.map(time => (
                    <Box width={[1, null, 1 / 2]} key={time}>
                      <FormCheckbox name={time} label={t(time)} />
                    </Box>
                  ))}
                </Flex>
                <FieldLabel>
                  {t("priceRange")}
                  <Optional>{t("basicInformation:optional")}</Optional>
                </FieldLabel>
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
                <Flex>
                  <Box width={[1, null, 1 / 3, 1 / 2]} px={2}>
                    <FieldLabel>
                      {t("services")}
                      <Optional>{t("basicInformation:optional")}</Optional>
                    </FieldLabel>
                    {checkboxes.map(box => (
                      <FormCheckbox key={box} name={box} label={t(box)} />
                    ))}
                  </Box>
                  <Box>
                    <FieldLabel>
                      {t("paymentMethods")}
                      <Optional>{t("basicInformation:optional")}</Optional>
                    </FieldLabel>
                    {paymentMethods.map(method => (
                      <FormCheckbox
                        key={method}
                        name={method}
                        label={t(method)}
                      />
                    ))}
                  </Box>
                </Flex>
              </InfoWrapper>
              <MobilePreview {...initialValues} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

AdditionalInfo.propTypes = {
  values: shape().isRequired,
  handleSubmit: func.isRequired,
  groupsData: shape()
};

AdditionalInfo.defaultProps = {
  groupsData: null
};

export default AdditionalInfo;
