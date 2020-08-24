import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const FooterWrapper = styled(Flex).attrs(() => ({
  as: "footer",
  width: 1,
  flexDirection: "column",
  pb: 20,
  px: 3,
  alignItems: "flex-start"
}))`
  max-width: 1150px;
`;

export const FoodetectiveLogoWrapper = styled(Box).attrs(() => ({
  my: 25,
  width: 120
}))`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;

export const CopyrightWrapper = styled(Flex).attrs(() => ({
  flexDirection: ["column", "row"],
  width: 1,
  pt: 20,
  alignItems: "center",
  justifyContent: ["flex-end", "flex-end"]
}))`
  max-width: 1150px;
  border-top: 1px solid rgba(${p => p.theme.colors.mischka}, 0.1);
`;

export const TextWrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: "row",
  alignSelf: "center",
  justifyContent: "space-between"
}))`
  max-width: 1150px;
`;

export const MenuWrapper = styled(Flex).attrs(() => ({
  alignSelf: "center",
  justifyContent: "flex-start",
  mb: 50,
  flexWrap: "wrap",
  m: -2,
  width: 1
}))`
  flex: 1;
  max-width: 1150px;
`;

export const NavItem = styled(Flex).attrs(() => ({
  flexDirection: "column",
  justifyContent: "flex-start"
}))`
  flex: 1 0 0;
`;

export const ColumnTitle = styled.p`
  margin: 0 0 15px 0;
  color: #333;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 35px;
  letter-spacing: 0.3px;
`;

export const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavigationLink = styled.a`
  color: #828282;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 45px;
  letter-spacing: 0.3px;
  text-decoration: none;
  &:hover {
    color: rgb(${p => p.theme.colors.abbey});
  }
`;

export const CopyrightNote = styled.p`
  align-self: center;
  margin: 0;
  color: rgb(${p => p.theme.colors.mischka});
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: 35px;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    padding-left: 120px;
    font-size: ${p => p.theme.fontSizes.f14};
  }
`;

export const AppPlatformLogo = styled.img`
  width: 100%;
  max-width: 113px;
  height: 100%;
`;
