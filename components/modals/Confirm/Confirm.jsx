import { Button, Modal } from "components";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { noop } from "lodash";
import { bool, func, node, string } from "prop-types";
import React from "react";
import { Body, Content, Icon, ButtonsWrap } from "./styled";

const Confirm = ({
  btnOkText,
  children,
  contentCenter,
  open,
  withIcon,
  onConfirm,
  onClose
}) => (
  <Modal open={open} onClose={onClose}>
    <Body>
      {withIcon && (
        <Icon>
          <FontAwesomeIcon color="#F3C73B" icon={faQuestionCircle} size="3x" />
        </Icon>
      )}
      <Content center={contentCenter}>{children}</Content>
      <ButtonsWrap>
        <Button styleName="blue" onClick={onConfirm}>
          {btnOkText}
        </Button>
        <Button styleName="reject" width="100px !important" onClick={onClose}>
          Cancel
        </Button>
      </ButtonsWrap>
    </Body>
  </Modal>
);

Confirm.defaultProps = {
  btnOkText: "Ok",
  children: null,
  contentCenter: false,
  open: false,
  withIcon: false,
  onClose: noop,
  onConfirm: noop
};
Confirm.propTypes = {
  btnOkText: string,
  children: node,
  contentCenter: bool,
  open: bool,
  withIcon: bool,
  onClose: func,
  onConfirm: func
};

export default Confirm;
