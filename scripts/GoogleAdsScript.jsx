/* eslint-disable react/no-danger */
import { GOOGLE_ADS_IDS } from "consts";

export default () =>
  GOOGLE_ADS_IDS.MAIN ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${
          GOOGLE_ADS_IDS.MAIN
        }`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GOOGLE_ADS_IDS.MAIN}');
            `
        }}
      />
    </>
  ) : null;
