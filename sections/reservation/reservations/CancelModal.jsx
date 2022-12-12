import { Modal, StyledButton, ModalHeader } from "components";
import { RejectModalIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

const CancelModal = ({ isOpen, onClose, t, handleCancelSubmit }) =>
  isOpen ? (
    <Modal {...{ open: true, onClose }}>
      <Flex flexDirection="column" alignItems="center" width={320}>
        <RejectModalIcon />
        <ModalHeader>{t("cancelModalHeader")}</ModalHeader>
        <Box width={1}>
          <Flex mx={-2}>
            <Box width={1 / 2} px={2}>
              <StyledButton
                styleName="blue"
                type="button"
                onClick={onClose}
                width="100%"
              >
                {t("cancel")}
              </StyledButton>
            </Box>
            <Box width={1 / 2} px={2}>
              <StyledButton
                styleName="blue"
                type="button"
                onClick={handleCancelSubmit}
                width="100%"
              >
                {t("confirm")}
              </StyledButton>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  ) : null;

CancelModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  handleCancelSubmit: func.isRequired,
  t: func.isRequired
};

export default CancelModal;
