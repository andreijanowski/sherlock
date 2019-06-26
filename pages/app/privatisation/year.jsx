import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import {
  CalendarLayout,
  FullYearCalendar,
  parseCalendarEvents
} from "components";
import moment from "moment";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";

const namespaces = ["privatisation", "events", "app"];

const YearPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  changeCurrentBusiness,
  privatisations
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
      eventType: "privatisation"
    }}
  >
    <FullYearCalendar
      startDate={moment().startOf("year")}
      endDate={moment().endOf("year")}
      events={parseCalendarEvents({
        events: privatisations,
        currency: business && business.get("currency")
      })}
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
  businessId: string
};

YearPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  privatisations: null
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
          privatisations: state.getIn([
            "privatisations",
            "data",
            "privatisations"
          ])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(YearPage)
  )
);
