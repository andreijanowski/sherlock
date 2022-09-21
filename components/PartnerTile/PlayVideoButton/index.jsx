import React, { useCallback, useState } from "react";
import { Flex, Box } from "@rebass/grid";
import { func, string, bool } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "components/index";
import YoutubeVideo from "components/YoutubeVideo";
import { OutlineButton } from "../styled";

const PlayVideoButton = ({ t, url, big, isLP, trackClickEvent }) => {
  const [showModal, setShowModal] = useState(false);

  const onPlayVideoClick = useCallback(() => {
    setShowModal(true);
    trackClickEvent("VIDEO");
  }, [trackClickEvent]);

  const onModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <Flex
        as={OutlineButton}
        big={big}
        onClick={onPlayVideoClick}
        justifyContent="center"
        alignItems="center"
        styleName="outlineBlue"
      >
        <Box mr={2}>{t(isLP ? "app:Video" : "app:playVideo")}</Box>
        <FontAwesomeIcon icon={faPlay} />
      </Flex>
      {showModal && (
        <Modal open onClose={onModalClose}>
          <YoutubeVideo url={url} />
        </Modal>
      )}
    </>
  );
};

PlayVideoButton.propTypes = {
  url: string.isRequired,
  t: func.isRequired,
  big: bool,
  isLP: bool,
  trackClickEvent: func
};

PlayVideoButton.defaultProps = {
  big: false,
  isLP: false,
  trackClickEvent: null
};

export default PlayVideoButton;
