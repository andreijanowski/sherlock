import { Button, Modal } from "components";
import { noop } from "lodash";
import { bool, func, node } from "prop-types";
import React from "react";
import { Body, ButtonsWrap } from "./styled";

const Confirm = ({ children, open, onConfirm, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Body>
      {children}
      <ButtonsWrap>
        <Button
          styleName="deepSkyBlue"
          width="100px !important"
          onClick={onConfirm}
        >
          Ok
        </Button>
        <Button styleName="orange" width="100px !important" onClick={onClose}>
          Cancel
        </Button>
      </ButtonsWrap>
    </Body>
  </Modal>
);

Confirm.defaultProps = {
  children: null,
  open: false,
  onClose: noop,
  onConfirm: noop
};
Confirm.propTypes = {
  children: node,
  open: bool,
  onClose: func,
  onConfirm: func
};

export default Confirm;
