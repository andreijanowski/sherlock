import React from "react";
import { node } from "prop-types";
import Tippy from "@tippyjs/react";

import { InfoIcon } from "components/Icons";
import { Container, HintContainer, HintIcon } from "./styled";

const HintBox = ({ children, hint }) => (
  <Container>
    {children}
    <Tippy
      maxWidth="none"
      placement="top-end"
      content={<HintContainer>{hint}</HintContainer>}
    >
      <HintIcon ml={2}>
        <InfoIcon />
      </HintIcon>
    </Tippy>
  </Container>
);

HintBox.propTypes = {
  children: node.isRequired,
  hint: node.isRequired
};

export default HintBox;
