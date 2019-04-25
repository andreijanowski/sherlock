import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, string, shape } from "prop-types";
import { connect } from "react-redux";
import { connectStripe, setStripeData } from "actions/auth";
import { fetchProfileBusiness } from "actions/users";
import AppLayout from "layout/App";
import { LoadingIndicator, H2, Button, Link } from "components";
import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const namespaces = ["stripe", "forms", "app"];

const Container = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  p: [3, 4],
  width: 1
})`
  height: 100%;
`;

const Icon = styled(Flex).attrs({
  justifyContent: "center",
  alignItems: "center",
  mt: 4
})`
  background-color: rgb(
    ${p => (p.isSucceeded ? p.theme.colors.green : p.theme.colors.ruby)}
  );
  color: rgb(${p => p.theme.colors.white});
  width: 100px;
  height: 100px;
  border-radius: 50px;
  font-size: 70px;
`;

class StripeOauth extends PureComponent {
  static async getInitialProps({ ctx }) {
    const pageProps = loadTranslations(ctx, namespaces);

    return {
      ...pageProps
    };
  }

  state = {
    isConnectionWithStripeSucceeded: undefined,
    isConnectionWithStripeInProgress: true
  };

  componentDidMount() {
    const {
      connectWithStripe,
      setStripeConnectData,
      getBusiness,
      stripeConnectData: { businessId, state: stateFromApp },
      query: { code, state: stateFromStripe }
    } = this.props;

    if (code && stateFromStripe === stateFromApp) {
      connectWithStripe(code, businessId)
        .then(() => {
          getBusiness(businessId);
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
      setStripeConnectData({ businessId: null, state: null });
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
  setStripeConnectData: func.isRequired,
  getBusiness: func.isRequired,
  query: shape().isRequired,
  stripeConnectData: shape().isRequired
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({ stripeConnectData: state.auth.stripeConnectData }),
      {
        connectWithStripe: connectStripe,
        setStripeConnectData: setStripeData,
        getBusiness: fetchProfileBusiness
      }
    )(StripeOauth)
  )
);
