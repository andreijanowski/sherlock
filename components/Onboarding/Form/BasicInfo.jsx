import React from "react";
import { connect } from "react-redux";
import { bool, func, shape, string } from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";
import setFieldData from "final-form-set-field-data";
import { Box, Flex } from "@rebass/grid";

import { isSelectValueChanged } from "sections/profile/basicInformation/utils";
import { patchBusiness } from "actions/businesses";
import { addProtocol } from "utils/urls";
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
  Form
} from "./styled";

const BasicInfo = ({
  values: initialValues,
  updateBusiness,
  businessId,
  hasHintOpen,
  setHasHintOpen
}) => {
  const t = useT("basicInformation");
  const regionItems = country =>
    (country && country.value && getSubdivisions(country.value)) || [];
  const setHahandleCloseHint = () => setHasHintOpen(false);

  const handleSubmit = (
    {
      name,
      country,
      region,
      street,
      streetNumber,
      city,
      postCode,
      email,
      phone,
      phoneCountry,
      website
    },
    { country: countryValue, region: regionValue }
  ) => {
    console.log("SUBMITO SANTO!");
    const requestValues = {
      name,
      countryCode: isSelectValueChanged(country, countryValue)
        ? country.value
        : undefined,
      regionCode: isSelectValueChanged(region, regionValue)
        ? region.value
        : undefined,
      street,
      streetNumber,
      city,
      postCode,
      email,
      phone,
      phoneCountryPrefix:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.prefix
          : undefined,
      phoneCountryCode:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.code
          : undefined,
      website: addProtocol(website)
    };
    if (Object.values(requestValues).some(v => !!v)) {
      return updateBusiness(businessId, requestValues);
    }
    return null;
  };

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mutators={{ setFieldData }}
      subscription={{ values: true, form: true }}
      render={({ values, form: { mutators } }) => (
        <Form>
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
                  <Box width={[1, 1 / 2]} px={2}>
                    <Field
                      name="country"
                      component={FormSelect}
                      label={t("countryLabel")}
                      placeholder={t("countryPlaceholder")}
                      items={countries}
                      showFlag
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} px={2}>
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
                  <Box width={[1, 1 / 2]} px={2}>
                    <FormInput
                      name="street"
                      label={t("streetLabel")}
                      placeholder={t("streetPlaceholder")}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} px={2}>
                    <FormInput
                      name="streetNumber"
                      label={t("streetNumberLabel")}
                      placeholder={t("streetNumberPlaceholder")}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} px={2}>
                    <FormInput
                      name="city"
                      label={t("cityLabel")}
                      placeholder={t("cityPlaceholder")}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} px={2}>
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
                  <Box width={[1, 1 / 2]} px={2}>
                    <Field
                      name="phoneCountry"
                      component={FormSelect}
                      label={t("contactInformation:countryLabel")}
                      placeholder={t("contactInformation:countryPlaceholder")}
                      items={countriesPhoneCodes}
                      showFlag
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} px={2}>
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
              <MobilePreview {...initialValues} {...values} />
            </Content>
          </Wrapper>
        </Form>
      )}
    />
  );
};

BasicInfo.propTypes = {
  values: shape().isRequired,
  businessId: string,
  updateBusiness: func.isRequired,
  hasHintOpen: bool,
  setHasHintOpen: func.isRequired
};

BasicInfo.defaultProps = {
  businessId: "",
  hasHintOpen: true
};

export default connect(
  state => {
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    return {
      businessId: business && business.get("id")
    };
  },
  {
    updateBusiness: patchBusiness
  }
)(BasicInfo);
