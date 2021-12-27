import React from "react";
import { Flex } from "@rebass/grid";
import { bool, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import { AdaptiveBox } from "components/styleguide/common";
import { Container } from "./styled";
import NavigationCTAButtons from "../NavigationCTAButtons";

const NavigationTopBar = ({ isMenuOpened, onBurgerClick }) => (
  <Container
    px={3}
    pt={[13, null, null, 0]}
    pb={[12, null, null, 0]}
    mb={[0, null, null, 56]}
    isMenuOpened={isMenuOpened}
  >
    <Flex>
      <FoodetectiveTextLogo isDark={isMenuOpened} />
    </Flex>
    <AdaptiveBox display={["block", null, null, "none"]}>
      <FontAwesomeIcon
        icon={isMenuOpened ? faTimes : faBars}
        onClick={onBurgerClick}
      />
    </AdaptiveBox>
    <AdaptiveBox
      display={["none", null, null, "flex"]}
      justifyContent="flex-end"
    >
      <NavigationCTAButtons />
    </AdaptiveBox>
  </Container>
);

NavigationTopBar.propTypes = {
  isMenuOpened: bool.isRequired,
  onBurgerClick: func.isRequired
};

export default NavigationTopBar;
