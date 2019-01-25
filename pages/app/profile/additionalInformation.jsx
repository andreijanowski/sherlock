import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import AppLayout from "layout/App";
import Form from "sections/profile/additionalInformation";
import { connect } from "react-redux";
import { patchBusiness } from "actions/businesses";
import { getInitialValues } from "sections/profile/additionalInformation/utils";

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
      const { updateBusiness, slug } = this.props;
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
      return updateBusiness(slug, requestValues);
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  render() {
    const { t, lng, slug, business } = this.props;
    const initialValues = getInitialValues(business);
    return (
      <AppLayout
        {...{
          mainIcon: "profile",
          header: t("header"),
          t,
          lng,
          slug
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
  slug: string.isRequired,
  business: shape(),
  updateBusiness: func.isRequired
};

AdditionalInformation.defaultProps = {
  business: null
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({
        business: state.users.currentBusiness.data
      }),
      { updateBusiness: patchBusiness }
    )(AdditionalInformation)
  )
);
