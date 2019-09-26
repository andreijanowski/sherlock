import { PureComponent } from "react";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { connectStripe } from "actions/auth";
import { fetchProfileBusiness } from "actions/users";
import AppLayout from "layout/App";
import { LoadingIndicator, H2, Button, Link } from "components";
import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const namespaces = ["stripe", "forms", "app"];

const Container = styled(Flex).attrs(() => ({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: [3, 4],
  width: 1
}))`
  height: 100%;
`;

const Icon = styled(Flex).attrs(() => ({
  justifyContent: "center",
  alignItems: "center",
  mt: 4
}))`
  width: 100px;
  height: 100px;
  color: rgb(${p => p.theme.colors.white});
  font-size: 70px;
  background-color: rgb(
    ${p => (p.isSucceeded ? p.theme.colors.green : p.theme.colors.ruby)}
  );
  border-radius: 50px;
`;

class StripeOauth extends PureComponent {
  static async getInitialProps() {
    return {
      namespacesRequired: namespaces
    };
  }

  state = {
    isConnectionWithStripeSucceeded: undefined,
    isConnectionWithStripeInProgress: true
  };

  componentDidMount() {
    const {
      connectWithStripe,
      getBusiness,
      query: { code, state: stateFromStripe }
    } = this.props;

    let stripeConnectBusinessId;
    let stripeConnectState;

    try {
      const stripeConnectData = JSON.parse(
        window.localStorage.getItem("stripeConnectData")
      );
      stripeConnectBusinessId = stripeConnectData.businessId;
      stripeConnectState = stripeConnectData.state;
      // eslint-disable-next-line no-empty
    } catch (e) {}

    if (code && stateFromStripe === stripeConnectState) {
      connectWithStripe(code, stripeConnectBusinessId)
        .then(() => {
          getBusiness(stripeConnectBusinessId);
          this.setState({
            isConnectionWithStripeInProgress: false,
            isConnectionWithStripeSucceeded: true
          });
        })
        .catch(() =>
          this.setState({
            isConnectionWithStripeInProgress: false,
            isConnectionWithStripeSucceeded: false
          })
        );
      window.localStorage.removeItem("stripeConnectData");
    } else {
      this.setState({
        isConnectionWithStripeInProgress: false,
        isConnectionWithStripeSucceeded: false
      });
    }
  }

  render() {
    const { t, lng } = this.props;
    const {
      isConnectionWithStripeInProgress,
      isConnectionWithStripeSucceeded
    } = this.state;

    return (
      <AppLayout
        {...{
          t,
          lng,
          mainIcon: "leFood",
          header: t("header")
        }}
      >
        {isConnectionWithStripeInProgress ? (
          <LoadingIndicator />
        ) : (
          <Container>
            <H2>
              {isConnectionWithStripeSucceeded ? t("success") : t("fail")}
            </H2>
            <Icon isSucceeded={isConnectionWithStripeSucceeded}>
              <FontAwesomeIcon
                icon={[
                  "fa",
                  isConnectionWithStripeSucceeded ? "check" : "times"
                ]}
              />
            </Icon>
            <Link lng={lng} route="/app/lefood/orders/">
              <Button styleName="blue">{t("goToOrders")}</Button>
            </Link>
          </Container>
        )}
      </AppLayout>
    );
  }
}

StripeOauth.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  connectWithStripe: func.isRequired,
  getBusiness: func.isRequired,
  query: shape().isRequired,
  stripeConnectData: shape().isRequired
};

export default requireAuth(true)(
  withTranslation(namespaces)(
    connect(
      (state, { i18n }) => ({ lng: (i18n && i18n.language) || "en" }),
      {
        connectWithStripe: connectStripe,
        getBusiness: fetchProfileBusiness
      }
    )(StripeOauth)
  )
);
