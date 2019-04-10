/* eslint-disable react/no-danger */
import { GOOGLE_ANALYTICS_ID } from "consts";

export default () =>
  GOOGLE_ANALYTICS_ID ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GOOGLE_ANALYTICS_ID}');`
        }}
      />
    </>
  ) : null;
