import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import EditPrivatisationForm from "sections/privatisation/edit";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { Router } from "routes";
import { LoadingIndicator, CalendarLayout } from "components";
import {
  patchPrivatisation,
  sendPrivatisationOffer
} from "actions/privatisations";
import fileToBase64 from "utils/fileToBase64";
import { convertToCents } from "utils/price";
import { patchBusiness } from "actions/businesses";

const namespaces = ["privatisation", "events", "app", "forms"];

class EditPrivatisationPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    isSending: false
  };

  componentDidMount() {
    const { editedPrivatisation, lng } = this.props;
    if (!editedPrivatisation) {
      Router.pushRoute(`/${lng}/app/events-management/privatisation/month`);
    }
  }

  handleFormSubmit = async ({ menu, currency, priceCents, ...values }, id) => {
    const { updatePrivatisation, lng, sendOffer } = this.props;
    const updatedPrivatisation = {
      ...values
    };
    if (menu && menu.name) {
      updatedPrivatisation.menu = await fileToBase64(menu);
    }
    if (currency && currency.value) {
      updatedPrivatisation.currency = currency.value;
    }
    if (priceCents) {
      updatedPrivatisation.priceCents = convertToCents(priceCents);
    }
    this.setState({ isSending: true });
    updatePrivatisation(id, updatedPrivatisation)
      .then(res => {
        sendOffer(res.rawData.data.id);
        Router.pushRoute(
          `/${lng}/app/events-management/privatisation/month?date=${values.date}`
        );
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
      editedPrivatisation,
      updateBusiness
    } = this.props;
    const { isSending } = this.state;
    const isFormShown = !isSending && editedPrivatisation;
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
        {isFormShown ? (
          <EditPrivatisationForm
            {...{
              t,
              lng,
              editedPrivatisation,
              handleFormSubmit: this.handleFormSubmit
            }}
          />
        ) : (
          <LoadingIndicator />
        )}
      </CalendarLayout>
    );
  }
}

EditPrivatisationPage.propTypes = {
  editedPrivatisation: shape(),
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  updatePrivatisation: func.isRequired,
  sendOffer: func.isRequired,
  businesses: shape(),
  updateBusiness: func.isRequired,
  businessId: string
};

EditPrivatisationPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  editedPrivatisation: null
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
          editedPrivatisation: state.getIn([
            "privatisations",
            "editedPrivatisation"
          ]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        updatePrivatisation: patchPrivatisation,
        sendOffer: sendPrivatisationOffer,
        updateBusiness: patchBusiness
      }
    )(EditPrivatisationPage)
  )
);
