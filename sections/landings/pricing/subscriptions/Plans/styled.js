import styled from "styled-components";
import { Flex } from "@rebass/grid";

import {
  H2Styled as BaseH2Styled,
  ParagraphStyled as BaseParagraphStyled
} from "sections/landings/common/sharedStyled";

export const PlansContainer = styled.div`
  max-width: 1150px;
  padding: 90px 16px 135px;
  margin: auto;
`;

export const TextWrapper = styled(Flex).attrs(() => ({
  width: 1,
  flexDirection: "column",
  alignSelf: "center"
}))`
  max-width: 1150px;
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
