import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape, arrayOf } from "prop-types";
import CateringLayout from "sections/catering/Layout";
import { connect } from "react-redux";
import { setCurrentBusiness } from "actions/app";
import Year from "sections/catering/year";

const namespaces = ["catering", "app"];

class YearPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  constructor(p) {
    super();
    this.state = {
      view: {
        value: "year",
        label: p.t("year")
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
      changeCurrentBusiness,
      caterings
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
        <Year {...{ caterings, currency }} />
      </CateringLayout>
    );
  }
}

YearPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  business: shape(),
  changeCurrentBusiness: func.isRequired,
  businesses: arrayOf(shape()),
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
          businesses: state.getIn(["users", "profileBusinesses", "data"]),
          caterings: state.getIn(["caterings", "data", "caterings"])
        };
      },
      {
        changeCurrentBusiness: setCurrentBusiness
      }
    )(YearPage)
  )
);
