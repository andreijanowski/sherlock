import App, { Container } from "next/app";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { pathChanged as pathChangedAction } from "actions/app";
import forceLanguageInUrl from "utils/forceLanguageInUrl";
import Layout from "layout";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import isServer from "utils/isServer";
import NProgress from "nprogress";
import { Router } from "routes";
import { StripeProvider } from "react-stripe-elements";
import { STRIPE_API_KEY, GOOGLE_ANALYTICS_ID } from "consts";
import ReactGA from "react-ga";
import { fromJS } from "immutable";
import { refreshToken as refreshTokenAction } from "actions/auth";
import { appWithTranslation } from "../i18n";
import createStore from "../data/store";

ReactGA.initialize(GOOGLE_ANALYTICS_ID);
if (!isServer) {
  ReactGA.pageview(window.location.pathname + window.location.search);
}

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", route => {
  NProgress.done();
  ReactGA.pageview(route);
});
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    forceLanguageInUrl(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    pageProps.query = ctx.query;
    pageProps.pathname = ctx.pathname;

    return { pageProps };
  }

  state = {
    stripe: null
  };

  componentDidMount() {
    const {
      pageProps: { pathname },
      pathChanged
    } = this.props;
    pathChanged(pathname);
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
      });
    }
    try {
      const credentials = JSON.parse(
        window.localStorage.getItem("credentials")
      );
      if (credentials.refreshToken) {
        this.props.refreshToken({ refreshToken: credentials.refreshToken });
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  componentDidUpdate(prevProps) {
    const {
      pageProps: { pathname },
      pathChanged
    } = this.props;
    const { pathname: prevPathname } = prevProps.pageProps;
    if (pathname !== prevPathname) {
      pathChanged(pathname);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <StripeProvider stripe={this.state.stripe}>
              <Layout {...{ pageProps, Component }} />
            </StripeProvider>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(
  withReduxSaga(
    connect(
      state => ({ state }),
      {
        pathChanged: pathChangedAction,
        refreshToken: refreshTokenAction
      }
    )(appWithTranslation(MyApp))
  )
);
