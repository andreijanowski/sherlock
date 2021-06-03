import React, { useMemo } from "react";
import { func, shape } from "prop-types";
import { Form as FinalForm } from "react-final-form";
import setFieldData from "final-form-set-field-data";

import {
  H3,
  H4,
  LoadingIndicator,
  BusinessServiceLinksGroup,
  Tooltip,
  FormInput,
  AutoSave
} from "components";
import { groupServiceLinksByCategory } from "utils/servicesUtils";
import { Form, Link } from "../styled";

const RedirectionLinksForm = ({
  t,
  initialValues,
  handleSubmit,
  serviceLinks,
  onServiceAdd,
  onServiceLinkChange,
  onServiceLinkDelete
}) => {
  const groupedServiceLinks = useMemo(
    () => (serviceLinks ? groupServiceLinksByCategory(serviceLinks) : {}),
    [serviceLinks]
  );

  return initialValues ? (
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
          <H3>{t("redirectionLinks")}</H3>
          <H4>{t("redirectionWebsiteLinks")}</H4>
          <Tooltip content={t("redirectionLinksTooltip")}>
            <FormInput
              name="deliveryUrl"
              label={t("deliveryUrlLabel")}
              placeholder={t("deliveryUrlPlaceholder")}
            />
          </Tooltip>
          <Tooltip content={t("redirectionLinksTooltip")}>
            <FormInput
              name="onlineBookingUrl"
              label={t("onlineBookingUrlLabel")}
              placeholder={t("onlineBookingUrlPlaceholder")}
            />
          </Tooltip>
          <Tooltip content={t("redirectionLinksTooltip")}>
            <FormInput
              name="takeawayUrl"
              label={t("takeawayUrlLabel")}
              placeholder={t("takeawayUrlPlaceholder")}
            />
          </Tooltip>

          <H4>{t("redirectionServicesLinks")}</H4>
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
        </Form>
      )}
    />
  ) : (
    <LoadingIndicator />
  );
};

RedirectionLinksForm.propTypes = {
  t: func.isRequired,
  initialValues: shape().isRequired,
  handleSubmit: func.isRequired,
  onServiceAdd: func.isRequired,
  onServiceLinkChange: func.isRequired,
  onServiceLinkDelete: func.isRequired,
  serviceLinks: shape()
};

RedirectionLinksForm.defaultProps = {
  serviceLinks: null
};

export default RedirectionLinksForm;
