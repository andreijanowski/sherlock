import styled from "styled-components";
import { Box } from "@rebass/grid";

import { H2, Subtitle } from "components/styleguide/Typography";
import { WRAPPER_WIDTH } from "utils/theme";

export const Container = styled(Box)`
  max-width: ${WRAPPER_WIDTH}px;
  margin: auto;
`;

export const H2Styled = styled(H2)`
  color: rgb(${p => p.theme.colors.landingDarkBlue});
`;

export const SubtitleStyled = styled(Subtitle)`
  max-width: 670px;
  color: rgb(${p => p.theme.colors.landingDarkBlue});
  margin: auto;
`;

export const BlueText = styled.span`
  display: block;
  color: rgb(${p => p.theme.colors.blue});
`;

export const ImageContainer = styled.div`
  position: relative;
  text-align: center;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    width: 100%;
  }
`;

export const Image = styled.img`
  @media (max-width: ${p => p.theme.breakpoints[2]}) {
    max-width: 100%;
  }
`;
