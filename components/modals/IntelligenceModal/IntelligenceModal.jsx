import React, { useState, useEffect } from "react";
import { string, func } from "prop-types";
import { Modal } from "components";
import { Box, Flex } from "@rebass/grid";
import { connect } from "react-redux";
import {
  Image,
  ModalStyles,
  ImageContainer,
  Wrapper,
  Name,
  Description,
  Header
} from "./styled";

const IntelligenceModal = ({
  description,
  title,
  subtitle,
  image,
  onCloseModal
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <ModalStyles />
      <Modal open={isModalOpen} onClose={onCloseModal || onClose}>
        <Wrapper>
          <Header>
            <Flex mb={3}>
              <Box as={ImageContainer} mr={2}>
                <Image src={image} />
              </Box>
              <Flex flexDirection="column">
                <Name>{title}</Name>
                <Description>{subtitle}</Description>
              </Flex>
            </Flex>
          </Header>
          <Description>{description}</Description>
        </Wrapper>
      </Modal>
    </>
  );
};

IntelligenceModal.defaultProps = {
  subtitle: "",
  image: "",
  description: "",
  onCloseModal: null
};

IntelligenceModal.propTypes = {
  description: string,
  subtitle: string,
  title: string.isRequired,
  image: string,
  onCloseModal: func
};

export default connect(null, {})(IntelligenceModal);
