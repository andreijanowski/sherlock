import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import ReservationLayout from "sections/reservation/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import Form from "sections/reservation/create";
import { patchBusiness } from "actions/businesses";

const namespaces = ["reservation", "app", "forms"];

const CreateReservationPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  updateBusiness,
  changeCurrentBusiness
}) => (
  <ReservationLayout
    {...{
      t,
      lng,
      page: "reservations",
      currentBusinessId: businessId,
      business,
      businesses,
      changeCurrentBusiness,
      updateBusiness
    }}
  >
    <Form {...{ t, lng, isSending: false, handleFormSubmit: () => null }} />
  </ReservationLayout>
);

CreateReservationPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

CreateReservationPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
  businessId: string,
  changeCurrentBusiness: func.isRequired,
  updateBusiness: func.isRequired
};

CreateReservationPage.defaultProps = {
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
        updateBusiness: patchBusiness
      }
    )(CreateReservationPage)
  )
);
