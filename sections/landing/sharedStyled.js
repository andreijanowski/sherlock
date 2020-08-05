import styled, { css } from "styled-components";
import { H2, Paragraph } from "components";
import { Box, Flex } from "@rebass/grid";

export const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
`;

export const ParagraphStyled = styled(Paragraph)`
  color: white;
  ${alignCenterMobile}
`;

export const LandingWrapper = styled(Flex)`
  width: 100%;
  background: rgb(${p => p.theme.colors.darkBlue});
`;

export const NavigationWrapper = styled(Box).attrs(() => ({
  px: 3
}))`
  width: 100%;
  max-width: 1050px;
`;

export const TopSectionWrapper = styled(Box).attrs(() => ({
  px: 3
}))`
  width: 100%;
  background: linear-gradient(170deg, #1a1f67 50%, #020025 50%);
`;

export const LogoWrapper = styled(Box)`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;

export const LogoMobileWrapper = styled.div`
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;
