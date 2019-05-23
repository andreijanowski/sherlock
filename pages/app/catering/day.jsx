import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import Day from "sections/catering/day";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";
import isServer from "utils/isServer";

const namespaces = ["catering", "app"];

class DayPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(p) {
    super();
    this.state = {
      view: {
        value: "day",
        label: p.t("day")
      }
    };
  }

  render() {
    const {
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
    } = this.props;
    const { view } = this.state;
    const { currency } = business || {};
    return (
      <CateringLayout
        {...{
          t,
          lng,
          view,
          business,
          businessId,
          businesses,
          changeCurrentBusiness
        }}
      >
        {!isServer && (
          <Day
            {...{
              t,
              lng,
              caterings,
              addresses,
              currency,
              setEditedCatering,
              sendOffer,
              timeZone: business && business.get("timezone")
            }}
          />
        )}
      </CateringLayout>
    );
  }
}

DayPage.propTypes = {
  t: func.isRequired,
  setEditedCatering: func.isRequired,
  sendOffer: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape()),
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
    )(DayPage)
  )
);
