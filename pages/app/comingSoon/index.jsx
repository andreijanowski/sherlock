import React from "react";
import { compose } from "redux";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";

import AppLayout from "layout/App";
import { Wrapper, Text } from "./styled";

const namespaces = ["app"];

const ComingSoonPage = ({ t, lng }) => (
  <AppLayout t={t} lng={lng}>
    <Wrapper>
      <Text>{t("comingSoon.title")}</Text>
      <Text>{t("comingSoon.caption")}</Text>
    </Wrapper>
  </AppLayout>
);

ComingSoonPage.propTypes = {
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
)(ComingSoonPage);
