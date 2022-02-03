import App, { Container } from "next/app";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import {
  Provider as ErrorBoundaryProvider,
  ErrorBoundary
} from "@rollbar/react";
import forceLanguageInUrl from "utils/forceLanguageInUrl";
import Layout from "layout";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import isServer from "utils/isServer";
import NProgress from "nprogress";
import { Router } from "routes";
import { StripeProvider } from "react-stripe-elements";
import { STRIPE_API_KEY, GOOGLE_ANALYTICS_ID, rollbarConfig } from "consts";
import ReactGA from "react-ga";
import { fromJS } from "immutable";
import Cookies from "js-cookie";
import uuid from "uuid/v1";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {
  loadUserData as loadUserDataAction,
  refreshToken as refreshTokenAction
} from "actions/auth";
import { pathChanged as pathChangedAction, setInstanceUuid } from "actions/app";
import { requestNotificationsPermission } from "utils/misc";
import { appWithTranslation } from "../i18n";
import createStore from "../data/store";

config.autoAddCss = false;

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

    await forceLanguageInUrl(ctx);

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
    window.addEventListener("beforeunload", () => {
      if (window.localStorage.getItem("refreshingToken") === "true") {
        window.localStorage.setItem("refreshingToken", "false");
        window.localStorage.setItem("refreshingTokenAppInstance", null);
      }
    });
    const {
      pageProps: { pathname },
      pathChanged
    } = this.props;
    pathChanged(pathname);
    if (Cookies.get("isAuthenticated")) {
      const { loadUserData, refreshToken, setAppInstanceUuid } = this.props;
      setAppInstanceUuid(uuid());
      refreshToken();
      loadUserData();
    }
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
      });
    }
    requestNotificationsPermission();
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
      <ErrorBoundaryProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Container>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <StripeProvider stripe={this.state.stripe}>
                  <Layout {...{ pageProps, Component }} />
                </StripeProvider>
              </ThemeProvider>
            </Provider>
          </Container>
        </ErrorBoundary>
      </ErrorBoundaryProvider>
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
        loadUserData: loadUserDataAction,
        refreshToken: refreshTokenAction,
        setAppInstanceUuid: setInstanceUuid
      }
    )(appWithTranslation(MyApp))
  )
);
