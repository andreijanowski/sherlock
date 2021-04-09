import { string, bool, arrayOf, shape, func } from "prop-types";
import { Flex } from "@rebass/grid";

import { Button, Link } from "components";
import MenuArrowIcon from "components/MenuArrowIcon";
import { Items, Item } from "./styled";

const Menu = ({ lng, toggleNestedMenu, menuItems, t }) => (
  <>
    <Items>
      <Item bigPadding onClick={toggleNestedMenu}>
        <MenuArrowIcon back />
        <span>{t("app:backToMainMenu")}</span>
      </Item>
      {menuItems.map(i => {
        const isPublishBusinessButton =
          i.label === t("app:manageProfile.publish");

        if (isPublishBusinessButton) {
          return (
            <Flex p={1}>
              <Button
                styleName="accept"
                type="submit"
                width="100%"
                onClick={i.onClick}
              >
                {i.label}
              </Button>
            </Flex>
          );
        }

        if (i.route) {
          return (
            <Link {...{ lng, route: i.route, key: i.route }}>
              <Item isActive={i.isActive} color={i.color}>
                <span>{i.label}</span>
              </Item>
            </Link>
          );
        }

        return (
          <Item
            isActive={i.isActive}
            onClick={i.onClick}
            key={i.label}
            color={i.color}
          >
            <span>{i.label}</span>
          </Item>
        );
      })}
    </Items>
  </>
);

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
  toggleNestedMenu: func.isRequired
};

export default Menu;
