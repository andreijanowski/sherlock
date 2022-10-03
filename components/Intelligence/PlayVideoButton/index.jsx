import React, { useCallback, useState } from "react";
import { Flex, Box } from "@rebass/grid";
import { func, string, bool } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "components/index";
import YoutubeVideo from "components/YoutubeVideo";
import { OutlineButton } from "./styled";

const IntelligenceVideoButton = ({
  t,
  url,
  big,
  isLP,
  trackClickEvent,
  styleName
}) => {
  const [showModal, setShowModal] = useState(false);

  const onPlayVideoClick = useCallback(() => {
    setShowModal(true);
    if (trackClickEvent) {
      trackClickEvent("VIDEO");
    }
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
        styleName={styleName}
      >
        <Box mr={2}>{t(isLP ? "Video" : "Video")}</Box>
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

IntelligenceVideoButton.propTypes = {
  url: string.isRequired,
  t: func.isRequired,
  big: bool,
  isLP: bool,
  trackClickEvent: func,
  styleName: string
};

IntelligenceVideoButton.defaultProps = {
  big: false,
  isLP: false,
  trackClickEvent: null,
  styleName: ""
};

export default IntelligenceVideoButton;
