import React, { useState } from "react";
import { Box } from "@rebass/grid";
import { bool, func, string } from "prop-types";

import { DropdownArrow } from "icons";
import { OPTIONS } from "./consts";

import {
  DropdownWrapper,
  DropdownItem,
  ItemsWrapper,
  DropdownButton,
  DropdownLabel
} from "./styled";
import { getDropdownLabel } from "./utils";

export default function Dropdown({
  withoutBorder,
  onChange,
  value,
  t,
  isCentered
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <DropdownWrapper
      withoutBorder={withoutBorder}
      tabIndex="0"
      role="button"
      onKeyDown={toggleDropdown}
      onClick={toggleDropdown}
    >
      <DropdownLabel isCentered={isCentered}>
        {getDropdownLabel(t, value)}
      </DropdownLabel>
      <DropdownButton
        withoutBorder={withoutBorder}
        isDropdownOpen={isDropdownOpen}
      >
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
  withoutBorder: bool,
  onChange: func.isRequired,
  value: string.isRequired,
  t: func.isRequired,
  isCentered: bool
};

Dropdown.defaultProps = {
  withoutBorder: false,
  isCentered: false
};
