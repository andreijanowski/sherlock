import styled from "styled-components";
import { Flex } from "@rebass/grid";

export const Wrapper = styled(Flex).attrs(() => ({
  flexDirection: "column",
  position: "relative",
  mb: 2
}))`
  overflow: hidden;
  border: 1px solid rgb(${p => p.theme.colors.linkWaterDark});
  border-radius: ${p => p.theme.radius.default};
  ${p => p.isCardGrayedOut && "opacity: 0.6;"}
`;

export const Header = styled(Flex).attrs(() => ({
  px: 3,
  py: 2,
  alignItems: "center",
  justifyContent: "space-between"
}))`
  color: rgb(
    ${p => (p.isSplited ? p.theme.colors.white : p.theme.colors.dark)}
  );
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
  position: relative;
  background-color: rgb(
    ${p => (p.isSplited ? p.theme.colors.blue : p.theme.colors.titanWhite)}
  );
  border-bottom: 1px solid rgb(${p => p.theme.colors.linkWaterDark});
`;

export const Footer = styled(Flex).attrs(() => ({
  px: 1,
  py: 1,
  alignItems: "center",
  justifyContent: "center"
}))`
  color: rgb(
    ${p => (p.isSplited ? p.theme.colors.white : p.theme.colors.blue)}
  );
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f14};
  line-height: 24px;
  background-color: rgb(
    ${p => (p.isSplited ? p.theme.colors.blue : p.theme.colors.titanWhite)}
  );
  border-top: 1px solid rgb(${p => p.theme.colors.linkWaterDark});
`;

export const Source = styled(Footer)`
  background: rgb(${p => p.theme.colors.white});
  color: rgb(${p => p.theme.colors.lightGreyText});
  font-size: 11px;
`;

export const Details = styled(Flex).attrs(() => ({
  flexDirection: "column",
  p: 3
}))`
  background-color: rgb(${p => p.theme.colors.white});
`;
