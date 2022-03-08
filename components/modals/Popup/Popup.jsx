import React, { useState, useCallback, useEffect } from "react";
import { bool, string } from "prop-types";
import { useRouter } from "next/router";
import { Modal } from "components";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import Cookies from "js-cookie";
import { API_URL, OAUTH_PUBLIC_CLIENT_ID, OAUTH_CALLBACK_URL } from "consts";
import uuid from "uuid/v1";
import { useLng } from "utils/hooks";
import { H3, Subtitle } from "components/styleguide/Typography";
import { Image, ModalStyles, Title, Wrapper } from "./styled";

const Popup = ({ cta, title, subtitle, image, hasRedirection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const lng = useLng();

  const onLoginButtonClick = useCallback(() => {
    const state = uuid();
    Cookies.set("loginStateParam", state, { expires: 7 });
    window.location.href = `${API_URL}/oauth/authorize?client_id=${OAUTH_PUBLIC_CLIENT_ID}&redirect_uri=${OAUTH_CALLBACK_URL}&response_type=code&scope=trusted+refresh_token+public&state=${state}`;
  }, []);

  const onClose = () => {
    router.push(`/${lng}`);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={onClose}>
        <Wrapper>
          <Title>
            <H3>{title}</H3>
            <Subtitle>{subtitle}</Subtitle>
          </Title>
          <Image src={image} />
          <Button
            onClick={hasRedirection ? onLoginButtonClick : onClose}
            styleName="popup"
            withArrow
            variant={BUTTON_VARIANT.B2BSECONDARY}
          >
            {cta}
          </Button>
        </Wrapper>
      </Modal>
    </>
  );
};

Popup.defaultProps = {
  subtitle: "",
  image: "",
  hasRedirection: false
};

Popup.propTypes = {
  hasRedirection: bool,
  cta: string.isRequired,
  subtitle: string,
  title: string.isRequired,
  image: string
};

export default Popup;
