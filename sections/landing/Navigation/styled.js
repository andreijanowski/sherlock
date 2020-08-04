import styled from "styled-components";
import { Box } from "@rebass/grid";

export const SectionItem = styled(Box).attrs(() => ({
  as: "li",
  width: [1 / 2, "auto"]
}))`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    display: block;
  }
`;

export const StyledParagraph = styled(Box).attrs(() => ({
  as: "p",
  my: 0,
  px: 18
}))`
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 28px;
  letter-spacing: 0.36px;
  cursor: pointer;
`;
export const StyledNavigationLink = styled(Box).attrs(() => ({
  as: "p",
  my: 0,
  pr: 28
}))`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p =>
    p.active ? p.theme.fontWeights.semiBold : p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f14};
  letter-spacing: 0.3px;
  cursor: ${p => (p.active ? "auto" : "pointer")};
`;

export const StyledHeaderParagraph = styled(Box).attrs(() => ({
  my: 0,
  as: "p"
}))`
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: 30px;
  letter-spacing: 0.5px;
  word-spacing: 200px;
  span {
    display: table;
    font-weight: ${p => p.theme.fontWeights.regular};
    word-spacing: initial;
  }
`;
