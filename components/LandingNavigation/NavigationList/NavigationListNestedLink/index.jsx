import React, { useCallback, useMemo, useState, useEffect } from "react";
import { func } from "prop-types";
import { Box } from "@rebass/grid";
import { useRouter } from "next/router";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import { useLng, useWindowWidthLessThen } from "utils/hooks";
import { AdaptiveBox } from "components/styleguide/common";
import { emToPx, theme } from "utils/theme";
import { nestedLinkShape } from "../types";
import { NavigationListItem } from "../styled";
import { NestedLinkContainer, PopupContainer } from "./styled";
import LinksGroup from "./LinksGroup";

const NavigationListNestedLink = ({ link: { label, groups }, onLinkClick }) => {
  const { asPath } = useRouter();
  const lng = useLng();
  const [visible, setVisible] = useState(false);

  const showMenu = useCallback(() => setVisible(true), []);
  const hideMenu = useCallback(() => setVisible(false), []);

  const isActive = useMemo(
    () =>
      groups.some(group =>
        group.items.some(link => `/${lng}${link.href}` === asPath)
      ),
    [asPath, groups, lng]
  );

  const handleLinkClick = useCallback(
    item => {
      setVisible(false);
      onLinkClick(item);
    },
    [onLinkClick]
  );

  const renderContent = useCallback(
    attrs => (
      <PopupContainer {...attrs}>
        {groups.map((linksGroup, index) => {
          const isLastChild = index === groups.length - 1;
          return (
            // we can use index here because structure is static
            // and always will be rendered properly
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index} mr={isLastChild ? 0 : "26px"}>
              <LinksGroup group={linksGroup} onLinkClick={handleLinkClick} />
            </Box>
          );
        })}
      </PopupContainer>
    ),
    [groups, handleLinkClick]
  );

  const renderLink = useCallback(
    () => (
      <NestedLinkContainer
        alignItems="center"
        flexWrap="nowrap"
        onClick={visible ? hideMenu : showMenu}
      >
        <NavigationListItem display="flex" isActive={isActive}>
          {label}
          <AdaptiveBox display={["block", null, null, "none"]} ml={2}>
            <FontAwesomeIcon icon={faChevronDown} />
          </AdaptiveBox>
        </NavigationListItem>
        <AdaptiveBox display={["none", null, null, "block"]} ml={2}>
          <FontAwesomeIcon icon={faChevronDown} />
        </AdaptiveBox>
      </NestedLinkContainer>
    ),
    [hideMenu, isActive, label, showMenu, visible]
  );

  const isTablet = useWindowWidthLessThen(emToPx(theme.breakpoints[2]));

  useEffect(() => {
    if (!isTablet) {
      setVisible(false);
    }
  }, [isTablet]);

  return isTablet ? (
    <>
      {renderLink()}
      {visible && renderContent(null)}
    </>
  ) : (
    <Tippy
      interactive
      interactiveBorder={20}
      render={renderContent}
      visible={visible}
      onClickOutside={hideMenu}
      placement="bottom-start"
    >
      {renderLink()}
    </Tippy>
  );
};

NavigationListNestedLink.propTypes = {
  link: nestedLinkShape.isRequired,
  onLinkClick: func.isRequired
};

export default NavigationListNestedLink;
