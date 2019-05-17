import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, arrayOf } from "prop-types";
import Month from "sections/catering/month";
import CateringLayout from "sections/catering/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import { setCateringForEditing, sendCateringOffer } from "actions/caterings";

const namespaces = ["catering", "app"];

class MonthPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(p) {
    super();
    this.state = {
      view: {
        value: "month",
        label: p.t("month")
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
        <Month
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
      </CateringLayout>
    );
  }
}

MonthPage.propTypes = {
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

MonthPage.defaultProps = {
  business: null,
  businesses: null,
  businessId: "",
  addresses: null,
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
          businesses: state.getIn(["users", "profileBusinesses", "data"]),
          caterings: state.getIn(["caterings", "data", "caterings"]),
          addresses: state.getIn(["caterings", "data", "addresses"])
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
