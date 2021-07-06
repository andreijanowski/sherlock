import React from "react";
import { func } from "prop-types";
import { H2, Modal } from "components";
import { ParagraphStyled } from "./styled";
import StripeButton from "./StripeButton";

const StripeUserModal = ({ t, onClose }) => (
  <Modal {...{ open: true, onClose }}>
    <H2 textAlign="center">{t("connectWithStripe")}</H2>
    <ParagraphStyled>{t("connectWithStripeSubheading")}</ParagraphStyled>
    <StripeButton>{t("connectWithStripe")}</StripeButton>
  </Modal>
);

StripeUserModal.propTypes = {
  t: func.isRequired,
  onClose: func.isRequired
};

export default StripeUserModal;
