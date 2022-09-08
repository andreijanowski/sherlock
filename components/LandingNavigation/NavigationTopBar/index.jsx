import React from "react";
import { Flex } from "@rebass/grid";
import { bool, func } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import { NavigationList } from "components/LandingNavigation";
import FoodetectiveTextLogo from "components/FoodetectiveTextLogo";
import { AdaptiveBox } from "components/styleguide/common";
import { Container } from "./styled";
import NavigationCTAButtons from "../NavigationCTAButtons";

const NavigationTopBar = ({ isMenuOpened, onBurgerClick, hideMenu }) => (
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
      <NavigationList isMenuOpened={isMenuOpened} hideMenu={hideMenu} />
    </AdaptiveBox>
    <NavigationCTAButtons />
  </Container>
);

NavigationTopBar.propTypes = {
  isMenuOpened: bool.isRequired,
  onBurgerClick: func.isRequired,
  hideMenu: func.isRequired
};

export default NavigationTopBar;
