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
  alignSelf: "center",
  justifyContent: "center"
}))`
  max-width: 1150px;
`;

export const TextWrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: "column",
  alignSelf: "center"
  /* mb: [10, 20] */
}))`
  max-width: 1150px;
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
  color: #333;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f30};
  letter-spacing: 0.6px;
`;

export const ParagraphStyled = styled(Paragraph)`
  ${alignCenterMobile}
  color: #828282;
  font-weight: ${p => p.theme.fontWeights.medium};
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 20px;
  letter-spacing: 0.3px;
  opacity: 0.8;
`;
