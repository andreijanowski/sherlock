import styled from "styled-components";
import { Box } from "@rebass/grid";

export const H2 = styled(Box).attrs(({ as = "h2", mt = 0, mb = "24px" }) => ({
  as,
  mt,
  mb
}))`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f36};
  line-height: 50px;
  letter-spacing: 0.01em;
`;

export const H3 = styled(Box).attrs(({ as = "h3", mt = 0, mb = "24px" }) => ({
  as,
  mt,
  mb
}))`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 34px;
  letter-spacing: 0.01em;
`;

export const Subtitle = styled(Box).attrs(({ as = "p", mt = 0, mb = 0 }) => ({
  as,
  mt,
  mb
}))`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 25px;
  letter-spacing: 0.01em;
`;
