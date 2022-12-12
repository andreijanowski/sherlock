import { StyledButton, Modal } from "components";
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
  onClose,
  btnCancelText,
  restyled,
  inverseColors,
  buttonRadius,
  maxwidth,
  disabled
}) => {
  const confirmStyle = restyled ? "accept" : "blue";
  const cancelStyle = "reject";

  return (
    <Modal open={open} onClose={onClose}>
      <Body maxwidth={maxwidth}>
        {withIcon && (
          <Icon>
            <FontAwesomeIcon
              color="#F3C73B"
              icon={faQuestionCircle}
              size="3x"
            />
          </Icon>
        )}
        <Content center={contentCenter}>{children}</Content>
        <ButtonsWrap>
          <StyledButton
            styleName={inverseColors ? cancelStyle : confirmStyle}
            onClick={onConfirm}
            radius={buttonRadius}
            disabled={disabled}
          >
            {btnOkText}
          </StyledButton>
          <StyledButton
            styleName={inverseColors ? confirmStyle : cancelStyle}
            onClick={onClose}
            radius={buttonRadius}
          >
            {btnCancelText}
          </StyledButton>
        </ButtonsWrap>
      </Body>
    </Modal>
  );
};

Confirm.defaultProps = {
  btnOkText: "Ok",
  btnCancelText: "Cancel",
  buttonRadius: "",
  children: null,
  contentCenter: false,
  restyled: false,
  inverseColors: false,
  open: false,
  withIcon: false,
  onClose: noop,
  onConfirm: noop,
  maxwidth: "",
  disabled: false
};
Confirm.propTypes = {
  btnOkText: string,
  btnCancelText: string,
  buttonRadius: string,
  children: node,
  contentCenter: bool,
  restyled: bool,
  inverseColors: bool,
  open: bool,
  withIcon: bool,
  onClose: func,
  onConfirm: func,
  maxwidth: string,
  disabled: bool
};

export default Confirm;
