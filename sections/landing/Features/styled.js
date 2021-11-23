import styled from "styled-components";
import { Flex } from "@rebass/grid";

import {
  H2Styled as BaseH2Styled,
  ParagraphStyled as BaseParagraphStyled
} from "sections/common/sharedStyled";

export const FeaturesWrapper = styled(Flex).attrs(() => ({
  justifyContent: "start",
  mt: [140, 180],
  mx: "auto",
  px: 3
}))`
  flex-direction: column;
  max-width: 1150px;
`;

export const H2Styled = styled(BaseH2Styled)`
  color: rgb(${p => p.theme.colors.darkText});
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin: 20px 0;
`;

export const ParagraphStyled = styled(BaseParagraphStyled)`
  margin: 0;
  color: rgb(${p => p.theme.colors.darkText});
`;
