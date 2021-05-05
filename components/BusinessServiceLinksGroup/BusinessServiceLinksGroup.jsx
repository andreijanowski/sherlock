import React from "react";
import { func, string, shape, arrayOf } from "prop-types";
import { withTranslation } from "i18n";
import { Form } from "react-final-form";
import setFieldData from "final-form-set-field-data";

import { AutoSave, FormInput, H3 } from "components";
import { CloseIcon } from "components/Icons";
import { ServiceDeleteButton, ServiceForm, ServiceLogo } from "./styled";

const namespaces = ["additionalInformation"];

const BusinessServiceLinksGroup = ({
  t,
  category,
  items,
  onServiceLinkChange,
  onServiceLinkDelete
}) => (
  <>
    <H3>{t(`serviceLinkCategory.${category}`)}</H3>
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
        const onSubmit = async values => {
          await onServiceLinkChange(id, values);
        };
        const onDeleteClick = () => {
          onServiceLinkDelete({ id, name });
        };
        const label = t("serviceLinkUrlPlaceholder", { service: name });
        return (
          <Form
            onSubmit={onSubmit}
            initialValues={{ service_url: serviceUrl }}
            subscription={{
              submitting: true
            }}
            mutators={{ setFieldData }}
            key={id}
          >
            {({ handleSubmit, form: { mutators, getState } }) => {
              const { submitting } = getState();

              return (
                <ServiceForm handleSubmit={handleSubmit}>
                  <AutoSave
                    setFieldData={mutators.setFieldData}
                    save={handleSubmit}
                    t={t}
                  />
                  <ServiceLogo url={url} />
                  <FormInput
                    name="service_url"
                    label={label}
                    placeholder={label}
                  />
                  <ServiceDeleteButton
                    type="button"
                    disabled={submitting}
                    onClick={onDeleteClick}
                  >
                    <CloseIcon />
                  </ServiceDeleteButton>
                </ServiceForm>
              );
            }}
          </Form>
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
