import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";

export const FooterWrapper = styled(Flex).attrs(() => ({
  as: "footer",
  width: 1,
  flexDirection: "column",
  pb: 20,
  px: 3,
  alignItems: "flex-start"
}))`
  color: rgb(${p => p.theme.colors.white});
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
`;

export const MenuWrapper = styled(Flex).attrs(() => ({
  alignSelf: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  width: 1
}))`
  flex: 1;
  max-width: ${WRAPPER_WIDTH}px;
`;

export const NavItem = styled(Flex).attrs(() => ({
  flexDirection: "column",
  justifyContent: "flex-start"
}))``;

export const ColumnTitle = styled.p`
  margin-bottom: 16px;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: ${p => p.theme.fontSizes.f27};
  letter-spacing: 0.7px;
  color: rgb(${p => p.theme.colors.white});
`;

export const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavigationLink = styled.a`
  display: block;
  margin-bottom: 4px;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: ${p => p.theme.fontSizes.f24};
  color: rgb(${p => p.theme.colors.white});
  text-decoration: none;
  &:hover {
    color: rgba(${p => p.theme.colors.white}, 0.7);
  }
`;

export const Line = styled.hr`
  width: 100%;
  margin: 70px 0 20px;
  border: none;
  border-bottom: 1px solid rgb(${p => p.theme.colors.gray["6"]});
`;

export const SocialsContainer = styled(Flex).attrs({
  as: "ul",
  alignItems: "center",
  flexWrap: "nowrap"
})`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 0;
  right: -65px;
`;

export const SocialsItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

export const SocialsItemLink = styled.a``;

export const CopyrightsContainer = styled.div`
  color: rgb(${p => p.theme.colors.black});
  font-weight: ${p => p.theme.fontWeights.thin};
  font-size: ${p => p.theme.fontSizes.f12};
  line-height: ${p => p.theme.fontSizes.f18};
  letter-spacing: 0.7px;
  padding: 24px;
  display: flex;
  background: rgb(${p => p.theme.colors.white});
  box-shadow: 0px 4px 27px rgba(${p => p.theme.colors.black}, 0.3);
  border-radius: 13px;
`;

export const Copywrite = styled.div`
  margin-left: 32px;
  font-size: ${p => p.theme.fontSizes.f14};
  cursor: pointer;
`;

export const RelativeWrapper = styled(Flex)`
  position: relative;
`;
