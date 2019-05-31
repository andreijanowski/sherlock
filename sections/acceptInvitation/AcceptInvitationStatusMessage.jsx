import React from "react";
import { func, string, bool } from "prop-types";
import { ParagraphStyled } from "sections/confirm/styled";

const AcceptInvitationStatusMessage = ({ t, isSucceed, errorMessage }) =>
  isSucceed ? (
    <ParagraphStyled>{t("succeedAcceptation")}</ParagraphStyled>
  ) : (
    <ParagraphStyled>{t(`failedAcceptation-${errorMessage}`)}</ParagraphStyled>
  );

AcceptInvitationStatusMessage.propTypes = {
  t: func.isRequired,
  isSucceed: bool,
  errorMessage: string
};

AcceptInvitationStatusMessage.defaultProps = {
  isSucceed: null,
  errorMessage: null
};

export default AcceptInvitationStatusMessage;
