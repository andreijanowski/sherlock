import App from "next/app";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import forceLanguageInUrl from "utils/forceLanguageInUrl";
import Layout from "layout";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import isServer from "utils/isServer";
import NProgress from "nprogress";
import { Router } from "routes";
import { StripeProvider } from "react-stripe-elements";
import { GOOGLE_ADS_IDS, GOOGLE_ANALYTICS_ID, STRIPE_API_KEY } from "consts";
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
import { handleGtagEvent } from "utils/gtag";
import { appWithTranslation } from "../i18n";
import createStore from "../data/store";
import "../styles/tailwind.css";
import "../styles/quill.snow.css";
import "react-tooltip/dist/react-tooltip.css";

config.autoAddCss = false;

const handlePageViewWithAds = () => {
  if (!GOOGLE_ADS_IDS.PAGE_VIEW_EVENT) return;

  handleGtagEvent({
    event: "event",
    action: "conversion",
    to: GOOGLE_ADS_IDS.PAGE_VIEW_EVENT
  });
};

ReactGA.initialize(GOOGLE_ANALYTICS_ID);
if (!isServer) {
  ReactGA.pageview(window.location.pathname + window.location.search);
  handlePageViewWithAds();
}

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
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", route => {
      NProgress.done();
      ReactGA.pageview(route);
      handlePageViewWithAds();
    });
    Router.events.on("routeChangeError", () => NProgress.done());

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
    if (typeof window === "undefined") {
      return <></>;
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StripeProvider stripe={this.state.stripe}>
            <Layout {...{ pageProps, Component }} />
          </StripeProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(createStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(
  withReduxSaga(
    connect(state => ({ state }), {
      pathChanged: pathChangedAction,
      loadUserData: loadUserDataAction,
      refreshToken: refreshTokenAction,
      setAppInstanceUuid: setInstanceUuid
    })(appWithTranslation(MyApp))
  )
);
