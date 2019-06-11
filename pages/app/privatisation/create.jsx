import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import CreatePrivatisationForm from "sections/privatisation/create";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { postPrivatisation } from "actions/privatisations";
import { Router } from "routes";
import fileToBase64 from "utils/fileToBase64";
import { timeToNumber, CalendarLayout } from "components";

const namespaces = ["privatisation", "events", "app", "forms"];

class CreatePrivatisationPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
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
    const { createPrivatisation, lng, businessId } = this.props;
    const newPrivatisation = {
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
    createPrivatisation(newPrivatisation, businessId)
      .then(() => Router.pushRoute(`/${lng}/app/privatisation/month`))
      .catch(() => this.setState({ sending: false }));
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness
    } = this.props;
    const { sending } = this.state;
    return (
      <CalendarLayout
        {...{
          t,
          lng,
          business,
          businessId,
          businesses,
          changeCurrentBusiness,
          isAddActionHidden: true,
          eventType: "privatisation"
        }}
      >
        <CreatePrivatisationForm
          {...{ t, lng, sending, handleFormSubmit: this.handleFormSubmit }}
        />
      </CalendarLayout>
    );
  }
}

CreatePrivatisationPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: shape(),
  createPrivatisation: func.isRequired,
  businessId: string
};

CreatePrivatisationPage.defaultProps = {
  business: null,
  businessId: "",
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
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        createPrivatisation: postPrivatisation
      }
    )(CreatePrivatisationPage)
  )
);
