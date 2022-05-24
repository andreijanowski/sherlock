import React, { useState } from "react";
import { useT } from "utils/hooks";
import { func, string } from "prop-types";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import {
  downloadPOSMenu as downloadPOSMenuAction,
  uploadPOSMenu as uploadPOSMenuAction
} from "actions/businesses";
import { Modal } from "components";
import { ModalStyles } from "./styled";
import OptionsStep from "./OptionsStep";
import DropdownStep from "./DropdownStep";
import InfoStep from "./InfoStep";
import SynchronizeStep from "./SynchronizeStep";
import { STEPS, LABEL } from "./utils";

const MenuModal = ({
  businessId,
  onClose,
  onShowImportModalClick,
  downloadPOSMenu,
  uploadPOSMenu,
  catalogName
}) => {
  const [step, setStep] = useState(STEPS.OPTIONS);
  const t = useT("lefood");

  const confirmSubmit = () => {
    downloadPOSMenu(businessId);
    Cookies.set("SynchPOS", true);
    setStep(STEPS.INFO);
  };

  const onSynchConfirm = () => {
    uploadPOSMenu(businessId);
    Cookies.remove("SynchPOS");
    setStep(STEPS.SYNCH_INFO);
  };

  return (
    <>
      <ModalStyles />
      <Modal open onClose={onClose}>
        {step === STEPS.OPTIONS && (
          <OptionsStep
            t={t}
            setStep={setStep}
            onShowImportModalClick={onShowImportModalClick}
          />
        )}
        {step === STEPS.DROPDOWN && (
          <DropdownStep
            t={t}
            confirmSubmit={confirmSubmit}
            onClose={onClose}
            catalogName={catalogName}
          />
        )}
        {step === STEPS.INFO && (
          <InfoStep
            t={t}
            onClose={onClose}
            text="menu_modal.info"
            catalogName={catalogName}
          />
        )}
        {step === STEPS.SYNCHRONIZE && (
          <SynchronizeStep t={t} onConfirm={onSynchConfirm} />
        )}
        {step === STEPS.SYNCH_INFO && (
          <InfoStep t={t} onClose={onClose} text="menu_modal.success" />
        )}
      </Modal>
    </>
  );
};

MenuModal.defaultProps = {
  catalogName: LABEL
};

MenuModal.propTypes = {
  onShowImportModalClick: func.isRequired,
  onClose: func.isRequired,
  businessId: string.isRequired,
  downloadPOSMenu: func.isRequired,
  uploadPOSMenu: func.isRequired,
  catalogName: string
};

export default connect(
  null,
  { downloadPOSMenu: downloadPOSMenuAction, uploadPOSMenu: uploadPOSMenuAction }
)(MenuModal);
