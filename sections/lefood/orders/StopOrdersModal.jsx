import { Modal, Button } from "components";
import { StopOrdersModalIcon } from "icons";
import { shape, func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";
import { ModalHeader } from "./styled";

const StopOrdersModal = ({ open, onClose, t }) => (
  <Modal {...{ open, onClose }}>
    <Flex flexDirection="column" alignItems="center">
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
            <Button styleName="blue" type="submit" width="100%">
              {t("yes")}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Modal>
);

StopOrdersModal.propTypes = {
  event: shape().isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
  t: func.isRequired
};

export default StopOrdersModal;
