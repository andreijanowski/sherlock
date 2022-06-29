import React, { useState } from "react";
import { shape } from "prop-types";
import { Field } from "react-final-form";
import { Box, Flex } from "@rebass/grid";

import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { FormInput, FormSelect } from "components";
import { MobilePreview } from "components/Onboarding";
import { getSubdivisions, countries } from "utils/iso-3166-2";
import { useT } from "utils/hooks";
import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { normalizePhone } from "utils/normalizers";
import { Content, Wrapper, Title, InfoWrapper, HintModal } from "./styled";

const BasicInfo = ({ values }) => {
  const [hasHintOpen, setHasHintOpen] = useState(true);
  const t = useT("basicInformation");
  const regionItems = country =>
    (country && country.value && getSubdivisions(country.value)) || [];
  const setHahandleCloseHint = () => setHasHintOpen(false);

  return (
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
        <MobilePreview {...values} />
        {console.log(values)}
      </Content>
    </Wrapper>
  );
};

BasicInfo.propTypes = {
  values: shape().isRequired
};

export default BasicInfo;
