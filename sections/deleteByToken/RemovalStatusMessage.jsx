import React from "react";
import { Link } from "components";
import { func, string, bool } from "prop-types";
import { ParagraphStyled, ToHome } from "./styled";

const RemovalStatusMessage = ({ t, lng, isSucceed, errorMessage }) =>
  isSucceed ? (
    <>
      <ParagraphStyled>{t("succeedRemoval")}</ParagraphStyled>
      <Link {...{ lng, route: "/" }}>
        <ToHome>{t("toHomePage")}</ToHome>
      </Link>
    </>
  ) : (
    <ParagraphStyled>{t(`failedRemoval-${errorMessage}`)}</ParagraphStyled>
  );

RemovalStatusMessage.propTypes = {
  t: func.isRequired,
  lng: string.isRequired,
  isSucceed: bool,
  errorMessage: string
};

RemovalStatusMessage.defaultProps = {
  isSucceed: null,
  errorMessage: null
};

export default RemovalStatusMessage;
