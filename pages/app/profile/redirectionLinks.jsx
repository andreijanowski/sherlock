import React, { useCallback, useMemo, useState } from "react";
import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import requireAuth from "lib/requireAuth";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import { deleteServiceLink, patchServiceLink } from "actions/externalServices";
import Form from "sections/profile/redirectionLinks";
import { getInitialValues } from "sections/profile/redirectionLinks/utils";
import ProfileLayout from "sections/profile/Layout";
import { addProtocol } from "utils/urls";
import { AddServiceLink, Confirm } from "components/modals";
import H3 from "components/H3";

const namespaces = ["additionalInformation", "app", "publishModal", "forms"];

const MODALS = {
  ADD_SERVICE_LINK: "ADD_SERVICE_LINK",
  REMOVE_SERVICE_LINK: "REMOVE_SERVICE_LINK"
};

const RedirectionLinks = ({
  t,
  lng,
  business,
  businessId,
  businessGroups,
  businessMenus,
  businessPictures,
  businessProducts,
  businessOpenPeriods,
  businesses,
  changeCurrentBusiness,
  addBusiness,
  updateBusiness,
  getProfileBusiness,
  serviceLinks,
  updateServiceLink,
  removeServiceLink
}) => {
  const [modalData, setModalData] = useState(null);

  const hideModal = useCallback(() => {
    setModalData(null);
  }, []);

  const onServiceLinkChange = useCallback(
    (id, values) => updateServiceLink(id, values),
    [updateServiceLink]
  );

  const onServiceLinkDelete = useCallback(
    ({ id, name }) => {
      const modalProps = {
        children: (
          <H3>{t("additionalInformation:deletePrompt", { service: name })}</H3>
        ),
        btnOkText: t("forms:delete"),
        btnCancelText: t("forms:cancel"),
        restyled: true,
        inverseColors: true,
        onConfirm: async () => {
          await removeServiceLink(id);
          hideModal();
        }
      };

      setModalData({ name: MODALS.REMOVE_SERVICE_LINK, props: modalProps });
    },
    [hideModal, removeServiceLink, t]
  );

  const onServiceAdd = useCallback(() => {
    setModalData({ name: MODALS.ADD_SERVICE_LINK });
  }, []);

  const handleSubmit = useCallback(
    ({ deliveryUrl, onlineBookingUrl, takeawayUrl }) => {
      const requestValues = {
        deliveryUrl: addProtocol(deliveryUrl),
        onlineBookingUrl: addProtocol(onlineBookingUrl),
        takeawayUrl: addProtocol(takeawayUrl)
      };

      return updateBusiness(businessId, requestValues);
    },
    [updateBusiness, businessId]
  );

  const initialValues = useMemo(() => getInitialValues(business), [business]);

  return (
    <ProfileLayout
      {...{
        t,
        lng,
        business,
        businessId,
        businessGroups,
        businessMenus,
        businessPictures,
        businessProducts,
        businessOpenPeriods,
        businesses,
        changeCurrentBusiness,
        addBusiness,
        updateBusiness,
        getProfileBusiness,
        currentPage: "redirectionLinks"
      }}
    >
      <Form
        {...{
          t,
          handleSubmit,
          initialValues,
          serviceLinks,
          onServiceAdd,
          onServiceLinkChange,
          onServiceLinkDelete
        }}
      />
      {modalData && modalData.name === MODALS.ADD_SERVICE_LINK && (
        <AddServiceLink open onClose={hideModal} />
      )}
      {modalData && modalData.name === MODALS.REMOVE_SERVICE_LINK && (
        <Confirm open onClose={hideModal} {...modalData.props} />
      )}
    </ProfileLayout>
  );
};

RedirectionLinks.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

RedirectionLinks.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  businessOpenPeriods: shape(),
  updateBusiness: func.isRequired,
  changeCurrentBusiness: func.isRequired,
  getProfileBusiness: func.isRequired,
  addBusiness: func.isRequired,
  updateServiceLink: func.isRequired,
  removeServiceLink: func.isRequired,
  businesses: shape(),
  serviceLinks: shape()
};

RedirectionLinks.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null,
  serviceLinks: null
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    (state, { i18n }) => {
      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const serviceLinks = state.getIn(["externalServices", "data", "links"]);

      const business =
        businessData &&
        businessData.get("businesses") &&
        businessData.get("businesses").first();

      return {
        business: business && business.get("attributes"),
        businessId: business && business.get("id"),
        businessGroups: businessData && businessData.get("groups"),
        businessMenus: businessData && businessData.get("menus"),
        businessPictures: businessData && businessData.get("pictures"),
        businessProducts: businessData && businessData.get("products"),
        businessOpenPeriods: businessData && businessData.get("openPeriods"),
        businesses: state.getIn([
          "users",
          "profileBusinesses",
          "data",
          "businesses"
        ]),
        lng: (i18n && i18n.language) || "en",
        serviceLinks
      };
    },
    {
      updateBusiness: patchBusiness,
      addBusiness: postBusiness,
      changeCurrentBusiness: setCurrentBusiness,
      getProfileBusiness: fetchProfileBusiness,
      updateServiceLink: patchServiceLink,
      removeServiceLink: deleteServiceLink
    }
  )
)(RedirectionLinks);
