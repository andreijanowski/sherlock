import { PureComponent } from "react";
import { withNamespaces } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, bool } from "prop-types";
import AppLayout from "layout/App";
import { Flex } from "@rebass/grid";
import { connect } from "react-redux";
import { Router } from "routes";
import { LoadingIndicator } from "components";

const namespaces = ["app"];

class AppLanding extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  componentDidMount() {
    this.redirectToProfile();
  }

  componentDidUpdate() {
    this.redirectToProfile();
  }

  redirectToProfile = () => {
    const { canRedirect, lng } = this.props;
    if (canRedirect) {
      Router.pushRoute(`/${lng}/app/profile/basic-information/`);
    }
  };

  render() {
    const { t, lng } = this.props;
    return (
      <AppLayout
        {...{
          t,
          lng
        }}
      >
        <Flex pt={6} width={1} alignItems="center" justifyContent="center">
          <LoadingIndicator />
        </Flex>
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
  withNamespaces(namespaces)(
    connect(state => ({
      canRedirect:
        !state.users.currentBusiness.isFetching &&
        state.users.currentBusiness.isSucceeded
    }))(AppLanding)
  )
);
