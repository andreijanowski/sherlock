import styled from "styled-components";
import { Flex, Box } from "@rebass/grid";

export const FooterWrapper = styled(Flex).attrs({
  as: "footer",
  flexDirection: "column",
  pt: [4, 50],
  pb: 20,
  px: 4,
  width: 1,
  alignItems: "center",
  justifyContent: "center"
})`
  background-color: white;
`;

export const FoodetectiveLogoWrapper = styled(Box).attrs({
  width: 120
})`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;

export const CopyrightWrapper = styled(Flex).attrs({
  flexDirection: ["column", "row"],
  width: 1,
  pt: 20,
  alignItems: "center",
  justifyContent: ["center", "flex-start"]
})`
  border-top: 1px solid rgba(${p => p.theme.colors.mischka}, 0.1);
  max-width: 920px;
`;

export const TextWrapper = styled(Flex).attrs({
  width: 1,
  flexDirection: "row",
  alignSelf: "center",
  justifyContent: "space-between"
})`
  max-width: 920px;
`;

export const MenuWrapper = styled(Flex).attrs({
  flexDirection: "row",
  alignSelf: "center",
  justifyContent: "space-between",
  mb: 50,
  flexWrap: "wrap",
  m: -2
})`
  flex: 1;
  max-width: 920px;
`;

export const ColumnTitle = styled.p`
  font-size: ${p => p.theme.fontSizes.f14};
  font-weight: ${p => p.theme.fontWeights.semiBold};
  line-height: 24px;
  color: ${p => p.theme.colors.abbey};
  margin: 0 0 15px 0;
`;

export const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavigationLink = styled.a`
  font-size: ${p => p.theme.fontSizes.f14};
  color: rgb(${p => p.theme.colors.mischka});
  line-height: 35px;
  text-decoration: none;
  &:hover {
    color: rgb(${p => p.theme.colors.abbey});
  }
`;

export const CopyrightNote = styled.p`
  margin: 0;
  font-size: ${p => p.theme.fontSizes.f12};
  color: rgb(${p => p.theme.colors.mischka});
  line-height: 35px;
  align-self: center;
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
