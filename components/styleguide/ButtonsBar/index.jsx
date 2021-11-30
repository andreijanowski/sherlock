import React from "react";
import { arrayOf, shape, string, func, bool } from "prop-types";

import { theme } from "utils/theme";
import { Container, Item } from "./styled";

const ButtonsBar = ({
  items,
  value,
  onChange,
  slim,
  primaryColor,
  secondaryColor,
  getKey
}) => (
  <Container primaryColor={primaryColor}>
    {items.map(({ value: itemValue, label }) => {
      const isActive = value === itemValue;
      const onItemClick = () => {
        onChange(itemValue);
      };
      const key = getKey ? getKey(itemValue) : itemValue;

      return (
        <Item
          key={key}
          slim={slim}
          isActive={isActive}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
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
  onChange: func.isRequired,
  slim: bool,
  primaryColor: string,
  secondaryColor: string,
  getKey: func
};

ButtonsBar.defaultProps = {
  slim: false,
  primaryColor: theme.colors.white,
  secondaryColor: theme.colors.landingDarkBlue,
  getKey: null
};

export default ButtonsBar;
