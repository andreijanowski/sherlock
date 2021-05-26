import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";
import {
  H2Styled as BaseH2Styled,
  ParagraphStyled as BaseParagraphStyled
} from "../sharedStyled";

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

export const H2Styled = styled(BaseH2Styled)`
  color: rgb(${p => p.theme.colors.darkText});
`;

export const ParagraphStyled = styled(BaseParagraphStyled)`
  ${p =>
    p.big
      ? `color: rgb(${p.theme.colors.darkText});`
      : `
    color: #828282;
    opacity: 0.8;
  `}
`;
