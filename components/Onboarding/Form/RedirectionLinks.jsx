import React, { useMemo } from "react";

import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";

import { useT } from "utils/hooks";
import { MobilePreview } from "components/Onboarding";
import { FormInput, AutoSave, BusinessServiceLinksGroup } from "components";

import { groupServiceLinksByCategory } from "utils/servicesUtils";
import {
  Content,
  Wrapper,
  Title,
  InfoWrapper,
  FormWrapper,
  FieldLabel,
  Optional,
  Link
} from "./styled";

const RedirectionLinks = ({
  values: initialValues,
  handleSubmit,
  serviceLinks,
  onServiceAdd,
  onServiceLinkChange,
  onServiceLinkDelete
}) => {
  const t = useT(["additionalInformation", "basicInformation"]);

  const groupedServiceLinks = useMemo(
    () => (serviceLinks ? groupServiceLinksByCategory(serviceLinks) : {}),
    [serviceLinks]
  );

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
            hasHiddenMessages
          />
          <Wrapper>
            <Title>{t("redirectionLinks")}</Title>
            <Content>
              <InfoWrapper minWidth="800px" height="570px">
                <FieldLabel>
                  {t("redirectionWebsiteLinks")}
                  <Optional>{t("basicInformation:optional")}</Optional>
                </FieldLabel>
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

                <FieldLabel>
                  {t("redirectionServicesLinks")}
                  <Optional>{t("basicInformation:optional")}</Optional>
                </FieldLabel>
                {Object.keys(groupedServiceLinks).map(category => (
                  <BusinessServiceLinksGroup
                    key={category}
                    category={category}
                    items={groupedServiceLinks[category]}
                    onServiceLinkChange={onServiceLinkChange}
                    onServiceLinkDelete={onServiceLinkDelete}
                  />
                ))}

                <Link type="button" onClick={onServiceAdd}>
                  {t("addExternalServiceLink")}
                </Link>
              </InfoWrapper>
              <MobilePreview {...initialValues} />
            </Content>
          </Wrapper>
        </FormWrapper>
      )}
    />
  );
};

RedirectionLinks.propTypes = {
  values: shape().isRequired,
  handleSubmit: func.isRequired,
  onServiceAdd: func.isRequired,
  onServiceLinkChange: func.isRequired,
  onServiceLinkDelete: func.isRequired,
  serviceLinks: shape()
};

RedirectionLinks.defaultProps = {
  serviceLinks: null
};

export default RedirectionLinks;
