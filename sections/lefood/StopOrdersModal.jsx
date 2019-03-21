import { Modal, Button } from "components";
import { StopOrdersModalIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { ModalHeader } from "./styled";

const StopOrdersModal = ({ isOpen, onClose, stopOrders, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <Flex flexDirection="column" alignItems="center" width={320}>
      <StopOrdersModalIcon />
      <ModalHeader>{t("stopOrdersHeader")}</ModalHeader>
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
              onClick={stopOrders}
            >
              {t("yes")}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Modal>
);

StopOrdersModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  stopOrders: func.isRequired,
  t: func.isRequired
};

export default StopOrdersModal;