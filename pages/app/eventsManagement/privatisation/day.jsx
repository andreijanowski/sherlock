import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { CalendarLayout, BigCalendar } from "components";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import {
  setPrivatisationForEditing,
  sendPrivatisationOffer
} from "actions/privatisations";
import { patchBusiness } from "actions/businesses";

const namespaces = ["privatisation", "events", "app"];

const DayPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  addresses,
  changeCurrentBusiness,
  privatisations,
  setEditedPrivatisation,
  sendOffer,
  updateBusiness
}) => (
  <CalendarLayout
    {...{
      t,
      lng,
      view: {
        value: "day",
        label: t("events:day")
      },
      business,
      businessId,
      businesses,
      changeCurrentBusiness,
      updateBusiness,
      serviceActivationFieldName: "hasPrivateEvents",
      eventType: "privatisation"
    }}
  >
    <BigCalendar
      {...{
        t,
        lng,
        events: privatisations,
        addresses,
        currency: business && business.get("currency"),
        defaultView: "day",
        setEditedEvent: setEditedPrivatisation,
        sendOffer,
        timeZone: business && business.get("timezone"),
        height: 1500,
        eventType: "privatisation"
      }}
    />
  </CalendarLayout>
);

DayPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

DayPage.propTypes = {
  t: func.isRequired,
  setEditedPrivatisation: func.isRequired,
  sendOffer: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: shape(),
  privatisations: shape(),
  addresses: shape(),
  businessId: string,
  updateBusiness: func.isRequired
};

DayPage.defaultProps = {
  business: null,
  businessId: "",
  addresses: null,
  businesses: null,
  privatisations: null
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
          privatisations: state.getIn([
            "privatisations",
            "data",
            "privatisations"
          ]),
          addresses: state.getIn(["privatisations", "data", "addresses"]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        setEditedPrivatisation: setPrivatisationForEditing,
        sendOffer: sendPrivatisationOffer,
        updateBusiness: patchBusiness
      }
    )(DayPage)
  )
);
