import { Link, Select } from "components";
import { string, bool, arrayOf, shape } from "prop-types";
import { Flex } from "@rebass/grid";
import { Wrapper, Items, Item } from "./styled";

const Menu = ({ lng, menuItems, select }) => (
  <Wrapper>
    {select && (
      <Flex px={3} py={4} width={1}>
        <Select
          value={select.value}
          items={select.items}
          onChange={select.handleChange}
          bottomAction={select.bottomAction}
        />
      </Flex>
    )}
    <Items>
      {menuItems.map(i =>
        i.route ? (
          <Link {...{ lng, route: i.route, key: i.route }}>
            <Item isActive={i.isActive}>
              <span>{i.label}</span>
            </Item>
          </Link>
        ) : (
          <Item isActive={i.isActive} onClick={i.onClick} key={i.label}>
            <span>{i.label}</span>
          </Item>
        )
      )}
    </Items>
  </Wrapper>
);

Menu.propTypes = {
  lng: string.isRequired,
  menuItems: arrayOf(
    shape({
      route: string.isRequired,
      label: string.isRequired,
      isActive: bool.isRequired
    })
  ).isRequired,
  select: shape()
};

Menu.defaultProps = {
  select: null
};

export default Menu;
