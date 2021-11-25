import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { ParagraphStyled as BaseParagraphStyled } from "sections/common/sharedStyled";
import { WRAPPER_WIDTH } from "utils/theme";

export const Container = styled(Flex)`
  max-width: ${WRAPPER_WIDTH}px;
  padding: 90px 16px 105px;
  margin: auto;
`;

export const H2Styled = styled.h2`
  margin: 0;
  color: rgb(${p => p.theme.colors.white});
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.f48};
  line-height: 72px;
  letter-spacing: 0.6px;
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    text-align: center;
  }
`;

export const ParagraphStyled = styled(BaseParagraphStyled).attrs({ big: true })`
  margin-bottom: 0;
  max-width: 470px;
  font-weight: ${p => p.theme.fontWeights.semiBold};
  font-size: ${p => p.theme.fontSizes.f24};
  line-height: ${p => p.theme.fontSizes.f36};
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    text-align: center;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  text-align: center;
`;

export const Image = styled.img`
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
`;
