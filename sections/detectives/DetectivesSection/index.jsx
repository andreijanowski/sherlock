import React from "react";
import { compose } from "redux";
import { withTranslation } from "i18n";
import { connect } from "react-redux";
import { withTheme } from "styled-components";
import { func, shape, string } from "prop-types";

import DetectivesRow from "components/Detectives/DetectivesRow";
import { DETECTIVES_CITIES } from "pages/app/detectives/config";

const namespaces = ["detectives"];

const DetectivesSection = ({
  t,
  theme,
  detectivesByCity,
  allDetectives,
  lng
}) => (
  <>
    {detectivesByCity &&
      DETECTIVES_CITIES.map(city => (
        <DetectivesRow
          key={city}
          t={t}
          theme={theme}
          title={city}
          detectives={detectivesByCity.get(city)}
          lng={lng}
        />
      ))}
    {allDetectives && (
      <DetectivesRow
        t={t}
        theme={theme}
        title={t("allOurDetectives")}
        detectives={allDetectives}
        lng={lng}
      />
    )}
  </>
);

DetectivesSection.propTypes = {
  t: func.isRequired,
  theme: shape().isRequired,
  detectivesByCity: shape().isRequired,
  allDetectives: shape().isRequired,
  lng: string.isRequired
};

export default compose(
  withTranslation(namespaces),
  withTheme,
  connect(state => {
    const detectivesByCity = state.getIn(["detectives", "data", "byCity"]);
    const allDetectives = state.getIn(["detectives", "data", "all"]);
    return {
      detectivesByCity,
      allDetectives
    };
  })
)(DetectivesSection);
