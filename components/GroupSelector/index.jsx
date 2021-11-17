import React from "react";
import { string, func, arrayOf, shape } from "prop-types";

import { Container, Label, OptionsContainer, Option, Caption } from "./styled";

const GroupSelector = ({ label, options, value, setValue }) => (
  <Container>
    <Label>{label}</Label>
    <OptionsContainer>
      {options.map(option => {
        const isActive = option.value === value;
        const onClick = () => {
          setValue(option.value);
        };
        return (
          <Option key={option.value} isActive={isActive} onClick={onClick}>
            {option.label}
            {option.caption && <Caption>{option.caption}</Caption>}
          </Option>
        );
      })}
    </OptionsContainer>
  </Container>
);

GroupSelector.propTypes = {
  label: string.isRequired,
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
      caption: string
    })
  ).isRequired,
  value: string.isRequired,
  setValue: func.isRequired
};

export default GroupSelector;
