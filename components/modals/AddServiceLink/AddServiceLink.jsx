import React, { useCallback, useMemo } from "react";
import { func, bool, string, shape } from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "i18n";

import { Modal } from "components";
import { connectExternalService } from "actions/externalServices";
import { groupServiceLinksByCategory } from "utils/servicesUtils";
import { addProtocol } from "utils/urls";
import AddServiceLinkForm from "./AddServiceLinkForm";

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
    async ({ url, ...data }) => {
      try {
        await addService({ ...data, businessId, url: addProtocol(url) });
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

    return Object.keys(groupedServices).map(category => ({
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
    }));
  }, [connectedServicesIds, services, t]);

  return (
    <Modal open={open} onClose={onClose}>
      <AddServiceLinkForm
        onSubmit={onSubmit}
        onClose={onClose}
        serviceItems={serviceItems}
        t={t}
      />
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
