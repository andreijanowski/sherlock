import React, { useCallback, useMemo } from "react";
import { withTranslation } from "i18n";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import requireAuth from "lib/requireAuth";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import Form from "sections/profile/additionalInformation";
import { getInitialValues } from "sections/profile/additionalInformation/utils";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["additionalInformation", "app", "publishModal", "forms"];

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
  getProfileBusiness
}) => {
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
      canPayWithCards,
      canPayWithCash,
      canPayWithMobile,
      secretCode,
      deliveryChargeRef,
      stripePaymentRef,
      deliveryServiceTypeRef,
      takeawayServiceTypeRef
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
        canPayWithCards,
        canPayWithCash,
        canPayWithMobile,
        secretCode,
        deliveryChargeRef,
        stripePaymentRef,
        deliveryServiceTypeRef,
        takeawayServiceTypeRef
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
        currentPage: "additionalInformation"
      }}
    >
      <Form
        {...{
          t,
          initialValues,
          handleSubmit
        }}
      />
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
  businesses: shape()
};

AdditionalInformation.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  businessOpenPeriods: null,
  businesses: null
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(
    (state, { i18n }) => {
      const businessData = state.getIn(["users", "currentBusiness", "data"]);

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
        lng: (i18n && i18n.language) || "en"
      };
    },
    {
      updateBusiness: patchBusiness,
      addBusiness: postBusiness,
      changeCurrentBusiness: setCurrentBusiness,
      getProfileBusiness: fetchProfileBusiness
    }
  )
)(AdditionalInformation);
