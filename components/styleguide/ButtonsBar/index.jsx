import React from "react";
import { arrayOf, shape, string, func } from "prop-types";

import { Container, Item } from "./styled";

const ButtonsBar = ({ items, value, onChange }) => (
  <Container>
    {items.map(({ value: itemValue, label }) => {
      const isActive = value === itemValue;
      const onItemClick = () => {
        onChange(itemValue);
      };
      return (
        <Item
          key={itemValue}
          isActive={isActive}
          onClick={isActive ? undefined : onItemClick}
        >
          {label}
        </Item>
      );
    })}
  </Container>
);

ButtonsBar.propTypes = {
  items: arrayOf(
    shape({
      label: string.isRequired,
      value: string.isRequired
    })
  ).isRequired,
  value: string.isRequired,
  onChange: func.isRequired
};

export default ButtonsBar;
