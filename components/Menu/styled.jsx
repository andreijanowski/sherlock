import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Items = styled(Flex).attrs(() => ({
  flexDirection: "column",
  width: 1
}))`
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f13};
  line-height: 21px;
  letter-spacing: 0.3px;
`;

export const Item = styled(Flex).attrs(() => ({
  px: 4,
  alignItems: "center",
  width: 1,
  as: "a"
}))`
  padding: ${p => (p.bigPadding ? "16px 32px" : "12px 32px")};
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
