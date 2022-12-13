import React, { useCallback } from "react";
import { shape, func, string, bool } from "prop-types";
import { ButtonStyled } from "./styled";

const GoToReviewBoosterButton = ({
  partooPage,
  setStartPage,
  startPage,
  connected,
  setConnected
}) => {
  const onButtonClick = useCallback(() => {
    partooPage.navigate(connected ? startPage : "partnerConnections");
    setConnected(!connected);
    if (!connected) {
      setStartPage("reviewBooster");
    } else {
      setStartPage("reviewManagement");
    }
  }, [partooPage, connected, startPage, setConnected, setStartPage]);

  return (
    <ButtonStyled onClick={onButtonClick} gradient>
      {connected ? "Back" : "Review Booster"}
    </ButtonStyled>
  );
};

GoToReviewBoosterButton.propTypes = {
  partooPage: shape().isRequired,
  startPage: string.isRequired,
  setStartPage: func.isRequired,
  connected: bool.isRequired,
  setConnected: func.isRequired
};

export default GoToReviewBoosterButton;
