import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import CreateCateringForm from "sections/catering/create";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { postCatering } from "actions/caterings";
import { Router } from "routes";
import fileToBase64 from "utils/fileToBase64";
import { timeToNumber, CalendarLayout } from "components";

const namespaces = ["catering", "events", "app", "forms"];

class CreateCateringPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    isSending: false
  };

  handleFormSubmit = async ({
    phoneCountry,
    addressCountry,
    addressRegion,
    menu,
    currency,
    ...values
  }) => {
    const { createCatering, lng, businessId } = this.props;
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
    this.setState({ isSending: true });
    createCatering(newCatering, businessId)
      .then(() => Router.pushRoute(`/${lng}/app/catering/month`))
      .catch(() => this.setState({ isSending: false }));
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
    const { isSending } = this.state;
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
          eventType: "catering"
        }}
      >
        <CreateCateringForm
          {...{ t, lng, isSending, handleFormSubmit: this.handleFormSubmit }}
        />
      </CalendarLayout>
    );
  }
}

CreateCateringPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: shape(),
  createCatering: func.isRequired,
  businessId: string
};

CreateCateringPage.defaultProps = {
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
        createCatering: postCatering
      }
    )(CreateCateringPage)
  )
);
