import { PureComponent } from "react";
import SettingsLayout from "sections/settings/Layout";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
// import BillingSettings from "sections/settings/billing";
import loadTranslations from "utils/loadTranslations";

const namespaces = ["app"];

class Billing extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  render() {
    const { t, lng } = this.props;
    return (
      <SettingsLayout {...{ t, lng, currentPage: "billing" }}>
        {/* <BillingSettings {...{ t }} /> */}
      </SettingsLayout>
    );
  }
}

Billing.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

export default requireAuth(true)(withI18next(namespaces)(Billing));
