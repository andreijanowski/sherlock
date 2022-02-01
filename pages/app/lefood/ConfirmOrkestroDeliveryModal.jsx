import React, { useState, useCallback } from "react";
import { bool, func } from "prop-types";

import { ModalHeader, RawCheckbox } from "components";
import { RejectModalIcon } from "icons";
import { Confirm } from "components/modals";

const ConfirmOrkestroDeliveryModal = ({ isOpen, onClose, onConfirm, t }) => {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  const onConfirmProxy = useCallback(() => {
    onConfirm(dontAskAgain);
  }, [dontAskAgain, onConfirm]);

  const checkboxInput = {
    value: dontAskAgain,
    onChange: e => setDontAskAgain(e.target.checked)
  };

  return (
    <Confirm
      onClose={onClose}
      onConfirm={onConfirmProxy}
      restyled
      open={isOpen}
      btnOkText={t("confirm")}
      btnCancelText={t("cancel")}
      contentCenter
    >
      <RejectModalIcon />
      <ModalHeader>{t("confirmOrkestroDelivery")}</ModalHeader>
      <RawCheckbox label={t("dontAskAgain")} input={checkboxInput} />
    </Confirm>
  );
};

ConfirmOrkestroDeliveryModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onConfirm: func.isRequired,
  t: func.isRequired
};

export default ConfirmOrkestroDeliveryModal;
