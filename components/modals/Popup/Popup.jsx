import React, { useState, useEffect } from "react";
import { string } from "prop-types";
import { useRouter } from "next/router";
import { Modal } from "components";
import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import { useLng } from "utils/hooks";
import { H3, Subtitle } from "components/styleguide/Typography";
import { Image, ModalStyles, Title, Wrapper } from "./styled";

const Popup = ({ cta, title, subtitle, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const lng = useLng();

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
            onClick={onClose}
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
  image: ""
};
Popup.propTypes = {
  cta: string.isRequired,
  subtitle: string,
  title: string.isRequired,
  image: string
};

export default Popup;
