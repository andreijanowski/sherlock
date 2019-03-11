import { Modal } from "components";
import { RejectModalIcon } from "icons";
import { shape, func, bool } from "prop-types";
import { Flex } from "@rebass/grid";
import { ModalHeader } from "./styled";

const RejectModal = ({ open, onClose }) => (
  <Modal {...{ open, onClose }}>
    <Flex flexDirection="column" alignItems="center">
      <RejectModalIcon />
      <ModalHeader>Choose the reason for canceling the order</ModalHeader>
    </Flex>
  </Modal>
);

RejectModal.propTypes = {
  event: shape().isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default RejectModal;
