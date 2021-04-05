import React from "react";
import { compose } from "redux";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";

import AppLayout from "layout/App";
import TypeformContainer from "components/TypeformContainer";

const namespaces = ["app"];
const FORM_ID = "JcFCFNIl";

const Marketing = ({ t, lng }) => (
  <AppLayout
    t={t}
    lng={lng}
    mainIcon="marketing"
    header={t("app:adsAndMarketing")}
  >
    <TypeformContainer formId={FORM_ID} />
  </AppLayout>
);

Marketing.propTypes = {
  t: func.isRequired,
  lng: string.isRequired
};

const mapStateToProps = (state, { i18n }) => ({
  lng: (i18n && i18n.language) || "en"
});

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect(mapStateToProps)
)(Marketing);
