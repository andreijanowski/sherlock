import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { CalendarLayout, BigCalendar } from "components";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";

const namespaces = ["catering", "events", "app"];

const MonthPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  addresses,
  changeCurrentBusiness,
  caterings,
  setEditedCatering,
  sendOffer
}) => (
  <CalendarLayout
    {...{
      t,
      lng,
      view: {
        value: "month",
        label: t("events:month")
      },
      business,
      businessId,
      businesses,
      changeCurrentBusiness,
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
        setEditedEvent: setEditedCatering,
        defaultView: "month",
        timeZone: business && business.get("timezone"),
        sendOffer,
        height: 620,
        eventType: "catering"
      }}
    />
  </CalendarLayout>
);

MonthPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

MonthPage.propTypes = {
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: shape(),
  caterings: shape(),
  addresses: shape(),
  businessId: string
};

MonthPage.defaultProps = {
  business: null,
  businesses: null,
  businessId: "",
  addresses: null,
  caterings: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => {
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
          caterings: state.getIn(["caterings", "data", "caterings"]),
          addresses: state.getIn(["caterings", "data", "addresses"]),
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        setEditedCatering: setCateringForEditing,
        sendOffer: sendCateringOffer
      }
    )(MonthPage)
  )
);
