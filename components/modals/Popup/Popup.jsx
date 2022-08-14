import React, { useState, useCallback, useEffect } from "react";
import { bool, string, func } from "prop-types";
import { Modal } from "components";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import Cookies from "js-cookie";
import { API_URL, OAUTH_PUBLIC_CLIENT_ID, OAUTH_CALLBACK_URL } from "consts";
import uuid from "uuid/v1";
import { useT } from "utils/hooks";
import { connect } from "react-redux";
import { logout as logoutAction } from "actions/auth";
import { H3, Subtitle } from "components/styleguide/Typography";
import {
  Image,
  ModalStyles,
  Title,
  Wrapper,
  Disclaimer,
  ButtonsWrapper,
  CancelButton
} from "./styled";

const Popup = ({
  cta,
  disclaimer,
  title,
  subtitle,
  image,
  hasRedirection,
  hasCancelButton,
  onConfirm,
  onCloseModal,
  logout
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useT();

  const onLoginButtonClick = useCallback(() => {
    Cookies.set("BOA", true);
    Cookies.set("Onboarding", true);
    const state = uuid();
    Cookies.set("loginStateParam", state, { expires: 7 });
    window.location.href = `${API_URL}/oauth/authorize?client_id=${OAUTH_PUBLIC_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}&response_type=code&scope=trusted+refresh_token+public&state=${state}`;
  }, []);

  const onClose = () => {
    logout();
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
    Cookies.remove("BOA");
  }, []);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={() => {}}>
        <Wrapper>
          <Title>
            <H3>{title}</H3>
            <Subtitle>{subtitle}</Subtitle>
          </Title>
          <Image src={image} />
          {disclaimer && <Disclaimer>{disclaimer}</Disclaimer>}
          <ButtonsWrapper>
            {hasCancelButton && (
              <CancelButton
                onClick={onCloseModal || onClose}
                styleName="popup"
                variant={BUTTON_VARIANT.OUTLINE}
              >
                {t("landing:landings.welcome.cancel")}
              </CancelButton>
            )}
            <Button
              onClick={
                hasRedirection ? onConfirm || onLoginButtonClick : onClose
              }
              styleName="popup"
              withArrow
              variant={BUTTON_VARIANT.B2BSECONDARY}
            >
              {cta}
            </Button>
          </ButtonsWrapper>
        </Wrapper>
      </Modal>
    </>
  );
};

Popup.defaultProps = {
  subtitle: "",
  image: "",
  hasRedirection: false,
  hasCancelButton: false,
  disclaimer: "",
  onConfirm: null,
  onCloseModal: null
};

Popup.propTypes = {
  hasRedirection: bool,
  hasCancelButton: bool,
  cta: string.isRequired,
  subtitle: string,
  title: string.isRequired,
  image: string,
  disclaimer: string,
  onConfirm: func,
  onCloseModal: func,
  logout: func.isRequired
};

export default connect(null, {
  logout: logoutAction
})(Popup);
