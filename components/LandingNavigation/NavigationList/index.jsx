import React, { useCallback, useMemo } from "react";
import { Box } from "@rebass/grid";
import { bool } from "prop-types";

import { APP_URL, SUBSCRIPTION_ENTREPRISE_URL } from "consts";
import LanguageSwitcher from "components/LanguageSwitcher";
import { useT } from "utils/hooks";
import { Router } from "routes";
import { AdaptiveBox } from "components/styleguide/common";
import Button from "components/styleguide/Button";
import {
  Container,
  LanguageSwitcherContainer,
  MobileCTAButtons,
  MobileLanguageSwitcherContainer
} from "./styled";
import { getMenuItems } from "./utils";
import NavigationListNestedLink from "./NavigationListNestedLink";
import NavigationListLink from "./NavigationListLink";
import NavigationCTAButtons from "../NavigationCTAButtons";

const SCROLL_GAP = 50;

const NavigationList = ({ isMenuOpened }) => {
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
    <Container isMenuOpened={isMenuOpened}>
      <MobileCTAButtons
        display={["flex", null, null, "none"]}
        justifyContent="center"
        px={3}
        py="24px"
      >
        <NavigationCTAButtons />
      </MobileCTAButtons>
      <MobileLanguageSwitcherContainer display={["block", null, null, "none"]}>
        <LanguageSwitcher>{t("landing:language")}</LanguageSwitcher>
      </MobileLanguageSwitcherContainer>
      {menuItems.map((mixedLink, index) => {
        const key = mixedLink.label;
        const isNested = !!mixedLink.groups;
        const isLastChild = index === menuItems.length - 1;
        const Component = isNested
          ? NavigationListNestedLink
          : NavigationListLink;

        return (
          <Box mr={[0, null, null, isLastChild ? 0 : "40px"]}>
            <Component key={key} link={mixedLink} onLinkClick={onLinkClick} />
          </Box>
        );
      })}
      <LanguageSwitcherContainer display={["none", null, null, "block"]}>
        <LanguageSwitcher />
      </LanguageSwitcherContainer>
      <AdaptiveBox
        display={["flex", null, null, "none"]}
        justifyContent="center"
        py={40}
        px={3}
      >
        <Button
          width={1}
          as="a"
          target="_blank"
          href={SUBSCRIPTION_ENTREPRISE_URL}
          rel="noreferrer noopener"
          withArrow
        >
          {t("landing:bookDemo")}
        </Button>
      </AdaptiveBox>
    </Container>
  );
};

NavigationList.propTypes = {
  isMenuOpened: bool.isRequired
};

export default NavigationList;
