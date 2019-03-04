import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs({
  ml: "1px",
  width: 280,
  flexDirection: "column"
})`
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;
export const Items = styled(Flex).attrs({
  flexDirection: "column",
  width: 1
})`
  font-size: ${p => p.theme.fontSizes.f16};
  font-weight: ${p => p.theme.fontWeights.medium};
`;

export const Item = styled(Flex).attrs({
  px: 4,
  alignItems: "center",
  width: 1,
  as: "a"
})`
  height: 56px;
  border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  cursor: pointer;
  color: rgb(${p => p.theme.colors.dark});
  text-decoration: none;

  ${p =>
    p.isActive &&
    `
      color:rgb(${p.theme.colors.blue});
      font-weight: ${p.theme.fontWeights.bold};
    `}

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgb(${p => p.theme.colors.background});
  }
`;