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
      events={parseCalendarEvents({
        events: caterings,
        currency: business && business.get("currency"),
        view: "year"
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
          lng: (i18n && i18n.language) || "en"
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(YearPage)
  )
);
