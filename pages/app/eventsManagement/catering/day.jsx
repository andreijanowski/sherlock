import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { CalendarLayout, BigCalendar } from "components";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";
import { patchBusiness } from "actions/businesses";

const namespaces = ["catering", "events", "app"];

const DayPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  addresses,
  changeCurrentBusiness,
  caterings,
  setEditedCatering,
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
      serviceActivationFieldName: "hasCatering",
      eventType: "catering"
    }}
  >
    <BigCalendar
      {...{
        t,
        lng,
        events: caterings,
        addresses,
        currency: business && business.get("currency"),
        defaultView: "day",
        setEditedEvent: setEditedCatering,
        sendOffer,
        timeZone: business && business.get("timezone"),
        height: 1500,
        eventType: "catering"
      }}
    />
  </CalendarLayout>
);

DayPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

DayPage.propTypes = {
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  updateBusiness: func.isRequired,
  businesses: shape(),
  caterings: shape(),
  addresses: shape(),
  businessId: string
};

DayPage.defaultProps = {
  business: null,
  businessId: "",
  addresses: null,
  businesses: null,
  caterings: null
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
          caterings: state.getIn(["caterings", "data", "caterings"]),
          addresses: state.getIn(["caterings", "data", "addresses"]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        setEditedCatering: setCateringForEditing,
        sendOffer: sendCateringOffer,
        updateBusiness: patchBusiness
      }
    )(DayPage)
  )
);
