import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { RawInput } from "components";

export const Label = styled(Box).attrs({
  mb: 2
})`
  color: ${props => props.theme.colors.manatee};
  font-size: ${props => props.theme.fontSizes[1]};
`;

export const Input = styled(RawInput)`
  &:not([value=""]) {
    padding: 21px;
  }
`;

export const CardWrapper = styled(Flex).attrs({
  alignItems: "center",
  p: 2,
  mb: 2
})`
  border-radius: ${p => p.theme.radius.default};
  color: rgb(${p => (p.selected ? p.theme.colors.white : p.theme.colors.blue)});
  background-color: rgba(
    ${p => `${p.theme.colors.blue}, ${p.selected ? 1 : 0.1}`}
  );
  cursor: pointer;

  &:hover {
    color: rgb(${p => p.theme.colors.white});
    background-color: rgb(${p => p.theme.colors.blue});
  }
`;