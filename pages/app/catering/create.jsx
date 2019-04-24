import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import CreateCateringForm from "sections/catering/create";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { postCatering } from "actions/caterings";
import { Router } from "routes";
import fileToBase64 from "utils/fileToBase64";
import { timeToNumber } from "components";

const namespaces = ["catering", "app", "forms"];

class CreateCateringPage extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    sending: false
  };

  handleFormSubmit = async ({
    phoneCountry,
    addressCountry,
    addressRegion,
    menu,
    currency,
    ...values
  }) => {
    const {
      createCatering,
      lng,
      business: { id }
    } = this.props;
    const newCatering = {
      ...values,
      from: values.from ? timeToNumber(values.from) : undefined,
      to: values.to ? timeToNumber(values.to) : undefined,
      phoneCountryPrefix:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.prefix
          : undefined,
      phoneCountryCode:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.code
          : undefined,
      addressCountryCode: addressCountry ? addressCountry.value : undefined,
      addressRegionCode: addressRegion ? addressRegion.value : undefined,
      menu: menu && menu.name ? await fileToBase64(menu) : undefined,
      currency: currency ? currency.value : undefined
    };
    this.setState({ sending: true });
    createCatering(newCatering, id)
      .then(() => Router.pushRoute(`/${lng}/app/catering/month`))
      .catch(() => this.setState({ sending: false }));
  };

  render() {
    const { t, lng, business, businesses, changeCurrentBusiness } = this.props;
    const { sending } = this.state;
    return (
      <CateringLayout
        {...{
          t,
          lng,
          business,
          businesses,
          changeCurrentBusiness,
          isAddActionHidden: true
        }}
      >
        <CreateCateringForm
          {...{ t, lng, sending, handleFormSubmit: this.handleFormSubmit }}
        />
      </CateringLayout>
    );
  }
}

CreateCateringPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape()),
  createCatering: func.isRequired
};

CreateCateringPage.defaultProps = {
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
        changeCurrentBusiness: setCurrentBusiness,
        createCatering: postCatering
      }
    )(CreateCateringPage)
  )
);
