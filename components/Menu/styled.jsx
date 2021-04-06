import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  ml: "1px",
  width: [undefined, 160, 240, 280],
  flexDirection: "column"
}))`
  padding-top: 105px;
  background-color: rgb(${p => p.theme.colors.white});
  box-shadow: 0 2px 6px 0 rgba(${p => p.theme.colors.blue}, 0.08);
`;
export const Items = styled(Flex).attrs(() => ({
  flexDirection: "column",
  width: 1
}))`
  padding: 0 10px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 21px;
  letter-spacing: 0.3px;
`;

export const Item = styled(Flex).attrs(() => ({
  px: 4,
  alignItems: "center",
  width: 1,
  as: "a"
}))`
  padding: 12px 32px;
  color: rgb(${p => (p.color ? p.theme.colors[p.color] : p.theme.colors.dark)});
  text-decoration: none;
  cursor: pointer;

  ${p => p.isActive && `color:rgb(${p.theme.colors.blue});`}

  &:not(:last-child) {
    border-bottom: 1px solid rgb(${p => p.theme.colors.greyBorder});
  }

  &:hover {
    background-color: rgb(${p => p.theme.colors.background});
  }
`;
