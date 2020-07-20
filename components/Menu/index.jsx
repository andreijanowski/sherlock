import { string, bool, arrayOf, shape, func } from "prop-types";
import { Flex } from "@rebass/grid";

import { Button, Link, Select } from "components";
import { Wrapper, Items, Item } from "./styled";

const Menu = ({ lng, menuItems, select, t }) => (
  <Wrapper>
    {select && (
      <Flex px={3} py={4} width={1}>
        <Select
          value={select.value}
          items={select.items}
          onChange={select.handleChange}
          bottomAction={select.bottomAction}
          withImage={select.withImage}
        />
      </Flex>
    )}
    <Items>
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
  </Wrapper>
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
  select: shape()
};

Menu.defaultProps = {
  select: null
};

export default Menu;
