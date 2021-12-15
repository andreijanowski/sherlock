import React, { useCallback, useState } from "react";
import { Box } from "@rebass/grid";
import { shape, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

import { ButtonStyled } from "./styled";

const CONNECTIONS_PAGE_ID = "partnerConnections";

const GoToConnectionsButton = ({ partooPage, startPage }) => {
  const [isConnectionsOpened, setIsConnectionsOpened] = useState(false);

  const onButtonClick = useCallback(() => {
    partooPage.navigate(isConnectionsOpened ? startPage : CONNECTIONS_PAGE_ID);
    setIsConnectionsOpened(prevState => !prevState);
  }, [isConnectionsOpened, partooPage, startPage]);

  return (
    <ButtonStyled onClick={onButtonClick}>
      <Box mr={2}>
        <FontAwesomeIcon icon={isConnectionsOpened ? faArrowLeft : faPlus} />
      </Box>
      {isConnectionsOpened ? "Back" : "Manage connections"}
    </ButtonStyled>
  );
};

GoToConnectionsButton.propTypes = {
  partooPage: shape().isRequired,
  startPage: string.isRequired
};

export default GoToConnectionsButton;
