import styled, { css } from "styled-components";
import { H2, Paragraph } from "components";
import { Box } from "@rebass/grid";

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
  ${alignCenterMobile}
`;

export const LandingWrapper = styled(Box).attrs(() => ({
  px: 3
}))`
  z-index: 1;
  width: 100%;
  max-width: 1050px;
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
