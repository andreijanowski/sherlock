import styled from "styled-components";
import { Flex } from "@rebass/grid";

import { WRAPPER_WIDTH } from "utils/theme";
import { H2, Subtitle } from "components/styleguide/Typography";

export const Container = styled(Flex)`
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
`;

export const H2Styled = styled(H2).attrs({ big: true })`
  max-width: 470px;
  color: rgb(${p => p.theme.colors.greyBorder});
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: 40px;
  padding: 20px;
  background-color: ${p => `rgba(${p.theme.colors.white}, 0.28)`};
  width: 200%;
`;

export const Image = styled.img`
  position: relative;
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
`;

export const FeatureImage = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 100%;
  top: 160px;
  left: -150px;
`;

export const SubtitleStyled = styled(Subtitle).attrs({})`
  max-width: 480px;
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    max-width: 100%;
  }
  color: rgb(${p => p.theme.colors.greyBorder});
`;
