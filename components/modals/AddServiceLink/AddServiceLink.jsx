import React, { useCallback, useMemo } from "react";
import { func, bool, string, shape } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "i18n";
import { Field, Form } from "react-final-form";

import { Button, FormDropdown, FormInput, H3, Modal } from "components";
import { connectExternalService } from "actions/externalServices";
import { required } from "utils/validators";
import { groupServiceLinksByCategory } from "utils/servicesUtils";
import { Wrapper, ButtonsWrap } from "./styled";

const namespaces = ["forms", "additionalInformation"];

const AddServiceLink = ({
  t,
  open,
  onClose,
  services,
  links,
  businessId,
  addService
}) => {
  const onSubmit = useCallback(
    async data => {
      try {
        await addService({ ...data, businessId });
        onClose();
      } catch (e) {
        throw e;
      }
    },
    [addService, businessId, onClose]
  );

  const connectedServicesIds = useMemo(() => {
    if (!links) return [];
    const connectedIds = [];

    links.forEach(link => {
      connectedIds.push(link.getIn(["attributes", "externalServiceId"]));
    });
    return connectedIds;
  }, [links]);

  const serviceItems = useMemo(() => {
    if (!services) return [];
    const filteredServices = services.filter(
      service => !connectedServicesIds.includes(service.get("id"))
    );

    const groupedServices = groupServiceLinksByCategory(filteredServices);

    const result = [];
    Object.keys(groupedServices).forEach(category => {
      result.push({
        label: t(`additionalInformation:serviceLinkCategory.${category}`),
        items: groupedServices[category].map(
          ({
            id,
            attributes: {
              name,
              logo: {
                thumb: { url }
              }
            }
          }) => ({
            label: name,
            value: id,
            src: url
          })
        )
      });
    });
    return result;
  }, [connectedServicesIds, services, t]);

  return (
    <Modal open={open} onClose={onClose}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form: { getState } }) => {
          const { submitting } = getState();
          return (
            <Wrapper onSubmit={handleSubmit}>
              <H3>{t("additionalInformation:addExternalServiceLink")}</H3>
              <Field name="serviceId" validate={required(t)}>
                {({ input, meta }) => (
                  <FormDropdown
                    {...{
                      input,
                      meta,
                      label: t("additionalInformation:servicePlaceholder"),
                      items: serviceItems
                    }}
                  />
                )}
              </Field>
              <FormInput
                name="url"
                validate={required(t)}
                label={t("additionalInformation:urlPlaceholder")}
                placeholder={t("additionalInformation:urlPlaceholder")}
              />
              <ButtonsWrap>
                <Button type="button" styleName="reject" onClick={onClose}>
                  {t("forms:cancel")}
                </Button>
                <Button styleName="accept" disabled={submitting}>
                  {t("forms:save")}
                </Button>
              </ButtonsWrap>
            </Wrapper>
          );
        }}
      </Form>
    </Modal>
  );
};

AddServiceLink.propTypes = {
  t: func.isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  addService: func.isRequired,
  services: shape(),
  links: shape(),
  businessId: string
};

AddServiceLink.defaultProps = {
  services: null,
  links: null,
  businessId: null
};

const mapStateToProps = state => {
  const externalServices = state.getIn(["externalServices", "data"]);
  const services = externalServices.get("services");
  const links = externalServices.get("links");

  const businessData = state.getIn(["users", "currentBusiness", "data"]);
  const business = businessData && businessData.get("businesses").first();

  return {
    links,
    services,
    businessId: business && business.get("id")
  };
};

const mapDispatchToProps = {
  addService: connectExternalService
};

export default compose(
  withTranslation(namespaces),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddServiceLink);
