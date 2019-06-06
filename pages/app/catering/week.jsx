import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import Week from "sections/catering/week";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";
import isServer from "utils/isServer";

const namespaces = ["catering", "app"];

const WeekPage = ({
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
  <CateringLayout
    {...{
      t,
      lng,
      view: {
        value: "week",
        label: t("week")
      },
      business,
      businessId,
      businesses,
      changeCurrentBusiness
    }}
  >
    {!isServer && (
      <Week
        {...{
          t,
          lng,
          caterings,
          addresses,
          currency: business && business.get("currency"),
          setEditedCatering,
          sendOffer,
          timeZone: business && business.get("timezone")
        }}
      />
    )}
  </CateringLayout>
);

WeekPage.getInitialProps = async () => ({
  namespacesRequired: namespaces
});

WeekPage.propTypes = {
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

WeekPage.defaultProps = {
  business: null,
  businesses: null,
  caterings: null,
  addresses: null,
  businessId: ""
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
          caterings: state.getIn(["caterings", "data", "caterings"]),
          addresses: state.getIn(["caterings", "data", "addresses"])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness,
        setEditedCatering: setCateringForEditing,
        sendOffer: sendCateringOffer
      }
    )(WeekPage)
  )
);
