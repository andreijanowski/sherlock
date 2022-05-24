import React from "react";
import { func } from "prop-types";

import { InfoIcon } from "components/Icons";
import { DownloadButton, InfoLabel, InfoWrapper } from "./styled";

const SynchronizeStep = ({ t, onConfirm }) => (
  <InfoWrapper>
    <InfoLabel>
      <InfoIcon />
      {t("menu_modal.synchronize_warning")}
    </InfoLabel>
    <DownloadButton onClick={onConfirm}>
      {t("menu_modal.synchronize_anyway")}
    </DownloadButton>
  </InfoWrapper>
);

SynchronizeStep.propTypes = {
  t: func.isRequired,
  onConfirm: func.isRequired
};

export default SynchronizeStep;
