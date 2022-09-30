import React, { useCallback, useEffect, useState } from "react";
import { func } from "prop-types";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import { AdaptiveBox } from "components/styleguide/common";
import { nestedLinkShape } from "../types";
import { NavigationListItem } from "../styled";
import { NestedLinkContainer, PopupContainer, Section, Title, LinkWrapper } from "./styled";
import LinkItem from "./LinkItem";

const NavigationListNestedLink = ({
  link: { label, sections, items, component: ChildrenComponent, isTablet },
  onLinkClick
}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = useCallback(() => setVisible(false), []);

  const handleLinkClick = useCallback(
    item => {
      setVisible(false);
      onLinkClick(item);
    },
    [onLinkClick]
  );

  const getSections = useCallback(
    () =>
      isTablet
        ? items &&
          items.length &&
          items.map(item => {
            const key = `${item.label}-${item.href}`;
            return (
              <LinkWrapper>
                <LinkItem key={key} item={item} onLinkClick={handleLinkClick} />
              </LinkWrapper>
            );
          })
        : sections &&
          sections.length &&
          sections.map(section => (
            <Section key={section.id}>
              {section.title && <Title>{section.title}</Title>}
              {section.items.map(item => {
                const key = `${item.label}-${item.href}`;
                return (
                  <div>
                    <LinkItem
                      key={key}
                      item={item}
                      onLinkClick={handleLinkClick}
                    />
                  </div>
                );
              })}
            </Section>
          )),
    [handleLinkClick, isTablet, sections, items]
  );

  const renderContent = useCallback(
    attrs => (
      <PopupContainer {...attrs}>
        {ChildrenComponent ? (
          <ChildrenComponent onLinkClick={handleLinkClick} />
        ) : (
          getSections()
        )}
      </PopupContainer>
    ),
    [ChildrenComponent, getSections, handleLinkClick]
  );

  const onToggleMenu = useCallback(() => {
    setVisible(!visible);
  }, [visible, isTablet]);

  const renderLink = useCallback(
    () => (
      <NestedLinkContainer alignItems="center" flexWrap="nowrap" onClick={onToggleMenu}>
        <NavigationListItem display="flex">
          {label}
          <AdaptiveBox display={["block", null, null, "none"]} ml={2}>
            <FontAwesomeIcon icon={faChevronDown} />
          </AdaptiveBox>
        </NavigationListItem>
      </NestedLinkContainer>
    ),
    [label, onToggleMenu]
  );

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
      interactiveBorder={5}
      render={renderContent}
      onClickOutside={hideMenu}
      placement="bottom"
      visible={visible}
    >
      {renderLink()}
    </Tippy>
  );
};

NavigationListNestedLink.propTypes = {
  link: nestedLinkShape,
  onLinkClick: func.isRequired
};

NavigationListNestedLink.defaultProps = {
  link: {
    sections: [],
    items: []
  }
};

export default NavigationListNestedLink;
