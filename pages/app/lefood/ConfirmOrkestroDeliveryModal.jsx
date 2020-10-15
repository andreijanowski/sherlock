import { Modal, Button, ModalHeader } from "components";
import { WarningIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex } from "@rebass/grid";

const ConfirmOrkestroDeliveryModal = ({ isOpen, onClose, onConfirm, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      width={320}
    >
      <WarningIcon />
      <ModalHeader>{t("confirmOrkestroDelivery")}</ModalHeader>
      <Button onClick={onConfirm} styleName="blue" type="submit" width="100%">
        {t("yes")}
      </Button>
      <Button onClick={onClose} styleName="blue" type="submit" width="100%">
        {t("back")}
      </Button>
    </Flex>
  </Modal>
);

ConfirmOrkestroDeliveryModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onConfirm: func.isRequired,
  t: func.isRequired
};

export default ConfirmOrkestroDeliveryModal;
