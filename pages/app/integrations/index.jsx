import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import { categories } from "sections/integrations/utils";

const namespaces = ["forms", "app"];

class IntegrationsPage extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  render() {
    const { t, lng } = this.props;

    return (
      <AppLayout
        t={t}
        lng={lng}
        mainIcon="integrations"
        header={t("app:integrations")}
        withMenu
        menuItems={categories}
      >
        integrations
      </AppLayout>
    );
  }
}

IntegrationsPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect((state, { i18n }) => ({
      lng: (i18n && i18n.language) || "en"
    }))(IntegrationsPage)
  )
);
