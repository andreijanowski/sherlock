import { Modal, Button, ModalHeader } from "components";
import { func, bool } from "prop-types";
import { RejectModalIcon } from "icons";
import { Flex, Box } from "@rebass/grid";

const MultipleTablesModal = ({ isOpen, onClose, onContinue, t }) => (
  <Modal {...{ open: isOpen, onClose }}>
    <Flex flexDirection="column" alignItems="center" width={[320, 480, 720]}>
      <RejectModalIcon />
      <ModalHeader>{t("multipleTablesHeader")}</ModalHeader>
      <Box width={1}>
        <Flex mx={-2}>
          <Box width={1 / 3} px={2}>
            <Button
              styleName="blue"
              type="button"
              width="100%"
              fullHeight
              onClick={onContinue}
            >
              {t("continueAnyway")}
            </Button>
          </Box>
          <Box width={1 / 3} px={2}>
            <Button
              styleName="blue"
              type="submit"
              width="100%"
              fullHeight
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
          </Box>
          <Box width={1 / 3} px={2}>
            <Button styleName="blue" type="submit" width="100%" fullHeight>
              {t("split")}
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Modal>
);

MultipleTablesModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  removeReservation: func.isRequired,
  t: func.isRequired,
  onContinue: func.isRequired
};

export default MultipleTablesModal;
