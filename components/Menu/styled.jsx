import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  ml: "1px",
  width: [undefined, 160, 240, 280],
  flexDirection: "column"
}))`
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;
export const Items = styled(Flex).attrs(() => ({
  flexDirection: "column",
  width: 1
}))`
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
`;

export const Item = styled(Flex).attrs(() => ({
  px: 4,
  alignItems: "center",
  width: 1,
  as: "a"
}))`
  height: 56px;
  color: rgb(${p => (p.color ? p.theme.colors[p.color] : p.theme.colors.dark)});
  text-decoration: none;
  border-bottom: 1px solid rgb(${p => p.theme.colors.background});
  cursor: pointer;

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
