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
`;

export const BlueText = styled.span`
  display: block;
  color: rgb(${p => p.theme.colors.blue});
`;
