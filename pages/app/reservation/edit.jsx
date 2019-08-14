import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import EditReservationForm from "sections/reservation/edit";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { Router } from "routes";
import ReservationLayout from "sections/reservation/Layout";
import { timeToNumber, LoadingIndicator } from "components";
import { patchReservation } from "actions/reservations";
import { patchBusiness } from "actions/businesses";

const namespaces = ["reservation", "app", "forms"];

class EditReservatoinPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    isSending: false
  };

  componentDidMount() {
    const { editedReservation, lng } = this.props;
    if (!editedReservation) {
      Router.pushRoute(`/${lng}/app/reservation/reservations`);
    }
  }

  handleFormSubmit = async ({ from, to, phoneCountry, ...values }, id) => {
    const { updateReservation, lng } = this.props;
    const updatedReservation = {
      ...values,
      from: from ? timeToNumber(from) : undefined,
      to: to ? timeToNumber(to) : undefined,
      phoneCountryPrefix:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.prefix
          : undefined,
      phoneCountryCode:
        phoneCountry && phoneCountry.value ? phoneCountry.value.code : undefined
    };
    this.setState({ isSending: true });
    updateReservation(id, updatedReservation)
      .then(() => Router.pushRoute(`/${lng}/app/reservation/reservations`))
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
      editedReservation,
      updateBusiness,
      tables
    } = this.props;
    const { isSending } = this.state;
    const isFormShown = !isSending && editedReservation;
    return (
      <ReservationLayout
        {...{
          t,
          lng,
          page: "create",
          currentBusinessId: businessId,
          business,
          tables,
          businesses,
          changeCurrentBusiness,
          updateBusiness
        }}
      >
        {isFormShown ? (
          <EditReservationForm
            {...{
              t,
              lng,
              editedReservation,
              handleFormSubmit: this.handleFormSubmit
            }}
          />
        ) : (
          <LoadingIndicator />
        )}
      </ReservationLayout>
    );
  }
}

EditReservatoinPage.propTypes = {
  editedReservation: shape(),
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  tables: shape(),
  changeCurrentBusiness: func.isRequired,
  updateReservation: func.isRequired,
  updateBusiness: func.isRequired,
  businesses: shape(),
  businessId: string
};

EditReservatoinPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  editedReservation: null,
  tables: null
};

export default requireAuth(true)(
  withNamespaces(namespaces)(
    connect(
      state => {
        const businessData = state.getIn(["users", "currentBusiness", "data"]);
        const business = businessData && businessData.get("businesses").first();
        const tables = state.getIn(["tables", "data", "tables"]);
        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ]),
          editedReservation: state.getIn(["reservations", "editedReservation"]),
          tables
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        updateReservation: patchReservation,
        updateBusiness: patchBusiness
      }
    )(EditReservatoinPage)
  )
);
