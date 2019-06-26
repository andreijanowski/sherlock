import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import EditPrivatisationForm from "sections/privatisation/edit";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { Router } from "routes";
import { timeToNumber, LoadingIndicator, CalendarLayout } from "components";
import { patchPrivatisation } from "actions/privatisations";
import fileToBase64 from "utils/fileToBase64";
import { convertToCents } from "utils/price";

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
      Router.pushRoute(`/${lng}/app/privatisation/month`);
    }
  }

  handleFormSubmit = async ({ menu, currency, priceCents, ...values }, id) => {
    const { updatePrivatisation, lng } = this.props;
    const updatedPrivatisation = {
      ...values,
      from: timeToNumber(values.from),
      to: timeToNumber(values.to)
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
      .then(() => Router.pushRoute(`/${lng}/app/privatisation/month`))
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
      editedPrivatisation
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
  businesses: shape(),
  businessId: string
};

EditPrivatisationPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  editedPrivatisation: null
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
          ]),
          editedPrivatisation: state.getIn([
            "privatisations",
            "editedPrivatisation"
          ])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        updatePrivatisation: patchPrivatisation
      }
    )(EditPrivatisationPage)
  )
);
