import { Modal, StyledButton, ModalHeader } from "components";
import { WarningIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex } from "@rebass/grid";

const FinishOrdersModal = ({ isOpen, onClose, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <Flex flexDirection="column" alignItems="center" width={320}>
      <WarningIcon />
      <ModalHeader>{t("finishOrdersHeader")}</ModalHeader>
      <StyledButton
        onClick={onClose}
        styleName="blue"
        type="submit"
        width="100%"
      >
        {t("back")}
      </StyledButton>
    </Flex>
  </Modal>
);

FinishOrdersModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default FinishOrdersModal;
