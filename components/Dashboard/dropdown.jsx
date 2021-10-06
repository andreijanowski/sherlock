import React, { useState } from "react";
import { bool, func, string } from "prop-types";
import { DropdownArrow } from "icons";
import { OPTIONS, OPTIONS_FOR_REVENUE } from "./consts";

import {
  DropdownWrapper,
  DropdownItem,
  ItemsWrapper,
  DropdownButton,
  Today
} from "./styled";

export default function Dropdown({
  withToday,
  withoutBorder,
  onChange,
  value,
  isRevenue,
  t
}) {
  const options = isRevenue ? OPTIONS_FOR_REVENUE : OPTIONS;
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
      {withToday && <Today>Today vs</Today>}
      <DropdownButton
        withoutBorder={withoutBorder}
        isDropdownOpen={isDropdownOpen}
      >
        {options.find(el => el.value === value).name}
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
              {t(`${option.value}`)}
            </DropdownItem>
          ))}
        </ItemsWrapper>
      )}
    </DropdownWrapper>
  );
}

Dropdown.propTypes = {
  withToday: bool,
  withoutBorder: bool,
  onChange: func,
  value: string,
  isRevenue: bool,
  t: func.isRequired
};

Dropdown.defaultProps = {
  withToday: false,
  withoutBorder: false,
  onChange: () => {},
  value: "yesterday",
  isRevenue: false
};
