import React from "react";
import { func, string } from "prop-types";

import { Trans } from "i18n";
import { DownloadButton, BlueSpan, InfoWrapper } from "./styled";

const InfoStep = ({ t, onClose, text, catalogName }) => (
  <InfoWrapper>
    <div>
      {text && (
        <Trans
          t={t}
          i18nKey={text}
          count={catalogName}
          components={[<BlueSpan />]}
        />
      )}
    </div>
    <DownloadButton onClick={onClose}>{t("menu_modal.got_it")}</DownloadButton>
  </InfoWrapper>
);

InfoStep.propTypes = {
  t: func.isRequired,
  onClose: func.isRequired,
  text: string.isRequired,
  catalogName: string.isRequired
};

export default InfoStep;
