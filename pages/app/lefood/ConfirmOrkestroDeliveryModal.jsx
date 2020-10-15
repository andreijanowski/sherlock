import { Modal, Button, ModalHeader } from "components";
import { WarningIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

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
      <Box width={1}>
        <Flex mx={-2}>
          <Box width={1 / 2} px={2}>
            <Button
              onClick={onConfirm}
              styleName="blue"
              type="submit"
              width="100%"
            >
              {t("confirm")}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button
              onClick={onClose}
              styleName="blue"
              type="submit"
              width="100%"
            >
              {t("cancel")}
            </Button>
          </Box>
        </Flex>
      </Box>
      <Flex />
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
