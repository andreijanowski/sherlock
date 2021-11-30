import React, { useCallback, useMemo } from "react";
import { Box } from "@rebass/grid";

import { APP_URL } from "consts";
import LanguageSwitcher from "components/LanguageSwitcher";
import { useT } from "utils/hooks";
import { Router } from "routes";
import { Container, LanguageSwitcherContainer } from "./styled";
import { getMenuItems } from "./utils";
import NavigationListNestedLink from "./NavigationListNestedLink";
import NavigationListLink from "./NavigationListLink";

const SCROLL_GAP = 50;

const NavigationList = () => {
  const t = useT();

  const menuItems = useMemo(() => getMenuItems(t), [t]);

  const onLinkClick = useCallback(href => {
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
  }, []);

  return (
    <Container>
      {menuItems.map((mixedLink, index) => {
        const key = mixedLink.label;
        const isNested = !!mixedLink.groups;
        const isLastChild = index === menuItems.length - 1;
        const Component = isNested
          ? NavigationListNestedLink
          : NavigationListLink;

        return (
          <Box mr={isLastChild ? 0 : "40px"}>
            <Component key={key} link={mixedLink} onLinkClick={onLinkClick} />
          </Box>
        );
      })}
      <LanguageSwitcherContainer>
        <LanguageSwitcher />
      </LanguageSwitcherContainer>
    </Container>
  );
};

export default NavigationList;
