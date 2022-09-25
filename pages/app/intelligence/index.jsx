import { func, string } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { LoadingIndicator } from "components";
import requireAuth from "lib/requireAuth";
import AppLayout from "layout/App";
import { selectCurrentBusinessId } from "selectors/business";
import IntelligenceSection from "sections/intelligence/IntelligenceSection";

import { defaultLanguage, withTranslation } from "i18n";

const namespaces = ["app"];

// eslint-disable-next-line arrow-body-style
const IntelligencePage = ({ t, lng, businessId }) => {
  return (
    <AppLayout
      {...{
        t,
        lng,
        mainIcon: "intelligence",
        header: t("app:intelligence")
      }}
    >
      {!businessId ? (
        <LoadingIndicator />
      ) : (
        <IntelligenceSection businessId={businessId} t={t} />
      )}
    </AppLayout>
  );
};

IntelligencePage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  businessId: string.isRequired
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect((state, { i18n }) => ({
    lng: (i18n && i18n.language) || defaultLanguage,
    businessId: selectCurrentBusinessId(state)
  }))
)(IntelligencePage);
