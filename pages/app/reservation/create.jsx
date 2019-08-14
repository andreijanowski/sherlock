import { useState } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import ReservationLayout from "sections/reservation/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { postReservation } from "actions/reservations";
import Form from "sections/reservation/create";
import { patchBusiness } from "actions/businesses";
import { Router } from "routes";
import { timeToNumber } from "components";

const namespaces = ["reservation", "app", "forms"];

const CreateReservationPage = ({
  t,
  lng,
  tables,
  business,
  businessId,
  businesses,
  addReservation,
  updateBusiness,
  changeCurrentBusiness
}) => {
  const [isSending, setIsSending] = useState(false);
  const handleFormSubmit = ({ phoneCountry, from, to, ...values }) => {
    setIsSending(true);
    addReservation(businessId, {
      ...values,
      from: from ? timeToNumber(from) : undefined,
      to: to ? timeToNumber(to) : undefined,
      phoneCountryPrefix:
        phoneCountry && phoneCountry.value
          ? phoneCountry.value.prefix
          : undefined,
      phoneCountryCode:
        phoneCountry && phoneCountry.value ? phoneCountry.value.code : undefined
    })
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
  changeCurrentBusiness: func.isRequired,
  updateBusiness: func.isRequired,
  addReservation: func.isRequired
};

CreateReservationPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
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
          tables,
          businesses: state.getIn([
            "users",
            "profileBusinesses",
            "data",
            "businesses"
          ])
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
