import React from "react";
import { Link } from "components";
import { func, string, bool } from "prop-types";
import { ParagraphStyled, ToLogin } from "sections/confirm/styled";

const RejectInvitationStatusMessage = ({ t, lng, isSucceed, errorMessage }) =>
  isSucceed ? (
    <>
      <ParagraphStyled>{t("succeedRejection")}</ParagraphStyled>
      <Link {...{ lng, route: "/" }}>
        <ToLogin>{t("toHomePage")}</ToLogin>
      </Link>
    </>
  ) : (
    <ParagraphStyled>{t(`failedRejection-${errorMessage}`)}</ParagraphStyled>
  );

RejectInvitationStatusMessage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  isSucceed: bool,
  errorMessage: string
};

RejectInvitationStatusMessage.defaultProps = {
  isSucceed: null,
  errorMessage: null
};

export default RejectInvitationStatusMessage;
