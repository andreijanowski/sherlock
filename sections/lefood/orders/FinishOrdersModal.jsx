import { Modal, Button } from "components";
import { FinishOrdersModalIcon } from "icons";
import { shape, func, bool } from "prop-types";
import { Flex } from "@rebass/grid";
import { ModalHeader } from "./styled";

const FinishOrdersModal = ({ open, onClose, t }) => (
  <Modal {...{ open, onClose }}>
    <Flex flexDirection="column" alignItems="center">
      <FinishOrdersModalIcon />
      <ModalHeader>{t("finishOrdersHeader")}</ModalHeader>
      <Button onClick={onClose} styleName="blue" type="submit" width="100%">
        {t("back")}
      </Button>
    </Flex>
  </Modal>
);

FinishOrdersModal.propTypes = {
  event: shape().isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default FinishOrdersModal;
