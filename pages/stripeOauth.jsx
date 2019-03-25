import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import requireAuth from "lib/requireAuth";
import loadTranslations from "utils/loadTranslations";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
import { connectStripe, setStripeData } from "actions/auth";

const namespaces = ["stripe", "forms"];

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
      stripeConnectData: { businessId, state: stateFromApp },
      query: { code, state: stateFromStripe }
    } = this.props;

    if (code && stateFromStripe === stateFromApp) {
      connectWithStripe(code, businessId)
        .then(() =>
          this.setState({
            isConnectionWithStripeInProgress: false,
            isConnectionWithStripeSucceeded: true
          })
        )
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
    const {
      isConnectionWithStripeInProgress,
      isConnectionWithStripeSucceeded
    } = this.state;
    return `isConnectionWithStripeInProgress: ${isConnectionWithStripeInProgress}, isConnectionWithStripeSucceeded: ${isConnectionWithStripeSucceeded}`;
  }
}

StripeOauth.propTypes = {
  // t: func.isRequired,
  // lng: string.isRequired,
  connectWithStripe: func.isRequired,
  setStripeConnectData: func.isRequired,
  query: shape().isRequired,
  stripeConnectData: shape().isRequired
};

export default requireAuth(true)(
  withI18next(namespaces)(
    connect(
      state => ({ stripeConnectData: state.auth.stripeConnectData }),
      { connectWithStripe: connectStripe, setStripeConnectData: setStripeData }
    )(StripeOauth)
  )
);
