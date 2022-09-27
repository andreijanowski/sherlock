import React, { useCallback } from "react";
import { shape, func, string, bool } from "prop-types";

import { ButtonStyled } from "./styled";

const GoToReviewBoosterButton = ({ partooPage, setStartPage, startPage, connected, setConnected }) => {
  const onButtonClick = useCallback(() => {
    partooPage.navigate(connected ? startPage : 'partnerConnections');
    setConnected(prevState => !prevState);
    if (!connected) {
      setStartPage('reviewBooster');
    }
  }, [connected, startPage, partooPage]);

  return (
    <ButtonStyled onClick={onButtonClick}>
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
