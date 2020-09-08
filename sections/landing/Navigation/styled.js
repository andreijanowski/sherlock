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
  font-weight: ${p => p.theme.fontWeights.regular};
  font-size: ${p => p.theme.fontSizes.f18};
  line-height: 28px;
  letter-spacing: 0.36px;
  cursor: pointer;
  &:hover {
    color: rgba(${p => p.theme.colors.white}, 0.35);
  }
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
  opacity: ${p => (p.active ? 1 : 0.5)};
  &:hover {
    color: rgba(${p => p.theme.colors.white}, 0.35);
  }
`;

export const StyledHeaderParagraph = styled(Box).attrs(() => ({
  as: "p"
}))`
  margin-top: ${p => (p.theme.breakpoints[0] ? "12px" : "26px")};
  margin-bottom: 0;
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
