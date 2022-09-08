import React, { useState } from "react";
import { bool, func, string } from "prop-types";

import { DropdownArrow } from "icons";
import { OPTIONS, RB_OPTIONS } from "./consts";

import {
  DropdownButton,
  DropdownItem,
  DropdownLabel,
  DropdownWrapper,
  ItemsWrapper
} from "./styled";
import { getDropdownLabel } from "./utils";

export default function Dropdown({ onChange, value, t, isRB }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const options = isRB ? RB_OPTIONS : OPTIONS;

  return (
    <DropdownWrapper
      tabIndex="0"
      role="button"
      onKeyDown={toggleDropdown}
      onClick={toggleDropdown}
    >
      {!isRB && <DropdownLabel>{getDropdownLabel(t, value)}</DropdownLabel>}
      <DropdownButton isDropdownOpen={isDropdownOpen}>
        {!isRB ? t(OPTIONS.find(el => el.value === value).name) : t(value)}
        <DropdownArrow />
      </DropdownButton>

      {isDropdownOpen && (
        <ItemsWrapper>
          {options.map(option => (
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
  t: func.isRequired,
  isRB: bool
};

Dropdown.defaultProps = {
  isRB: false
};
