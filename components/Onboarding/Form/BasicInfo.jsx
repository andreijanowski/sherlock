import React from "react";
import { bool, func, shape } from "prop-types";
import { Field, Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Box, Flex } from "@rebass/grid";

import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { AutoSave, FormInput, FormSelect, WhenFieldChanges } from "components";
import { MobilePreview } from "components/Onboarding";
import { getSubdivisions, countries } from "utils/iso-3166-2";
import { useT } from "utils/hooks";
import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { normalizePhone } from "utils/normalizers";
import {
  Content,
  Wrapper,
  Title,
  InfoWrapper,
  HintModal,
  FormWrapper
} from "./styled";

const BasicInfo = ({
  hasHintOpen,
  setHasHintOpen,
  handleSubmit,
  values: initialValues
}) => {
  const t = useT("basicInformation");
  const regionItems = country =>
    (country && country.value && getSubdivisions(country.value)) || [];
  const setHahandleCloseHint = () => setHasHintOpen(false);

  const commonStyles = { width: [1, 1 / 2], px: 2 };
  console.log("initial", initialValues);

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{ values: true, form: true }}
      render={({ values, form: { mutators } }) => (
        <FormWrapper>
          <AutoSave
            setFieldData={mutators.setFieldData}
            save={handleSubmit}
            t={t}
          />
          <WhenFieldChanges
            field="country"
            set="region"
            to={undefined}
            shouldChange={
              values.region &&
              values.region.value &&
              values.country &&
              values.country.value &&
              !values.region.value.includes(values.country.value)
            }
          />
          <Wrapper>
            <Title>{t("app:manageProfile.basicInformation")}</Title>
            <Content>
              <InfoWrapper>
                <FormInput
                  name="name"
                  label={t("nameLabel")}
                  placeholder={t("namePlaceholder")}
                />
                <FormInput
                  name="website"
                  label="Website (optional)"
                  placeholder={t("contactInformation:websitePlaceholder")}
                />
                <Flex mx={-2} flexWrap="wrap">
                  <Box {...commonStyles}>
                    <Field
                      name="country"
                      component={FormSelect}
                      label={t("countryLabel")}
                      placeholder={t("countryPlaceholder")}
                      items={countries}
                      showFlag
                    />
                  </Box>
                  <Box {...commonStyles}>
                    <Field
                      name="region"
                      component={FormSelect}
                      label={t("regionLabel")}
                      placeholder={t("regionPlaceholder")}
                      disabled={!values.country}
                      items={regionItems(values.country)}
                    />
                  </Box>
                </Flex>
                <Flex mx={-2} flexWrap="wrap">
                  <Box {...commonStyles}>
                    <FormInput
                      name="street"
                      label={t("streetLabel")}
                      placeholder={t("streetPlaceholder")}
                    />
                  </Box>
                  <Box {...commonStyles}>
                    <FormInput
                      name="streetNumber"
                      label={t("streetNumberLabel")}
                      placeholder={t("streetNumberPlaceholder")}
                    />
                  </Box>
                  <Box {...commonStyles}>
                    <FormInput
                      name="city"
                      label={t("cityLabel")}
                      placeholder={t("cityPlaceholder")}
                    />
                  </Box>
                  <Box {...commonStyles}>
                    <FormInput
                      name="postCode"
                      label={t("postCodeLabel")}
                      placeholder={t("postCodePlaceholder")}
                    />
                  </Box>
                </Flex>
                <FormInput
                  name="email"
                  label={t("contactInformation:emailLabel")}
                  placeholder={t("contactInformation:emailPlaceholder")}
                />
                <Flex mx={-2} flexWrap="wrap">
                  <Box {...commonStyles}>
                    <Field
                      name="phoneCountry"
                      component={FormSelect}
                      label={t("contactInformation:countryLabel")}
                      placeholder={t("contactInformation:countryPlaceholder")}
                      items={countriesPhoneCodes}
                      showFlag
                    />
                  </Box>
                  <Box {...commonStyles}>
                    <FormInput
                      name="phone"
                      label={t("contactInformation:phoneLabel")}
                      placeholder={t("contactInformation:phonePlaceholder")}
                      parse={normalizePhone}
                    />
                  </Box>
                </Flex>
              </InfoWrapper>
              {hasHintOpen && (
                <HintModal>
                  <b>{t("onboarding:intro.basicinfo.hint.title")}</b>
                  {t("onboarding:intro.basicinfo.hint.subtitle")}
                  <Button
                    onClick={setHahandleCloseHint}
                    styleName="popup"
                    withArrow
                    variant={BUTTON_VARIANT.GRADIENT}
                  >
                    {t("onboarding:intro.step1.gotit")}
                  </Button>
                </HintModal>
              )}
              <MobilePreview {...values} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

BasicInfo.propTypes = {
  values: shape().isRequired,
  hasHintOpen: bool,
  setHasHintOpen: func.isRequired,
  handleSubmit: func.isRequired
};

BasicInfo.defaultProps = {
  hasHintOpen: true
};

export default BasicInfo;
