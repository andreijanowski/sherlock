import React from "react";
import { compose } from "redux";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";

import AppLayout from "layout/App";
import TypeformContainer from "components/TypeformContainer";
import { TYPEFORM_IDS } from "consts";

const namespaces = ["app"];

const Photography = ({ t, lng }) => (
  <AppLayout
    t={t}
    lng={lng}
    mainIcon="photography"
    header={t("app:photography")}
  >
    <TypeformContainer formId={TYPEFORM_IDS.PHOTOGRAPHY} />
  </AppLayout>
);

Photography.propTypes = {
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
)(Photography);
