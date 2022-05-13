import React from "react";
import { func } from "prop-types";
import Cookies from "js-cookie";

import { InfoIcon } from "components/Icons";
import { Wrapper, DownloadButton, UploadButton, InfoLabel } from "./styled";
import { STEPS } from "./utils";

const OptionsStep = ({ t, setStep, onShowImportModalClick }) => {
  const hasPendingSynchPOS = Cookies.get("SynchPOS");

  return (
    <Wrapper>
      {hasPendingSynchPOS && (
        <InfoLabel top="8px">
          <InfoIcon />
          {t("menu_modal.disclaimer")}
        </InfoLabel>
      )}
      <DownloadButton
        styleName="smallBlue"
        onClick={() => setStep(STEPS.DROPDOWN)}
      >
        {t("menu_modal.download_pos")}
      </DownloadButton>
      <DownloadButton
        styleName="smallBlue"
        onClick={() => setStep(STEPS.SYNCHRONIZE)}
      >
        {t("menu_modal.synchronize")}
      </DownloadButton>
      <UploadButton onClick={onShowImportModalClick}>
        {t("menu_modal.upload_csv")}
      </UploadButton>
    </Wrapper>
  );
};

OptionsStep.propTypes = {
  t: func.isRequired,
  setStep: func.isRequired,
  onShowImportModalClick: func.isRequired
};

export default OptionsStep;
