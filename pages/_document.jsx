import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import {
  FacebookPixelScript,
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
  HubspotChatScript,
  LinkedinAdsScript
} from "scripts";
import { PARTOO_SDK_URL } from "consts";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang={this.props.__NEXT_DATA__.query.lng}>
        <Head>
          <meta charSet="UTF-8" />
          <GoogleTagManagerScript />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>
            Foodetective For Business ∙ We make restaurants’ lives much easier !
          </title>
          <meta
            name="description"
            content="We're not just another restaurants software, Foodetective For Business is the best all in one platform that has everything you need to sell online, on social media, or in person."
          />
          <meta
            content="p12xj66v3yf1269crgdmussddpwxq8"
            name="facebook-domain-verification"
          />
          <meta property="og:image" content="/static/preview.jpg" />
          {this.props.styleTags}
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/static/fonts.css" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="/static/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <FacebookPixelScript />
          <HubspotChatScript />
          <LinkedinAdsScript />
          <script src={PARTOO_SDK_URL} type="text/javascript" />
        </Head>
        <body>
          <GoogleTagManagerNoscript />
          <Main />
          <NextScript />
        </body>
        <script id="stripe-js" src="https://js.stripe.com/v3/" async />
      </html>
    );
  }
}
