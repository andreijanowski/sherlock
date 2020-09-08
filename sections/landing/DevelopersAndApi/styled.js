import styled, { css } from "styled-components";
import { Flex } from "@rebass/grid";
import { Paragraph } from "components";

export const alignCenterMobile = css`
  text-align: center;
  @media (min-width: ${p => p.theme.breakpoints[0]}) {
    text-align: start;
  }
`;

export const DevelopersAndApiWrapper = styled(Flex).attrs(() => ({
  justifyContent: "start",
  px: 3
}))`
  flex-direction: column;
  max-width: 1150px;
  margin: auto;
`;

export const ParagraphStyled = styled(Paragraph)`
  ${alignCenterMobile}
  color: #e0e0e0;
  font-weight: 500;
  font-size: ${p => p.theme.fontSizes.f15};
  line-height: 20px;
  letter-spacing: 0.3px;
  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    font-size: ${p => p.theme.fontSizes.f16};
  }
`;
