import React, { useState } from "react";
import { bool, func, string } from "prop-types";
import { ExpandIconRestyled } from "icons";

import {
  DropdownWrapper,
  DropdownItem,
  ItemsWrapper,
  DropdownButton,
  Today
} from "./styled";

const OPTIONS = [
  {
    name: "Yesterday",
    value: "yesterday"
  },
  {
    name: "Last month",
    value: "lastMonth"
  },
  {
    name: "Last 3 months",
    value: "last3Months"
  },
  {
    name: "Last year",
    value: "lastYear"
  }
];

export default function Dropdown({
  withToday,
  withoutBorder,
  onChange,
  value
}) {
  const [activeOption, setActiveOption] = useState(OPTIONS[0].value);
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
        {OPTIONS.find(el => el.value === value).name}
        <ExpandIconRestyled />
      </DropdownButton>

      {isDropdownOpen && (
        <ItemsWrapper>
          {OPTIONS.map(option => (
            <DropdownItem
              isActive={activeOption === option.value}
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
              {option.name}
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
  value: string
};

Dropdown.defaultProps = {
  withToday: false,
  withoutBorder: false,
  onChange: () => {},
  value: "yesterday"
};
