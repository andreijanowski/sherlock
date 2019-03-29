import React from "react";
import { Link } from "components";
import { func, string, bool } from "prop-types";
import { ParagraphStyled, ToLogin } from "./styled";

const ConfirmationStatusMessage = ({ t, lng, isSucceed, errorMessage }) =>
  isSucceed ? (
    <>
      <ParagraphStyled>{t("succeedConfirmation")}</ParagraphStyled>
      <Link {...{ lng, route: "/login" }}>
        <ToLogin>{t("toLoginPage")}</ToLogin>
      </Link>
    </>
  ) : (
    <ParagraphStyled>{t(`failedConfirmation-${errorMessage}`)}</ParagraphStyled>
  );

ConfirmationStatusMessage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  isSucceed: bool,
  errorMessage: string
};

ConfirmationStatusMessage.defaultProps = {
  isSucceed: null,
  errorMessage: null
};

export default ConfirmationStatusMessage;
