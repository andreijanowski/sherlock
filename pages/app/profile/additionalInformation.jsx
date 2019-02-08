import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import Form from "sections/profile/additionalInformation";
import { connect } from "react-redux";
import { postBusiness, patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/users";
import { getInitialValues } from "sections/profile/additionalInformation/utils";
import ProfileLayout from "sections/profile/Layout";

const namespaces = ["additionalInformation", "app", "publishModal"];

class AdditionalInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
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
    const {
      updateBusiness,
      business: { id }
    } = this.props;
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
    return updateBusiness(id, requestValues);
  };

  render() {
    const {
      t,
      lng,
      business,
      businesses,
      changeCurrentBusiness,
      addBusiness
    } = this.props;
    const initialValues = getInitialValues(business);
    return (
      <ProfileLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          addBusiness,
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
  updateBusiness: func.isRequired,
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  businesses: arrayOf(shape())
};

AdditionalInformation.defaultProps = {
  business: null,
  businesses: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data,
        businesses: state.users.profileBusinesses.data
      }),
      {
        updateBusiness: patchBusiness,
        addBusiness: postBusiness,
        changeCurrentBusiness: setCurrentBusiness
      }
    )(AdditionalInformation)
  )
);
