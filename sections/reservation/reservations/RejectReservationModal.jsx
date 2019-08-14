import { Modal, Button, ModalHeader } from "components";
import { func, bool } from "prop-types";
import { RejectModalIcon } from "icons";
import { Flex, Box } from "@rebass/grid";

const RejectReservationModal = ({ isOpen, onClose, removeReservation, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <Flex flexDirection="column" alignItems="center" width={320}>
      <RejectModalIcon />
      <ModalHeader>{t("rejectReservationHeader")}</ModalHeader>
      <Box width={1}>
        <Flex mx={-2}>
          <Box width={1 / 2} px={2}>
            <Button
              styleName="blue"
              type="button"
              onClick={onClose}
              width="100%"
            >
              {t("no")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button
              styleName="blue"
              type="submit"
              width="100%"
              onClick={removeReservation}
            >
              {t("yes")}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Modal>
);

RejectReservationModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  removeReservation: func.isRequired,
  t: func.isRequired
};

export default RejectReservationModal;
