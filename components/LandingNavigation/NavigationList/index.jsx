import React, { useCallback, useMemo } from "react";
import { Box } from "@rebass/grid";
import { bool, func } from "prop-types";

import { APP_URL } from "consts";
import LanguageSwitcher from "components/LanguageSwitcher";
import { useT, useWindowWidthLessThen } from "utils/hooks";
import { emToPx, theme } from "utils/theme";
import { Router } from "routes";
import { AdaptiveBox } from "components/styleguide/common";
import { DemoButton } from "components/Landing";

import {
  Container,
  MobileCTAButtons,
  MobileLanguageSwitcherContainer
} from "./styled";
import { getMenuItems, getMobileMenuItems } from "./utils";
import NavigationListNestedLink from "./NavigationListNestedLink";
import NavigationListLink from "./NavigationListLink";
import NavigationCTAButtons from "../NavigationCTAButtons";

const SCROLL_GAP = 50;

const NavigationList = ({ isMenuOpened, hideMenu }) => {
  const t = useT();
  const isTablet = useWindowWidthLessThen(emToPx(theme.breakpoints[2]));

  const menuItems = useMemo(
    () => (isTablet ? getMobileMenuItems(t) : getMenuItems(t)),
    [isTablet, t]
  );

  const onLinkClick = useCallback(
    href => {
      hideMenu();
      const { hash } = new URL(href, APP_URL);
      const relatedElement = document.getElementById(hash.slice(1));
      if (!relatedElement) {
        Router.pushRoute(href, undefined, { shallow: true });
        return;
      }
      window.scrollTo({
        top:
          window.scrollY +
          relatedElement.getBoundingClientRect().top -
          SCROLL_GAP,
        behavior: "smooth"
      });
      Router.replaceRoute(href, undefined, { shallow: true });
    },
    [hideMenu]
  );

  const onGetTheAppClick = useCallback(() => {
    hideMenu();
  }, [hideMenu]);

  return (
    <Container isMenuOpened={isMenuOpened}>
      <MobileCTAButtons
        display={["flex", null, null, "none"]}
        justifyContent="center"
        px={3}
        py="24px"
      >
        <NavigationCTAButtons onGetTheAppClick={onGetTheAppClick} />
      </MobileCTAButtons>
      <MobileLanguageSwitcherContainer display={["block", null, null, "none"]}>
        <LanguageSwitcher />
      </MobileLanguageSwitcherContainer>
      {menuItems.map((mixedLink, index) => {
        const key = mixedLink.label;
        const isNested = !!(
          mixedLink.items ||
          mixedLink.sections ||
          mixedLink.component
        );
        const isLastChild = index === menuItems.length - 1;
        const Component = isNested
          ? NavigationListNestedLink
          : NavigationListLink;

        return (
          <Box mr={[0, null, null, isLastChild ? 0 : "40px"]} key={key}>
            <Component
              key={key}
              link={{...mixedLink, isTablet }}
              onLinkClick={onLinkClick}
              isTablet={isTablet}
            />
          </Box>
        );
      })}
      <AdaptiveBox
        display={["flex", null, null, "none"]}
        justifyContent="center"
        py={40}
        px={3}
      >
        <DemoButton width={1} />
      </AdaptiveBox>
    </Container>
  );
};

NavigationList.propTypes = {
  isMenuOpened: bool.isRequired,
  hideMenu: func.isRequired
};

export default NavigationList;
