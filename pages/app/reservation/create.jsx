import { useState } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import ReservationLayout from "sections/reservation/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { postReservation } from "actions/reservations";
import Form from "sections/reservation/create";
import { patchBusiness } from "actions/businesses";
import { Router } from "routes";

const namespaces = ["reservation", "app", "forms"];

const CreateReservationPage = ({
  t,
  lng,
  userId,
  tables,
  business,
  businessId,
  businesses,
  addReservation,
  updateBusiness,
  changeCurrentBusiness
}) => {
  const [isSending, setIsSending] = useState(false);
  const handleFormSubmit = ({ phoneCountry, ...values }) => {
    setIsSending(true);
    addReservation(
      businessId,
      {
        ...values,
        phoneCountryPrefix:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.prefix
            : undefined,
        phoneCountryCode:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.code
            : undefined
      },
      userId
    )
      .then(() => Router.pushRoute(`/${lng}/app/reservation/reservations`))
      .finally(() => setIsSending(false));
  };
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
      <Form
        {...{
          t,
          lng,
          isSending,
          handleFormSubmit,
          maxReservationSize: business && business.get("maxReservationSize")
        }}
      />
    </ReservationLayout>
  );
};

CreateReservationPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

CreateReservationPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  businesses: shape(),
  tables: shape(),
  businessId: string,
  userId: string,
  changeCurrentBusiness: func.isRequired,
  updateBusiness: func.isRequired,
  addReservation: func.isRequired
};

CreateReservationPage.defaultProps = {
  business: null,
  businessId: "",
  userId: "",
  businesses: null,
  tables: null
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
        const tables = state.getIn(["tables", "data", "tables"]);
        const users = state.getIn(["users", "profile", "data", "users"]);
        const user = users && users.first();

        return {
          business: business && business.get("attributes"),
          businessId: business && business.get("id"),
          tables,
          userId: user && user.get("id"),
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
        addReservation: postReservation,
        changeCurrentBusiness: setCurrentBusiness,
        updateBusiness: patchBusiness
      }
    )(CreateReservationPage)
  )
);
