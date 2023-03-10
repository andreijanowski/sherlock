import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import {
  CalendarLayout,
  FullYearCalendar,
  parseCalendarEvents
} from "components";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { patchBusiness } from "actions/businesses";

const namespaces = ["privatisation", "events", "app"];

const YearPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  changeCurrentBusiness,
  privatisations,
  updateBusiness
}) => (
  <CalendarLayout
    {...{
      t,
      lng,
      view: {
        value: "year",
        label: t("events:year")
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
    <FullYearCalendar
      events={parseCalendarEvents({
        events: privatisations,
        currency: business && business.get("currency")
      })}
      lng={lng}
    />
  </CalendarLayout>
);

YearPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

YearPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: shape(),
  privatisations: shape(),
  updateBusiness: func.isRequired,
  businessId: string
};

YearPage.defaultProps = {
  business: null,
  businessId: "",
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
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        updateBusiness: patchBusiness
      }
    )(YearPage)
  )
);
