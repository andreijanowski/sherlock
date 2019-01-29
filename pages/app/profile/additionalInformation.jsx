import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/additionalInformation";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";
import { setCurrentBusiness } from "actions/users";
import { getInitialValues } from "sections/profile/additionalInformation/utils";
import {
  generateMenuItems,
  prepareBusinessesList
} from "sections/profile/utils";

const namespaces = ["additionalInformation", "app"];

class AdditionalInformation extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  handleSubmit = async ({
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
    try {
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
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  handleBusinessChange = b => {
    const { changeCurrentBusiness } = this.props;
    changeCurrentBusiness(b.value);
  };

  render() {
    const { t, lng, business, businesses } = this.props;
    const initialValues = getInitialValues(business);
    const businessesList = prepareBusinessesList(businesses);
    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          withMenu: true,
          menuItems: generateMenuItems(t, "additionalInformation"),
          select: {
            value: {
              value: business && business.id,
              label: business && business.name,
              src: business && business.logo.url
            },
            items: businessesList,
            handleChange: this.handleBusinessChange
          }
        }}
      >
        <Form {...{ t, initialValues, handleSubmit: this.handleSubmit }} />
      </AppLayout>
    );
  }
}

AdditionalInformation.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  updateBusiness: func.isRequired,
  changeCurrentBusiness: func.isRequired,
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
        changeCurrentBusiness: setCurrentBusiness
      }
    )(AdditionalInformation)
  )
);
