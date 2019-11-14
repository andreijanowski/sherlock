import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import EditCateringForm from "sections/catering/edit";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { Router } from "routes";
import { timeToNumber, LoadingIndicator, CalendarLayout } from "components";
import { patchCatering, sendCateringOffer } from "actions/caterings";
import fileToBase64 from "utils/fileToBase64";
import { convertToCents } from "utils/price";

const namespaces = ["catering", "events", "app", "forms"];

class EditCateringPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    isSending: false
  };

  componentDidMount() {
    const { editedCatering, lng } = this.props;
    if (!editedCatering) {
      Router.pushRoute(`/${lng}/app/catering/month`);
    }
  }

  handleFormSubmit = async ({ menu, currency, priceCents, ...values }, id) => {
    const { updateCatering, lng, sendOffer } = this.props;
    const updatedCatering = {
      ...values,
      from: timeToNumber(values.from, "start"),
      to: timeToNumber(values.to, "end")
    };
    if (menu && menu.name) {
      updatedCatering.menu = await fileToBase64(menu);
    }
    if (currency && currency.value) {
      updatedCatering.currency = currency.value;
    }
    if (priceCents) {
      updatedCatering.priceCents = convertToCents(priceCents);
    }
    this.setState({ isSending: true });
    updateCatering(id, updatedCatering)
      .then(res => {
        sendOffer(res.rawData.data.id);
        Router.pushRoute(`/${lng}/app/catering/month?date=${values.date}`);
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
      editedCatering
    } = this.props;
    const { isSending } = this.state;
    const isFormShown = !isSending && editedCatering;
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
        {isFormShown ? (
          <EditCateringForm
            {...{
              t,
              lng,
              editedCatering,
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

EditCateringPage.propTypes = {
  editedCatering: shape(),
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  updateCatering: func.isRequired,
  sendOffer: func.isRequired,
  businesses: shape(),
  businessId: string
};

EditCateringPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  editedCatering: null
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
          editedCatering: state.getIn(["caterings", "editedCatering"]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        updateCatering: patchCatering,
        sendOffer: sendCateringOffer
      }
    )(EditCateringPage)
  )
);
