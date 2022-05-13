import React from "react";
import { func, string } from "prop-types";

import { Trans } from "i18n";
import { DownloadButton, BlueSpan, InfoWrapper } from "./styled";
import { LABEL } from "./utils";

const InfoStep = ({ t, onClose, text }) => (
  <InfoWrapper>
    <div>
      {text && (
        <Trans t={t} i18nKey={text} count={LABEL} components={[<BlueSpan />]} />
      )}
    </div>
    <DownloadButton onClick={onClose}>{t("menu_modal.got_it")}</DownloadButton>
  </InfoWrapper>
);

InfoStep.propTypes = {
  t: func.isRequired,
  onClose: func.isRequired,
  text: string.isRequired
};

export default InfoStep;
