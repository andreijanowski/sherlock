import React, { useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { Box, Flex } from "@rebass/grid";

import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { FormInput, FormSelect, WhenFieldChanges } from "components";
import { getSubdivisions, countries } from "utils/iso-3166-2";
import { useT } from "utils/hooks";
import countriesPhoneCodes from "utils/countriesPhoneCodes";
import { normalizePhone } from "utils/normalizers";
import {
  Content,
  Wrapper,
  Title,
  Form,
  InfoWrapper,
  PreviewWrapper,
  HintModal
} from "./styled";

const BasicInfo = () => {
  const [hasHintOpen, setHasHintOpen] = useState(true);
  const t = useT("basicInformation");
  const regionItems = country =>
    (country && country.value && getSubdivisions(country.value)) || [];
  const handleSubmit = () => {};
  const setHahandleCloseHint = () => setHasHintOpen(false);

  return (
    <Wrapper>
      <Title>{t("app:manageProfile.basicInformation")}</Title>
      <Content>
        <InfoWrapper>
          <FinalForm
            onSubmit={handleSubmit}
            subscription={{ values: true, form: true }}
            render={({ values }) => (
              <Form>
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
              </Form>
            )}
          />
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
        <PreviewWrapper>
          <div>.</div>
        </PreviewWrapper>
      </Content>
    </Wrapper>
  );
};

export default BasicInfo;
