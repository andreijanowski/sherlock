import React, { useCallback, useMemo, useState } from "react";
import { func } from "prop-types";
import { Box } from "@rebass/grid";
import { useRouter } from "next/router";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import { useLng } from "utils/hooks";
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

  return (
    <Tippy
      interactive
      interactiveBorder={20}
      render={renderContent}
      visible={visible}
      onClickOutside={hideMenu}
      placement="bottom-start"
    >
      <NestedLinkContainer
        alignItems="center"
        flexWrap="nowrap"
        onClick={visible ? hideMenu : showMenu}
      >
        <NavigationListItem isActive={isActive}>{label}</NavigationListItem>
        <Box ml={2}>
          <FontAwesomeIcon icon={faChevronDown} />
        </Box>
      </NestedLinkContainer>
    </Tippy>
  );
};

NavigationListNestedLink.propTypes = {
  link: nestedLinkShape.isRequired,
  onLinkClick: func.isRequired
};

export default NavigationListNestedLink;
