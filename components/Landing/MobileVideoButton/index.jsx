import React, { useCallback, useState } from "react";
import { Box } from "@rebass/grid";
import { string } from "prop-types";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useT } from "utils/hooks";
import { Modal } from "components";
import YoutubeVideo from "components/YoutubeVideo";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";

const MobileVideoButton = ({ url }) => {
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
      <Button
        width={1}
        variant={BUTTON_VARIANT.B2BSECONDARY}
        onClick={showModal}
      >
        {t("topSection.watchVideo")}
        <Box ml={3}>
          <FontAwesomeIcon icon={faPlay} />
        </Box>
      </Button>
      {modalVisible && (
        <Modal open onClose={hideModal}>
          <YoutubeVideo url={url} />
        </Modal>
      )}
    </>
  );
};

MobileVideoButton.propTypes = {
  url: string.isRequired
};

export default MobileVideoButton;
