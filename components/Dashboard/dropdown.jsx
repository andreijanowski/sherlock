import React, { useState } from "react";
import { bool, func, string, arrayOf, shape } from "prop-types";

import { DropdownArrow } from "icons";
import { OPTIONS, OPTIONS_FOR_REVENUE } from "./consts";

import {
  DropdownWrapper,
  DropdownItem,
  ItemsWrapper,
  DropdownButton,
  DropdownLabel
} from "./styled";

export default function Dropdown({
  withoutBorder,
  onChange,
  value,
  isRevenue,
  t,
  dropdownLabel,
  options = isRevenue ? OPTIONS_FOR_REVENUE : OPTIONS
}) {
  const [activeOption, setActiveOption] = useState(options[0].value);
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
      {dropdownLabel && <DropdownLabel>{dropdownLabel}</DropdownLabel>}
      <DropdownButton
        withoutBorder={withoutBorder}
        isDropdownOpen={isDropdownOpen}
      >
        {t(options.find(el => el.value === value).name)}
        <DropdownArrow />
      </DropdownButton>

      {isDropdownOpen && (
        <ItemsWrapper>
          {options.map(option => (
            <DropdownItem
              isActive={
                onChange
                  ? value === option.value
                  : activeOption === option.value
              }
              tabIndex="0"
              role="button"
              onKeyDown={() =>
                onChange
                  ? onChange(option.value)
                  : setActiveOption(option.value)
              }
              onClick={() =>
                onChange
                  ? onChange(option.value)
                  : setActiveOption(option.value)
              }
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
  onChange: func,
  value: string,
  isRevenue: bool,
  t: func.isRequired,
  dropdownLabel: string,
  options: arrayOf(
    shape({ label: string.isRequired, value: string.isRequired })
  )
};

Dropdown.defaultProps = {
  options: undefined,
  withoutBorder: false,
  onChange: () => {},
  value: "yesterday",
  isRevenue: false,
  dropdownLabel: null
};
