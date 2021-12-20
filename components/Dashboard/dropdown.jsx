import React, { useState } from "react";
import { Box } from "@rebass/grid";
import { func, string } from "prop-types";

import { DropdownArrow } from "icons";
import { OPTIONS } from "./consts";

import {
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownWrapper,
  ItemsWrapper
} from "./styled";
import { getDropdownLabel } from "./utils";

export default function Dropdown({ onChange, value, t }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <DropdownWrapper
      tabIndex="0"
      role="button"
      onKeyDown={toggleDropdown}
      onClick={toggleDropdown}
    >
      <DropdownLabel>{getDropdownLabel(t, value)}</DropdownLabel>
      <DropdownButton isDropdownOpen={isDropdownOpen}>
        {t(OPTIONS.find(el => el.value === value).name)}
        <Box ml={2}>
          <DropdownArrow />
        </Box>
      </DropdownButton>

      {isDropdownOpen && (
        <ItemsWrapper>
          {OPTIONS.map(option => (
            <DropdownItem
              isActive={value === option.value}
              tabIndex="0"
              role="button"
              onKeyDown={() => onChange(option.value)}
              onClick={() => onChange(option.value)}
            >
              {t(`${option.name}`)}
            </DropdownItem>
          ))}
        </ItemsWrapper>
      )}
    </DropdownWrapper>
  );
}

Dropdown.propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
  t: func.isRequired
};
