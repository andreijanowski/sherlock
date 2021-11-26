import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { Box } from "@rebass/grid";

import LanguageSwitcher from "components/LanguageSwitcher";
import { useT } from "utils/hooks";
import { Container, LanguageSwitcherContainer } from "./styled";
import { getMenuItems } from "./utils";
import NavigationListNestedLink from "./NavigationListNestedLink";
import NavigationListLink from "./NavigationListLink";

const SCROLL_GAP = 50;

const NavigationList = () => {
  const router = useRouter();
  const t = useT();

  const menuItems = useMemo(() => getMenuItems(t), [t]);

  const onLinkClick = useCallback(
    href => {
      const [, anchor] = href.split("#");
      const relatedElement = document.getElementById(anchor);
      if (!relatedElement) {
        router.push(href);
        return;
      }
      window.scrollTo({
        top:
          window.scrollY +
          relatedElement.getBoundingClientRect().top -
          SCROLL_GAP,
        behavior: "smooth"
      });
    },
    [router]
  );

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
