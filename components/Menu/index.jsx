import React from "react";
import { string, bool, arrayOf, shape, func } from "prop-types";
import { useRouter } from "next/router";

import { Link } from "components";
import MenuArrowIcon from "components/MenuArrowIcon";
import PartnersSearchBox from "components/PartnersSearchBox";
import { isMenuItemActive, PROFILE_BASE_PATH } from "utils/menuConfig";
import { Items, Item } from "./styled";
import PublishBusinessButton from "./PublishBusinessButton";

const Menu = ({ lng, toggleNestedMenu, menuItems, t, withSearch }) => {
  const { asPath } = useRouter();

  const isProfilePath = asPath.startsWith(`/${lng}${PROFILE_BASE_PATH}`);

  return (
    <>
      <Items>
        {withSearch && <PartnersSearchBox />}
        <Item bigPadding onClick={toggleNestedMenu}>
          <MenuArrowIcon back />
          <span>{t("app:backToMainMenu")}</span>
        </Item>
        {menuItems.map(menuItem => {
          const { route, label, color, onClick } = menuItem;
          const isActive = isMenuItemActive({
            lng,
            asPath,
            menuItem
          });

          return menuItem.route ? (
            <Link {...{ lng, route, key: label }}>
              <Item isActive={isActive} color={color}>
                <span>{label}</span>
              </Item>
            </Link>
          ) : (
            <Item
              key={label}
              onClick={onClick}
              isActive={isActive}
              color={color}
            >
              <span>{label}</span>
            </Item>
          );
        })}
        {isProfilePath && <PublishBusinessButton t={t} lng={lng} />}
      </Items>
    </>
  );
};

Menu.propTypes = {
  lng: string.isRequired,
  menuItems: arrayOf(
    shape({
      route: string,
      onClick: func,
      label: string.isRequired,
      isActive: bool
    })
  ).isRequired,
  t: func.isRequired,
  toggleNestedMenu: func.isRequired,
  withSearch: bool.isRequired
};

export default Menu;
