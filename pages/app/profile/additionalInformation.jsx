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
import Form from "sections/profile/additionalInformation";
import { getInitialValues } from "sections/profile/additionalInformation/utils";
import ProfileLayout from "sections/profile/Layout";
import { addProtocol } from "utils/urls";
import { AddServiceLink } from "components/modals";

const namespaces = ["additionalInformation", "app", "publishModal", "forms"];

const MODALS = {
  ADD_SERVICE_LINK: "ADD_SERVICE_LINK"
};

const AdditionalInformation = ({
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

  const handleSubmit = useCallback(
    ({
      breakfastService,
      lunchService,
      dinnerService,
      brunchService,
      cafeService,
      snackService,
      currency,
      pricePerPerson,
      hasCatering,
      hasReservations,
      hasPrivateEvents,
      availableInLefood,
      deliveryUrl,
      onlineBookingUrl,
      takeawayUrl,
      canPayWithCards,
      canPayWithCash,
      canPayWithMobile,
      secretCode
    }) => {
      const requestValues = {
        breakfastService,
        lunchService,
        dinnerService,
        brunchService,
        cafeService,
        snackService,
        currency: currency && currency.value,
        pricePerPerson,
        hasCatering,
        hasReservations,
        hasPrivateEvents,
        availableInLefood,
        deliveryUrl: addProtocol(deliveryUrl),
        onlineBookingUrl: addProtocol(onlineBookingUrl),
        takeawayUrl: addProtocol(takeawayUrl),
        canPayWithCards,
        canPayWithCash,
        canPayWithMobile,
        secretCode
      };

      return updateBusiness(businessId, requestValues);
    },
    [updateBusiness, businessId]
  );

  const onServiceLinkChange = useCallback(
    (id, values) => updateServiceLink(id, values),
    [updateServiceLink]
  );

  const onServiceLinkDelete = useCallback(id => removeServiceLink(id), [
    removeServiceLink
  ]);

  const onServiceAdd = useCallback(() => {
    setModalData({ name: MODALS.ADD_SERVICE_LINK });
  }, []);

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
        currentPage: "additionalInformation"
      }}
    >
      <Form
        {...{
          t,
          initialValues,
          serviceLinks,
          handleSubmit,
          onServiceAdd,
          onServiceLinkChange,
          onServiceLinkDelete
        }}
      />
      {modalData && modalData.name === MODALS.ADD_SERVICE_LINK && (
        <AddServiceLink open onClose={hideModal} />
      )}
    </ProfileLayout>
  );
};

AdditionalInformation.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

AdditionalInformation.propTypes = {
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

AdditionalInformation.defaultProps = {
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
)(AdditionalInformation);
