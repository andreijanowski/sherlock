import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import CreatePrivatisationForm from "sections/privatisation/create";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import {
  postPrivatisation,
  sendPrivatisationOffer
} from "actions/privatisations";
import { Router } from "routes";
import fileToBase64 from "utils/fileToBase64";
import { timeToNumber, CalendarLayout } from "components";
import { patchBusiness } from "actions/businesses";

const namespaces = ["privatisation", "events", "app", "forms"];

class CreatePrivatisationPage extends PureComponent {
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
    from,
    to,
    ...values
  }) => {
    const { createPrivatisation, lng, businessId, sendOffer } = this.props;
    const newPrivatisation = {
      ...values,
      from: from ? timeToNumber(from, "start") : undefined,
      to: to ? timeToNumber(to, "end") : undefined,
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
    createPrivatisation(newPrivatisation, businessId)
      .then(res => {
        sendOffer(res.rawData.data.id);
        Router.pushRoute(`/${lng}/app/privatisation/month?date=${values.date}`);
      })
      .catch(() => this.setState({ isSending: false }));
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      businesses,
      changeCurrentBusiness,
      updateBusiness
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
          updateBusiness,
          serviceActivationFieldName: "hasPrivateEvents",
          isAddActionHidden: true,
          eventType: "privatisation"
        }}
      >
        <CreatePrivatisationForm
          {...{ t, lng, isSending, handleFormSubmit: this.handleFormSubmit }}
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
  sendOffer: func.isRequired,
  updateBusiness: func.isRequired,
  businessId: string
};

CreatePrivatisationPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
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
        changeCurrentBusiness: setCurrentBusiness,
        createPrivatisation: postPrivatisation,
        sendOffer: sendPrivatisationOffer,
        updateBusiness: patchBusiness
      }
    )(CreatePrivatisationPage)
  )
);
