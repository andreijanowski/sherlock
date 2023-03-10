import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { func, bool, string } from "prop-types";
import { withTranslation } from "i18n";

import AppLayout from "layout/App";
import requireAuth from "lib/requireAuth";
import TopDetectiveSection from "sections/detectives/TopDetectiveSection";
import DetectivesSection from "sections/detectives/DetectivesSection";
import { LoadingIndicator } from "components";

import { FOODETECTIVE_URL } from "consts";

export const DETECTIVES_CITIES = [
  "Paris",
  "London",
  "Geneva",
  "Berlin",
  "Madrid"
];

export const getDetectiveUrl = ({ lng, detective }) =>
  `${FOODETECTIVE_URL}/${lng}/public-profile/${detective.getIn([
    "attributes",
    "slug"
  ])}`;

const namespaces = ["detectives", "app"];

const DetectivesPage = ({ t, lng, isLoading }) => (
  <AppLayout t={t} lng={lng} mainIcon="detectives" header={t("app:detectives")}>
    {isLoading && <LoadingIndicator hasTransparentBackground />}
    <TopDetectiveSection lng={lng} />
    <DetectivesSection lng={lng} />
  </AppLayout>
);

DetectivesPage.getInitialPageProps = async () => ({
  namespacesRequired: namespaces
});

DetectivesPage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  isLoading: bool.isRequired
};

export default compose(
  requireAuth(true),
  withTranslation(namespaces),
  connect((state, { i18n }) => ({
    lng: (i18n && i18n.language) || "en",
    isLoading: state.getIn(["detectives", "isFetching"])
  }))
)(DetectivesPage);
