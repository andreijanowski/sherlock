/* eslint-disable react/no-danger */
import { LINKEDIN_ADS_ID } from "consts";

export default () =>
  LINKEDIN_ADS_ID ? (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `_linkedin_partner_id = "${LINKEDIN_ADS_ID}"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); (function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s); console.log("done");})();`
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_ADS_ID}&fmt=gif" />`
        }}
      />
    </>
  ) : null;
