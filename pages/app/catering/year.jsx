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

const namespaces = ["catering", "events", "app"];

const YearPage = ({
  t,
  lng,
  business,
  businessId,
  businesses,
  changeCurrentBusiness,
  caterings
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
      eventType: "catering"
    }}
  >
    <FullYearCalendar
      startDate={moment().startOf("year")}
      endDate={moment().endOf("year")}
      events={parseCalendarEvents({
        events: caterings,
        currency: business && business.get("currency"),
        view: "year"
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
  caterings: shape(),
  businessId: string
};

YearPage.defaultProps = {
  business: null,
  businessId: "",
  businesses: null,
  caterings: null
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
          caterings: state.getIn(["caterings", "data", "caterings"])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(YearPage)
  )
);
