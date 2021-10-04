import React, { useCallback, useState } from "react";
import { Flex, Box } from "@rebass/grid";
import { func, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "components";
import { IntegrationButton } from "./styled";
import Video from "./Video";

const PlayVideoButton = ({ t, url }) => {
  const [showModal, setShowModal] = useState(false);

  const onPlayVideoClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const onModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Flex
        as={IntegrationButton}
        onClick={onPlayVideoClick}
        justifyContent="center"
        alignItems="center"
        styleName="outlineBlue"
      >
        <Box mr={2}>{t("app:watchVideo")}</Box>
        <FontAwesomeIcon icon={faPlay} />
      </Flex>
      {showModal && (
        <Modal open onClose={onModalClose}>
          <Video url={url} />
        </Modal>
      )}
    </>
  );
};

PlayVideoButton.propTypes = {
  url: string.isRequired,
  t: func.isRequired
};

export default PlayVideoButton;
