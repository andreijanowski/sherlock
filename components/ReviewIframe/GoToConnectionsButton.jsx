import React, { useCallback } from "react";
import { Box } from "@rebass/grid";
import { shape, func, string, bool } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

import { ButtonStyled } from "./styled";

const GoToConnectionsButton = ({
  partooPage,
  setStartPage,
  startPage,
  connected,
  setConnected
}) => {
  const onButtonClick = useCallback(() => {
    partooPage.navigate(connected ? startPage : "partnerConnections");
    setConnected(prevState => !prevState);
    if (!connected) {
      setStartPage("reviewManagement");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, partooPage, startPage]);

  return (
    <ButtonStyled onClick={onButtonClick} mr={3} gradient>
      <Box mr={2}>
        <FontAwesomeIcon icon={connected ? faArrowLeft : faPlus} />
      </Box>
      {connected ? "Back" : "Manage connections"}
    </ButtonStyled>
  );
};

GoToConnectionsButton.propTypes = {
  partooPage: shape().isRequired,
  startPage: string.isRequired,
  setStartPage: func.isRequired,
  connected: bool.isRequired,
  setConnected: func.isRequired
};

export default GoToConnectionsButton;
