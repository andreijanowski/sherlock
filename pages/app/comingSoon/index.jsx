import React from "react";
import { compose } from "redux";
import { withTranslation } from "i18n";
import requireAuth from "lib/requireAuth";
import { func, string } from "prop-types";
import { connect } from "react-redux";
import AppLayout from "layout/App";
import CenteredSection from "components/CenteredSection";
import styled from "styled-components";

const namespaces = ["app"];

const Text = styled.p`
  max-width: 380px;
  text-align: center;
  font-size: ${p => p.theme.fontSizes.f21};
  font-weight: ${p => p.theme.fontWeights.bold};
`;

const ComingSoonPage = ({ t, lng }) => (
  <AppLayout t={t} lng={lng}>
    <CenteredSection>
      <Text>{t("comingSoon.title")}</Text>
      <Text>{t("comingSoon.caption")}</Text>
    </CenteredSection>
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
