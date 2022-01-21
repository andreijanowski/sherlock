import React, { useCallback, useEffect, useState } from "react";
import { func } from "prop-types";
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
import LinkItem from "./LinkItem";

const NavigationListNestedLink = ({
  link: { label, items, component: ChildrenComponent },
  onLinkClick
}) => {
  const { asPath } = useRouter();
  const lng = useLng();
  const [visible, setVisible] = useState(false);

  const showMenu = useCallback(() => setVisible(true), []);
  const hideMenu = useCallback(() => setVisible(false), []);

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
        {ChildrenComponent ? (
          <ChildrenComponent onLinkClick={handleLinkClick} />
        ) : (
          items.map(item => {
            const key = `${item.label}-${item.href}`;
            return (
              <LinkItem key={key} item={item} onLinkClick={handleLinkClick} />
            );
          })
        )}
      </PopupContainer>
    ),
    [ChildrenComponent, handleLinkClick, items]
  );

  const renderLink = useCallback(() => {
    const isActive =
      items && items.some(link => `/${lng}${link.href}` === asPath);
    return (
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
    );
  }, [asPath, hideMenu, items, label, lng, showMenu, visible]);

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
      placement="bottom"
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
