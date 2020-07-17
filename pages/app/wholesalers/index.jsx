import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import {
  generateWholesalersMenuItems,
  WHOLESALERS_CATEGORIES
} from "sections/integrations/utils";
import prepareBusinessesList from "utils/prepareBusinessesList";
import { setCurrentBusiness } from "actions/app";
import { postBusiness } from "actions/businesses";
import isServer from "utils/isServer";
import IntegrationsList from "sections/integrations";

const namespaces = ["forms", "app"];

class IntegrationsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    activeTab: ""
  };

  componentDidMount() {
    this.setActiveTab();
  }

  componentDidUpdate() {
    this.setActiveTab();
  }

  setActiveTab = () => {
    if (!isServer) {
      const urlParams = new URLSearchParams(window.location.search);
      const getParam = urlParams.get("category");

      this.setState({
        activeTab: WHOLESALERS_CATEGORIES.includes(getParam) ? getParam : "pos"
      });
    }
  };

  render() {
    const {
      t,
      lng,
      business,
      businessId,
      changeCurrentBusiness,
      addBusiness,
      businesses,
      wholesalers
    } = this.props;
    const { activeTab } = this.state;

    const preparedWholesalers = wholesalers
      ? wholesalers.filter(
          wholesaler =>
            wholesaler.getIn(["attributes", "wholesalerCategory"]) === activeTab
        )
      : [];

    return (
      <AppLayout
        t={t}
        lng={lng}
        mainIcon="wholesalers"
        header={t("app:wholesaler")}
        withMenu
        menuItems={generateWholesalersMenuItems(t, activeTab)}
        select={{
          value: {
            value: businessId,
            label:
              (business && business.get("name")) ||
              t("app:manageProfile.unnamedBusiness"),
            src: business && business.getIn(["logo", "url"])
          },
          items: prepareBusinessesList(t, businesses),
          handleChange: b => changeCurrentBusiness(b.value),
          bottomAction: {
            text: t("app:manageProfile.addNewBusiness"),
            handleClick: () => addBusiness()
          },
          withImage: true
        }}
      >
        {wholesalers && wholesalers.size > 0 && (
          <IntegrationsList partners={preparedWholesalers} t={t} />
        )}
      </AppLayout>
    );
  }
}

IntegrationsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  changeCurrentBusiness: func.isRequired,
  addBusiness: func.isRequired,
  business: shape(),
  businessId: string,
  businesses: shape(),
  wholesalers: shape()
};

IntegrationsPage.defaultProps = {
  businesses: null,
  business: null,
  businessId: "",
  wholesalers: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect((state, { i18n }) => {
      const businessData = state.getIn(["users", "currentBusiness", "data"]);
      const business = businessData && businessData.get("businesses").first();

      return {
        lng: (i18n && i18n.language) || "en",
        business: business && business.get("attributes"),
        businessId: business && business.get("id"),
        businesses: state.getIn([
          "users",
          "profileBusinesses",
          "data",
          "businesses"
        ]),
        changeCurrentBusiness: setCurrentBusiness,
        addBusiness: postBusiness,
        wholesalers: state.getIn([
          "wholesalers",
          "data",
          "wholesalers",
          "partners"
        ])
      };
    })(IntegrationsPage)
  )
);
