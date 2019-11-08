import { useState } from "react";
import { Modal, Button, ModalHeader } from "components";
import { func, bool, number } from "prop-types";
import { RejectModalIcon } from "icons";
import { Flex, Box } from "@rebass/grid";
import SplitForm from "./SplitForm";

const MultipleTablesModal = ({
  isOpen,
  onClose,
  onContinue,
  onSplit,
  t,
  partySize
}) => {
  const [isSplitFormVisible, setIsSplitFormVisible] = useState(false);
  return isOpen ? (
    <Modal {...{ open: true, onClose }}>
      <Flex flexDirection="column" alignItems="center" width={[320, 480, 720]}>
        {isSplitFormVisible ? (
          <>
            <RejectModalIcon />
            <ModalHeader>{t("splitFormHeader", { partySize })}</ModalHeader>
            <SplitForm
              {...{
                t,
                partySize,
                onClose: () => setIsSplitFormVisible(false),
                onSplit: values => {
                  onSplit(values);
                  setIsSplitFormVisible(false);
                }
              }}
            />
          </>
        ) : (
          <>
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
                  <Button
                    styleName="blue"
                    type="submit"
                    width="100%"
                    fullHeight
                    onClick={() => setIsSplitFormVisible(true)}
                  >
                    {t("split")}
                  </Button>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </Modal>
  ) : null;
};

MultipleTablesModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onSplit: func.isRequired,
  removeReservation: func.isRequired,
  t: func.isRequired,
  onContinue: func.isRequired,
  partySize: number.isRequired
};

export default MultipleTablesModal;
