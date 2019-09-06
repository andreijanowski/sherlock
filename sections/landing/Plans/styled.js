import styled, { css } from "styled-components";
import { Flex, Box } from "@rebass/grid";
import { H2, Paragraph } from "components";

const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const PlansWrapper = styled(Flex).attrs(() => ({
  flexDirection: "row",
  flexWrap: "wrap",
  m: -2,
  width: 1,
  alignSelf: "center"
}))`
  max-width: 1184px;
`;

export const TextWrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: "column",
  alignSelf: "center",
  mb: 90
}))`
  max-width: 896px;
`;

export const PromotionWrapper = styled(Box).attrs(() => ({
  p: 32
}))`
  background-color: white;
  border: ${p => p.theme.borderWeights.tiny} solid
    rgb(${p => p.theme.colors.navyBlue});
  border-radius: ${p => p.theme.radius.default};
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
`;

export const ParagraphStyled = styled(Paragraph)`
  ${alignCenterMobile}
`;
