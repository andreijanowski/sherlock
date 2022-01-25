import styled, { css } from "styled-components";
import { Box } from "@rebass/grid";

import { downThanBreakpoint, themeGet } from "utils/theme";

export const centeredOnTabletCss = css`
  ${downThanBreakpoint(2)} {
    text-align: center;
  }
`;

const TypographyBox = styled(Box)`
  ${p => p.tabletCentered && centeredOnTabletCss};
`;

export const H1 = styled(TypographyBox).attrs(
  ({ as = "h1", mt = 0, mb = "32px" }) => ({
    as,
    mt,
    mb
  })
)`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f48};
  line-height: 67px;
  letter-spacing: 0.2px;
  ${downThanBreakpoint(2)} {
    font-size: ${p => p.theme.fontSizes.f36};
    line-height: 43px;
  }
`;

export const H2 = styled(TypographyBox).attrs(
  ({ as = "h2", mt = 0, mb = "24px" }) => ({
    as,
    mt,
    mb
  })
)`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f36};
  line-height: 50px;
  letter-spacing: 0.01em;
`;

export const H3 = styled(TypographyBox).attrs(
  ({ as = "h3", mt = 0, mb = "24px" }) => ({
    as,
    mt,
    mb
  })
)`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 34px;
  letter-spacing: 0.01em;
`;

export const Subtitle = styled(TypographyBox).attrs(
  ({ as = "p", mt = 0, mb = 0 }) => ({
    as,
    mt,
    mb
  })
)`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 25px;
  letter-spacing: 0.01em;
`;

export const Body = styled(TypographyBox).attrs(
  ({ as = "p", mt = 0, mb = 0 }) => ({
    as,
    mt,
    mb
  })
)`
  color: rgb(${p => p.theme.colors.white});
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 22px;
  letter-spacing: 0.01em;
`;

export const BodySmall = styled(TypographyBox).attrs(
  ({ as = "p", mt = 0, mb = 0 }) => ({
    as,
    mt,
    mb
  })
)`
  color: rgb(${themeGet("colors.white")});
  font-size: ${themeGet("fontSizes.f14")};
  line-height: 20px;
  letter-spacing: 0.01em;
`;

export const H1Landing = styled(H1)`
  font-size: 64px;
  line-height: 77px;
`;
