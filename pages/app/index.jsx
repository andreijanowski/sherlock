import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, bool } from "prop-types";
import AppLayout from "layout/App";
import { Flex } from "@rebass/grid";
import { connect } from "react-redux";
import { Router } from "routes";
import Cookies from "js-cookie";
import { LoadingIndicator } from "components";
import { OnboardingModal } from "components/modals";

const namespaces = ["app"];

class AppLanding extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  componentDidMount() {
    this.redirectToDashboard();
  }

  componentDidUpdate() {
    this.redirectToDashboard();
  }

  redirectToDashboard = () => {
    const { canRedirect, lng } = this.props;
    const hasOnboarding = Cookies.get("Onboarding");
    if (canRedirect && !hasOnboarding) {
      Router.pushRoute(`/${lng}/app/dashboard/`);
    }
  };

  render() {
    const { t, lng } = this.props;
    const hasOnboarding = Cookies.get("Onboarding");
    return (
      <AppLayout
        {...{
          t,
          lng
        }}
      >
        <Flex pt={6} width={1} alignItems="center" justifyContent="center">
          {!hasOnboarding && <LoadingIndicator />}
        </Flex>
        {hasOnboarding && <OnboardingModal />}
      </AppLayout>
    );
  }
}

AppLanding.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  canRedirect: bool.isRequired
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect((state, { i18n }) => ({
      canRedirect:
        !state.getIn(["users", "currentBusiness", "isFetching"]) &&
        state.getIn(["users", "currentBusiness", "isSucceeded"]),
      lng: (i18n && i18n.language) || "en"
    }))(AppLanding)
  )
);
