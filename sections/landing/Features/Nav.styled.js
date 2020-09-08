import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const NavContainer = styled(Flex).attrs(() => ({
  as: "ul",
  my: [2, 4],
  flexDirection: ["column", "row"]
}))`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-inline-start: 0;
`;

export const NavItem = styled.li`
  display: block;
  color: rgb(${p => p.theme.colors.black});
  font-size: ${p => p.theme.fontSizes.f16};
  cursor: pointer;

  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    font-size: ${p => p.theme.fontSizes.f18};
  }
`;

export const NavItemText = styled.span`
  ${p =>
    p.isActive && `border-bottom: 3px solid rgb(${p.theme.colors.black});`};
  display: inline-block;
  margin: 4px 0;
  padding-bottom: 4px;
`;
