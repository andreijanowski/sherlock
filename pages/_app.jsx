import App, { Container } from "next/app";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { pathChanged as pathChangedAction } from "actions/app";
import { I18nextProvider } from "react-i18next";
import forceLanguageInUrl from "utils/forceLanguageInUrl";
import Layout from "layout";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import { PersistGate as PersistGateClient } from "redux-persist/integration/react";
import isServer from "utils/isServer";
import NProgress from "nprogress";
import { Router } from "routes";
import { StripeProvider } from "react-stripe-elements";
import { STRIPE_API_KEY, GOOGLE_ANALYTICS_ID } from "consts";
import ReactGA from "react-ga";
import initialI18nInstance from "../i18n";
import createStore from "../data/store";

ReactGA.initialize(GOOGLE_ANALYTICS_ID);

const PersistGateServer = ({ children }) => children;
const PersistGate = isServer ? PersistGateServer : PersistGateClient;

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
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
      });
    }
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
    const { i18n, initialI18nStore, initialLanguage } = pageProps || {};
    return (
      <Container>
        <Provider store={store}>
          <PersistGate persistor={store.__persistor}>
            <ThemeProvider theme={theme}>
              <I18nextProvider
                i18n={i18n || initialI18nInstance}
                initialI18nStore={initialI18nStore}
                initialLanguage={initialLanguage}
              >
                <StripeProvider stripe={this.state.stripe}>
                  <Layout {...{ pageProps, Component }} />
                </StripeProvider>
              </I18nextProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })(
    connect(
      null,
      {
        pathChanged: pathChangedAction
      }
    )(MyApp)
  )
);
