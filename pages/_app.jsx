import App, { Container } from "next/app";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { startApp } from "actions/app";
import { I18nextProvider } from "react-i18next";
import forceLanguageInUrl from "utils/forceLanguageInUrl";
import Layout from "layout";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import { PersistGate } from "redux-persist/integration/react";
import initialI18nInstance from "../i18n";
import createStore from "../data/store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    forceLanguageInUrl(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    pageProps.query = ctx.query;

    return { pageProps };
  }

  constructor(props) {
    super();
    props.startApp();
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
                <Layout {...{ pageProps, Component }} />
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
        startApp
      }
    )(MyApp)
  )
);
