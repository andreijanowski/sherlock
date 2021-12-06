import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@rebass/grid";
import { string, bool } from "prop-types";

import { useT } from "utils/hooks";
import { Modal } from "components";
import YoutubeVideo from "components/YoutubeVideo";
import { Container, Label } from "./styled";

const VideoButton = ({ url, isVertical }) => {
  const t = useT("landing");
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <Container isVertical={isVertical} onClick={showModal}>
        <Box {...(isVertical ? { mb: "24px" } : { mr: "24px" })}>
          <FontAwesomeIcon icon={faPlayCircle} size="4x" />
        </Box>
        <Label>{t("topSection.watchVideo")}</Label>
      </Container>
      {modalVisible && (
        <Modal open onClose={hideModal}>
          <YoutubeVideo url={url} />
        </Modal>
      )}
    </>
  );
};

VideoButton.propTypes = {
  url: string.isRequired,
  isVertical: bool
};

VideoButton.defaultProps = {
  isVertical: false
};

export default VideoButton;
