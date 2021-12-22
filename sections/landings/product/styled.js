import styled from "styled-components";
import { Box } from "@rebass/grid";

import { downThanBreakpoint, LANDING_BLOCK_ANGLE, themeGet } from "utils/theme";

export const TopSectionWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.darkBlue")}) calc(70% - 1px),
    rgb(${themeGet("colors.white")}) 70%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.darkBlue")});
  }
`;

export const WhiteWrapper = styled(Box).attrs({
  pt: [36, null, null, 88],
  pb: [80, null, null, 88]
})`
  width: 100%;
  background: rgb(${themeGet("colors.white")});
`;

export const DarkWrapper = styled(Box).attrs({
  pt: [57, null, null, 217],
  pb: [80, null, null, 182]
})`
  width: 100%;
  background: linear-gradient(
    ${LANDING_BLOCK_ANGLE},
    rgb(${themeGet("colors.white")}) calc(10% - 1px),
    rgb(${themeGet("colors.darkBlue")}) 10%,
    rgb(${themeGet("colors.darkBlue")}) calc(90% - 1px),
    rgb(${themeGet("colors.white")}) 90%
  );
  ${downThanBreakpoint(2)} {
    background: rgb(${themeGet("colors.darkBlue")});
  }
`;
