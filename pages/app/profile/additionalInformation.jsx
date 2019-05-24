import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import Form from "sections/profile/additionalInformation";
import { connect } from "react-redux";
import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import { getInitialValues } from "sections/profile/additionalInformation/utils";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["additionalInformation", "app", "publishModal", "forms"];

class AdditionalInformation extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  handleSubmit = ({
    breakfastService,
    lunchService,
    dinnerService,
    brunchService,
    cafeService,
    snackService,
    currency,
    pricePerPerson,
    hasCatering,
    deliveryUrl,
    onlineBookingUrl,
    takeawayUrl,
    canPayWithCards,
    canPayWithCash,
    canPayWithMobile,
    secretCode
  }) => {
    const { updateBusiness, businessId } = this.props;
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
      deliveryUrl,
      onlineBookingUrl,
      takeawayUrl,
      canPayWithCards,
      canPayWithCash,
      canPayWithMobile,
      secretCode
    };
    return updateBusiness(businessId, requestValues);
  };

  render() {
    const {
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
    } = this.props;
    const initialValues = getInitialValues(business);
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
        <Form {...{ t, initialValues, handleSubmit: this.handleSubmit }} />
      </ProfileLayout>
    );
  }
}

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

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
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
          ])
        };
      },
      {
        updateBusiness: patchBusiness,
        addBusiness: postBusiness,
        changeCurrentBusiness: setCurrentBusiness,
        getProfileBusiness: fetchProfileBusiness
      }
    )(AdditionalInformation)
  )
);
