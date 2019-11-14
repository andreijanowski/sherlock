import { Modal, Button, ModalHeader } from "components";
import { RejectModalIcon } from "icons";
import { func, bool } from "prop-types";
import { Flex, Box } from "@rebass/grid";

const RemoveModal = ({ isOpen, onClose, t, handleRemove }) =>
  isOpen ? (
    <Modal {...{ open: true, onClose }}>
      <Flex flexDirection="column" alignItems="center" width={320}>
        <RejectModalIcon />
        <ModalHeader>{t("removeModalHeader")}</ModalHeader>
        <Box width={1}>
          <Flex mx={-2}>
            <Box width={1 / 2} px={2}>
              <Button
                styleName="blue"
                type="button"
                onClick={onClose}
                width="100%"
              >
                {t("cancel")}
              </Button>
            </Box>
            <Box width={1 / 2} px={2}>
              <Button
                styleName="blue"
                type="button"
                onClick={handleRemove}
                width="100%"
              >
                {t("confirm")}
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  ) : null;

RemoveModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  handleRemove: func.isRequired,
  t: func.isRequired
};

export default RemoveModal;
