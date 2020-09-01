import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";
import { H2 } from "components";

export const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const FeaturesWrapper = styled(Flex).attrs(() => ({
  justifyContent: "start",
  mt: [140, 180],
  mx: "auto",
  px: 3
}))`
  flex-direction: column;
  max-width: 1150px;
`;

export const H2Styled = styled(H2)`
  ${alignCenterMobile}
  color: black;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f30};
  letter-spacing: 0.6px;
`;

export const Image = styled.img`
  width: auto;
  object-fit: fill;
`;

export const ParagraphStyled = styled("p")`
  ${alignCenterMobile}
  margin: 0;
  color: black;
  font-weight: 500;
  font-size: ${p => p.theme.fontSizes.f16};
  line-height: 20px;
  letter-spacing: 0.3px;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;
