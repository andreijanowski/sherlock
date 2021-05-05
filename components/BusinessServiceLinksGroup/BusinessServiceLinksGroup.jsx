import React from "react";
import { func, string, shape, arrayOf } from "prop-types";
import { withTranslation } from "i18n";

import { H5 } from "components";
import ServiceLinkForm from "./ServiceLinkForm";

const namespaces = ["additionalInformation"];

const BusinessServiceLinksGroup = ({
  t,
  category,
  items,
  onServiceLinkChange,
  onServiceLinkDelete
}) => (
  <>
    <H5>{t(`serviceLinkCategory.${category}`)}</H5>
    {items.map(
      ({
        attributes: {
          logo: {
            thumb: { url }
          },
          serviceUrl,
          name
        },
        id
      }) => {
        const initialValues = {
          service_url: serviceUrl
        };
        const onSubmit = async values => {
          await onServiceLinkChange(id, values);
        };
        const onDeleteClick = () => {
          onServiceLinkDelete({ id, name });
        };
        const label = t("serviceLinkUrlPlaceholder", { service: name });
        return (
          <ServiceLinkForm
            key={id}
            label={label}
            url={url}
            initialValues={initialValues}
            onSubmit={onSubmit}
            onDeleteClick={onDeleteClick}
            t={t}
          />
        );
      }
    )}
  </>
);

BusinessServiceLinksGroup.propTypes = {
  t: func.isRequired,
  category: string.isRequired,
  items: arrayOf(
    shape({
      id: string,
      attributes: shape({
        businessId: string,
        category: string,
        externalServiceId: string,
        logo: shape({ url: string }),
        name: string,
        serviceUrl: string
      })
    })
  ).isRequired,
  onServiceLinkChange: func.isRequired,
  onServiceLinkDelete: func.isRequired
};

export default withTranslation(namespaces)(BusinessServiceLinksGroup);
