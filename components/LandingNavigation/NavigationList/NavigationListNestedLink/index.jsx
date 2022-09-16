import React, { useCallback, useEffect, useState } from "react";
import { func } from "prop-types";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import { useWindowWidthLessThen } from "utils/hooks";
import { AdaptiveBox } from "components/styleguide/common";
import { emToPx, theme } from "utils/theme";
import { nestedLinkShape } from "../types";
import { NavigationListItem } from "../styled";
import { NestedLinkContainer, PopupContainer, Section, Title } from "./styled";
import LinkItem from "./LinkItem";

const NavigationListNestedLink = ({
  link: { label, sections, component: ChildrenComponent },
  onLinkClick
}) => {
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
      <PopupContainer {...attrs} onMouseLeave={hideMenu}>
        {ChildrenComponent ? (
          <ChildrenComponent onLinkClick={handleLinkClick} />
        ) : (
          sections.map(section => (
            <Section key={section.id}>
              {section.title && <Title>{section.title}</Title>}
              {section.items.map(item => {
                const key = `${item.label}-${item.href}`;
                return (
                  <LinkItem
                    key={key}
                    item={item}
                    onLinkClick={handleLinkClick}
                  />
                );
              })}
            </Section>
          ))
        )}
      </PopupContainer>
    ),
    [ChildrenComponent, handleLinkClick, hideMenu, sections]
  );

  const renderLink = useCallback(
    () => (
      <NestedLinkContainer
        alignItems="center"
        flexWrap="nowrap"
        onMouseEnter={visible ? hideMenu : showMenu}
      >
        <NavigationListItem display="flex">
          {label}
          <AdaptiveBox display={["block", null, null, "none"]} ml={2}>
            <FontAwesomeIcon icon={faChevronDown} />
          </AdaptiveBox>
        </NavigationListItem>
      </NestedLinkContainer>
    ),
    [hideMenu, label, showMenu, visible]
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
