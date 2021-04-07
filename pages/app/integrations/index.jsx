import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import {
  generatePartnersMenuItems,
  PARTNERS_CATEGORIES
} from "sections/integrations/utils";
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
        activeTab: PARTNERS_CATEGORIES.includes(getParam) ? getParam : "pos"
      });
    }
  };

  render() {
    const { t, lng, partners } = this.props;
    const { activeTab } = this.state;

    const preparedPartners = partners
      ? partners.filter(
          partner => partner.getIn(["attributes", "category"]) === activeTab
        )
      : [];

    return (
      <AppLayout
        showChosenWholesalers
        t={t}
        lng={lng}
        mainIcon="integrations"
        header={t("app:integrations")}
        withMenu
        menuItems={generatePartnersMenuItems(t, activeTab)}
      >
        {partners && partners.size > 0 && (
          <IntegrationsList partners={preparedPartners} t={t} />
        )}
      </AppLayout>
    );
  }
}

IntegrationsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  partners: shape()
};

IntegrationsPage.defaultProps = {
  partners: null
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect((state, { i18n }) => ({
      lng: (i18n && i18n.language) || "en",
      partners: state.getIn(["partners", "data", "partners", "partners"])
    }))(IntegrationsPage)
  )
);
